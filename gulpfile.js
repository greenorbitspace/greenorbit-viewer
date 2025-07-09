/* eslint-env node */
/* eslint no-sync: 0 */
/* eslint no-process-exit: 0 */

"use strict";

/*global require*/
// If gulp tasks are run in a post-install task, modules required here must be in `dependencies`, not just `devDependencies`.

const fs = require("fs");
const gulp = require("gulp");
const path = require("path");
const PluginError = require("plugin-error");
const glob = require("glob");
const terriajsServerGulpTask = require("terriajs/buildprocess/terriajsServerGulpTask");

const watchOptions = {
  interval: 1000
};

gulp.task("check-terriajs-dependencies", (done) => {
  const appPackageJson = require("./package.json");
  const terriaPackageJson = require("terriajs/package.json");

  syncDependencies(appPackageJson.dependencies, terriaPackageJson, true);
  syncDependencies(appPackageJson.devDependencies, terriaPackageJson, true);
  done();
});

gulp.task("write-version", (done) => {
  const spawnSync = require("child_process").spawnSync;

  const nowDate = new Date();
  const dateString = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
  const packageJson = require("./package.json");
  const terriajsPackageJson = require("./node_modules/terriajs/package.json");

  const isClean = spawnSync("git", ["status", "--porcelain"]).stdout.toString().length === 0;
  const gitHash = spawnSync("git", ["rev-parse", "--short", "HEAD"]).stdout.toString().trim();

  let version = `${dateString}-${packageJson.version}-${terriajsPackageJson.version}-${gitHash}`;
  if (!isClean) version += " (plus local modifications)";

  fs.writeFileSync("version.js", `module.exports = '${version}';`);
  fs.writeFileSync("wwwroot/version.json", JSON.stringify({
    date: dateString,
    terriajs: terriajsPackageJson.version,
    terriamap: packageJson.version,
    terriamapCommitHash: gitHash,
    hasLocalModifications: !isClean
  }));

  done();
});

gulp.task("render-index", (done) => {
  const ejs = require("ejs");
  const minimist = require("minimist");

  const options = minimist(process.argv.slice(2), {
    string: ["baseHref"],
    default: { baseHref: "/" }
  });

  const indexEjsPath = path.join("wwwroot", "index.ejs");
  if (!fs.existsSync(indexEjsPath)) {
    console.warn("⚠️  Skipping render-index: index.ejs not found, using static index.html");
    return done();
  }

  const index = fs.readFileSync(indexEjsPath, "utf8");
  const indexResult = ejs.render(index, { baseHref: options.baseHref });

  fs.writeFileSync(path.join("wwwroot", "index.html"), indexResult);
  done();
});

gulp.task("build-app", gulp.parallel(
  "render-index",
  gulp.series("check-terriajs-dependencies", "write-version", (done) => {
    const runWebpack = require("terriajs/buildprocess/runWebpack.js");
    const webpack = require("webpack");
    const webpackConfig = require("./buildprocess/webpack.config.make.js")(true);

    checkForDuplicateCesium();
    runWebpack(webpack, webpackConfig, done);
  })
));

gulp.task("release-app", gulp.parallel(
  "render-index",
  gulp.series("check-terriajs-dependencies", "write-version", (done) => {
    const runWebpack = require("terriajs/buildprocess/runWebpack.js");
    const webpack = require("webpack");
    const webpackConfig = require("./buildprocess/webpack.config.make.js")(false);

    checkForDuplicateCesium();
    runWebpack(webpack, {
      ...webpackConfig,
      plugins: webpackConfig.plugins || []
    }, done);
  })
));

gulp.task("watch-render-index", gulp.series("render-index", () => {
  gulp.watch(["wwwroot/index.ejs"], gulp.series("render-index"));
}));

gulp.task("watch-app", gulp.parallel(
  "watch-render-index",
  gulp.series("check-terriajs-dependencies", (done) => {
    const fs = require("fs");
    const watchWebpack = require("terriajs/buildprocess/watchWebpack");
    const webpack = require("webpack");
    const webpackConfig = require("./buildprocess/webpack.config.make.js")(true, false);

    checkForDuplicateCesium();
    fs.writeFileSync("version.js", "module.exports = 'Development Build';");
    watchWebpack(webpack, webpackConfig, done);
  })
));

gulp.task("copy-terriajs-assets", () => {
  const terriaWebRoot = path.join(getPackageRoot("terriajs"), "wwwroot");
  const sourceGlob = path.join(terriaWebRoot, "**");
  const destPath = path.resolve(__dirname, "wwwroot", "build", "TerriaJS");

  return gulp.src([sourceGlob], { base: terriaWebRoot, encoding: false })
    .pipe(gulp.dest(destPath));
});

gulp.task("watch-terriajs-assets", gulp.series("copy-terriajs-assets", () => {
  let sourceGlob = path.join(getPackageRoot("terriajs"), "wwwroot", "**");
  if (path.sep === "\\") sourceGlob = sourceGlob.replace(/\\/g, "/");

  gulp.watch(sourceGlob, watchOptions, gulp.series("copy-terriajs-assets"));
}));

gulp.task("lint", (done) => {
  const runExternalModule = require("terriajs/buildprocess/runExternalModule");
  const eslintDir = path.dirname(require.resolve("eslint/package.json"));
  const eslintExecutable = path.join(eslintDir, "bin", "eslint.js");

  const filesToLint = [
    ...glob.sync("terriajs/buildprocess/**/*.js"),
    ...glob.sync("terriajs/lib/**/*.js")
  ];

  if (filesToLint.length === 0) {
    console.warn("Warning: No JS files found to lint.");
    return done();
  }

  runExternalModule(eslintExecutable, ["--max-warnings", "0", "--fix", ...filesToLint]);
  done();
});

gulp.task("clean", (done) => {
  const fsExtra = require("fs-extra");
  fsExtra.removeSync(path.join("wwwroot", "build"));
  done();
});

gulp.task("sync-terriajs-dependencies", (done) => {
  const appPackageJson = require("./package.json");
  const terriaPackageJson = require("terriajs/package.json");

  syncDependencies(appPackageJson.dependencies, terriaPackageJson);
  syncDependencies(appPackageJson.devDependencies, terriaPackageJson);

  fs.writeFileSync("./package.json", JSON.stringify(appPackageJson, null, 2));
  console.log("✅ TerriaMap's package.json has been updated. Run `yarn install` next.");
  done();
});

function getPackageRoot(packageName) {
  return path.dirname(require.resolve(`${packageName}/package.json`));
}

function syncDependencies(dependencies, targetJson, justWarn) {
  for (const dep in dependencies) {
    if (!dependencies.hasOwnProperty(dep)) continue;

    const version = targetJson.dependencies?.[dep] || targetJson.devDependencies?.[dep];
    if (version && version !== dependencies[dep]) {
      if (justWarn) {
        console.warn(`⚠️  Version mismatch for ${dep}. Consider running \`gulp sync-terriajs-dependencies\``);
      } else {
        console.log(`🔄 Updating ${dep} from ${dependencies[dep]} to ${version}`);
        dependencies[dep] = version;
      }
    }
  }
}

function checkForDuplicateCesium() {
  const fsExtra = require("fs-extra");

  if (
    fsExtra.existsSync("node_modules/terriajs-cesium") &&
    fsExtra.existsSync("node_modules/terriajs/node_modules/terriajs-cesium")
  ) {
    console.error("🚨 Duplicate Cesium detected. Please clean up your node_modules.");
    throw new PluginError("checkForDuplicateCesium", "You have two copies of Cesium.", {
      showStack: false
    });
  }
}

gulp.task("terriajs-server", terriajsServerGulpTask(3001));
gulp.task("build", gulp.series("copy-terriajs-assets", "build-app"));
gulp.task("release", gulp.series("copy-terriajs-assets", "release-app"));
gulp.task("watch", gulp.parallel("watch-terriajs-assets", "watch-app"));
gulp.task("dev", gulp.parallel(gulp.series("render-index", "terriajs-server"), "watch"));
gulp.task("default", gulp.series("lint", "build"));
/*eslint-env node*/
/*eslint no-sync: 0*/
/*eslint no-process-exit: 0*/

"use strict";

const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const PluginError = require("plugin-error");
const glob = require("glob");
const webpack = require("webpack");

// Base absolute path to terriajs/buildprocess relative to this gulpfile
const terriaBuildprocessDir = path.resolve(__dirname, "terriajs/buildprocess");

// Require local modules explicitly by relative path
const terriajsServerGulpTask = require(path.join(terriaBuildprocessDir, "terriajsServerGulpTask.js"));
const runWebpack = require(path.join(terriaBuildprocessDir, "runWebpack.js"));
const watchWebpack = require(path.join(terriaBuildprocessDir, "watchWebpack.js"));
const runExternalModule = require(path.join(terriaBuildprocessDir, "runExternalModule.js"));

function getPackageRoot(packageName) {
  return path.dirname(require.resolve(packageName + "/package.json"));
}

// Check for version mismatches between app and terriajs dependencies
function syncDependencies(dependencies, targetJson, justWarn) {
  for (const dependency in dependencies) {
    if (Object.prototype.hasOwnProperty.call(dependencies, dependency)) {
      const version =
        targetJson.dependencies?.[dependency] ||
        targetJson.devDependencies?.[dependency];
      if (version && version !== dependencies[dependency]) {
        if (justWarn) {
          console.warn(
            `Warning: Version mismatch for ${dependency}. Run \`gulp sync-terriajs-dependencies\`.`
          );
        } else {
          console.log(
            `Updating ${dependency} from ${dependencies[dependency]} to ${version}.`
          );
          dependencies[dependency] = version;
        }
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
    console.error(
      "Error: Duplicate terriajs-cesium installations detected.\n" +
      "Please remove node_modules/terriajs/node_modules/terriajs-cesium to avoid issues.\n" +
      "Run `yarn gulp sync-terriajs-dependencies` to prevent recurrence."
    );
    throw new PluginError("checkForDuplicateCesium", "Duplicate Cesium detected.");
  }
}

gulp.task("check-terriajs-dependencies", (done) => {
  const appPackageJson = require("./package.json");
  const terriaPackageJson = require(path.join(__dirname, "terriajs/package.json"));

  syncDependencies(appPackageJson.dependencies, terriaPackageJson, true);
  syncDependencies(appPackageJson.devDependencies, terriaPackageJson, true);
  done();
});

gulp.task("sync-terriajs-dependencies", (done) => {
  const appPackageJson = require("./package.json");
  const terriaPackageJson = require(path.join(__dirname, "terriajs/package.json"));

  syncDependencies(appPackageJson.dependencies, terriaPackageJson);
  syncDependencies(appPackageJson.devDependencies, terriaPackageJson);

  fs.writeFileSync(
    "./package.json",
    JSON.stringify(appPackageJson, undefined, 2)
  );
  console.log("Updated package.json with terriajs dependency versions. Run `npm install` or `yarn install` now.");
  done();
});

gulp.task("write-version", (done) => {
  const spawnSync = require("child_process").spawnSync;

  const nowDate = new Date();
  const dateString = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`;
  const packageJson = require("./package.json");
  const terriajsPackageJson = require(path.join(__dirname, "terriajs/package.json"));

  const isClean = spawnSync("git", ["status", "--porcelain"]).stdout.toString().length === 0;
  const gitHash = spawnSync("git", ["rev-parse", "--short", "HEAD"]).stdout.toString().trim();

  let version = `${dateString}-${packageJson.version}-${terriajsPackageJson.version}-${gitHash}`;
  if (!isClean) {
    version += " (plus local modifications)";
  }

  fs.writeFileSync("version.js", `module.exports = '${version}';`);
  fs.writeFileSync(
    "wwwroot/version.json",
    JSON.stringify({
      date: dateString,
      terriajs: terriajsPackageJson.version,
      terriamap: packageJson.version,
      terriamapCommitHash: gitHash,
      hasLocalModifications: !isClean
    }, null, 2)
  );

  done();
});

gulp.task("render-index", (done) => {
  const ejs = require("ejs");
  const minimist = require("minimist");

  const options = minimist(process.argv.slice(2), {
    string: ["baseHref"],
    default: { baseHref: "/" }
  });

  const indexTemplate = fs.readFileSync("wwwroot/index.ejs", "utf8");
  const indexHtml = ejs.render(indexTemplate, { baseHref: options.baseHref });

  fs.writeFileSync(path.join("wwwroot", "index.html"), indexHtml);

  done();
});

gulp.task("copy-terriajs-assets", () => {
  const fsExtra = require("fs-extra");
  const terriaWebRoot = path.join(getPackageRoot("terriajs"), "wwwroot");
  const destPath = path.resolve(__dirname, "wwwroot", "build", "TerriaJS");

  return gulp
    .src([path.join(terriaWebRoot, "**")], { base: terriaWebRoot, encoding: false })
    .pipe(gulp.dest(destPath));
});

gulp.task("clean", (done) => {
  const fsExtra = require("fs-extra");
  fsExtra.removeSync(path.join("wwwroot", "build"));
  done();
});

gulp.task("lint", (done) => {
  const eslintDir = path.dirname(require.resolve("eslint/package.json"));
  const eslintExecutable = path.join(eslintDir, "bin", "eslint.js");

  const filesToLint = [
    ...glob.sync("terriajs/buildprocess/**/*.js"),
    ...glob.sync("terriajs/lib/**/*.js"),
  ];

  if (filesToLint.length === 0) {
    console.warn("Warning: No JS files found to lint.");
    done();
    return;
  }

  runExternalModule(eslintExecutable, ["--max-warnings", "0", "--fix", ...filesToLint]);
  done();
});

gulp.task("build-app", gulp.parallel(
  "render-index",
  gulp.series("check-terriajs-dependencies", "write-version", (done) => {
    checkForDuplicateCesium();

    const webpackConfig = require(path.join(terriaBuildprocessDir, "webpack.config.make.js"))(true);

    runWebpack(webpack, webpackConfig, done);
  })
));

gulp.task("release-app", gulp.parallel(
  "render-index",
  gulp.series("check-terriajs-dependencies", "write-version", (done) => {
    checkForDuplicateCesium();

    const webpackConfig = require(path.join(terriaBuildprocessDir, "webpack.config.make.js"))(false);

    runWebpack(webpack, webpackConfig, done);
  })
));

gulp.task("watch-render-index", gulp.series("render-index", () => {
  gulp.watch(["wwwroot/index.ejs"], gulp.series("render-index"));
}));

gulp.task("watch-app", gulp.parallel(
  "watch-render-index",
  gulp.series("check-terriajs-dependencies", (done) => {
    checkForDuplicateCesium();

    const webpackConfig = require(path.join(terriaBuildprocessDir, "webpack.config.make.js"))(true, false);

    fs.writeFileSync("version.js", "module.exports = 'Development Build';");

    watchWebpack(webpack, webpackConfig, done);
  })
));

gulp.task("watch-terriajs-assets", gulp.series("copy-terriajs-assets", () => {
  const terriaWebRoot = path.join(getPackageRoot("terriajs"), "wwwroot");
  let sourceGlob = path.join(terriaWebRoot, "**");

  if (path.sep === "\\") {
    sourceGlob = sourceGlob.replace(/\\/g, "/");
  }

  gulp.watch(sourceGlob, { interval: 1000 }, gulp.series("copy-terriajs-assets"));
}));

gulp.task("terriajs-server", terriajsServerGulpTask(3001));

gulp.task("build", gulp.series("clean", "copy-terriajs-assets", "build-app"));
gulp.task("release", gulp.series("clean", "copy-terriajs-assets", "release-app"));
gulp.task("watch", gulp.parallel("watch-terriajs-assets", "watch-app"));
gulp.task("dev", gulp.parallel(gulp.series("render-index", "terriajs-server"), "watch"));
gulp.task("default", gulp.series("lint", "build"));
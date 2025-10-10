/**
 * Webpack config for building specs
 */

const path = require("path");
const glob = require("fast-glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const configureWebpack = require("./configureWebpack");

const testGlob = [
  "./test/SpecMain.ts",
  "./test/**/*Spec.ts",
  "./test/**/*Spec.tsx",
  "./test/Models/Experiment.ts"
];

const files = glob.sync(testGlob);
console.log("[Webpack] Test entry files:", files);

module.exports = function (devMode) {
  const terriaJSBasePath = path.resolve(__dirname, "../");

  const config = {
    mode: devMode ? "development" : "production",
    entry: files,
    output: {
      path: path.resolve(__dirname, "..", "wwwroot", "build"),
      filename: "TerriaJS-specs.js",
      publicPath: "build/"
    },
    devtool: devMode ? "eval-cheap-module-source-map" : "source-map",
    devServer: {
      port: 3002,
      static: {
        directory: path.join(__dirname, "..", "wwwroot")
      },
      devMiddleware: {
        stats: "minimal"
      }
    },
    externals: {
      cheerio: "window",
      "react/addons": true,
      "react/lib/ExecutionEnvironment": true,
      "react/lib/ReactContext": true
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      modules: ["node_modules"],
      alias: {
        // Optional: add aliases if needed
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: devMode,
                modules: false // Enable if you're using CSS modules
              }
            },
            {
              loader: "resolve-url-loader",
              options: {
                sourceMap: devMode
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, "../terriajs/lib/Sass/common")
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.(csv|xml)$/i,
          include: [path.resolve(terriaJSBasePath, "wwwroot", "test")],
          type: "asset/source"
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true
      })
    ]
  };

  return configureWebpack({
    terriaJSBasePath,
    config,
    devMode,
    MiniCssExtractPlugin
  });
};
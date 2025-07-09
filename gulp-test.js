console.log("Gulpfile running under node version", process.version);
const gulp = require("gulp");
gulp.task("default", done => {
  console.log("Default task");
  done();
});
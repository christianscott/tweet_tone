const gulp = require('gulp'),
      sass = require('gulp-sass'),
      jade = require('gulp-jade'),
      tsc = require('gulp-typescript');

const browserSync = require('browser-sync').create();
const tsProject = tsc.createProject("tsconfig.json");

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade', 'typescript'], function() {

    // Browser sync serves files from 'dist' directory
    browserSync.init({
        server: "./",
        port: 8000
    });

    gulp.watch("src/*.ts", ['typescript'])
    gulp.watch("src/*.scss", ['sass']);
    gulp.watch("src/*.jade", ['jade']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

// Compile jade
gulp.task('jade', function() {
  return gulp.src("src/*.jade")
        .pipe(jade())
        .pipe(gulp.dest(""))
});

// Compile typescript
gulp.task('typescript', function() {
  return tsProject.src()
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("dist"));
});

gulp.task('default', ['serve']);

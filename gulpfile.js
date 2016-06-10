var gulp = require('gulp'),
  less = require('gulp-less'),
  watch = require('gulp-watch'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer');


gulp.task('less', function () {
  return gulp.src('./less/cssicon.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer('last 8 versions', 'ie 80'))
    .pipe(gulp.dest('./build'));
});

gulp.task('cssmin', function () {
  gulp.src('./build/cssicon.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
});


// live realod the browser
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html',
      reloadDelay: 2000
    }
  });
});


gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['./less/**/*.less', './index.html'], ['less']);
  gulp.watch(['./build/cssicon.css'], ['cssmin', browserSync.reload]);
});
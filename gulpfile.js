// Get Gulp packages
var gulp = require('gulp');

// Packages Declaration
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var browserSync = require('browser-sync').create();
var babel = require("gulp-babel");

// Gulp Default tasks
gulp.task('default', ['check', 'clean', 'dev sass', 'dist sass', 'dev scripts', 'dist scripts', 'browser-sync', 'watch']);

// Gulp Watch function
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['dev sass', 'dist sass']);
  gulp.watch('js/*.js', ['dev scripts', 'dist scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
})

// SASS Compile + Minify
gulp.task('dist sass', function() {
  return gulp.src(
    [
    'scss/scrub.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', gutil.log))
    .pipe(cleancss())
    .pipe(concat('Scrub.css'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('dev sass', function() {
  return gulp.src(
    [
    'node_modules/bootstrap-grid/dist/grid.min.css',
    'scss/example.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', gutil.log))
    .pipe(cleancss())
    .pipe(concat('ScrubDev.css'))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
});
// Concat + Minify .js
gulp.task('dist scripts', function() {
    return gulp.src(
      [
      'js/scrub.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(babel().on('error', gutil.log))
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('Scrub.js'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});
gulp.task('dev scripts', function() {
    return gulp.src(
      [
      'js/example.js'
      ])
      .pipe(sourcemaps.init())
      .pipe(babel().on('error', gutil.log))
      .pipe(uglify().on('error', gutil.log))
      .pipe(concat('ScrubDev.js'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}))
});
// Clear build folder
gulp.task('clean', function() {
    return del.sync(['dist/*']);
});
// browser-sync server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
// Gulp run test
gulp.task('check', function() {
  console.log('Tasks running..');
});

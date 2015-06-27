var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
//var gulpif = require('gulp-if');
//var uglify = require('gulp-uglify');
//var minify = require('gulp-minify-css');
//var rimraf = require('gulp-rimraf');
var livereload = require('gulp-livereload');
//var svgsprite = require('gulp-svg-sprites');
var webpack = require('gulp-webpack');

gulp.task('sass', function () {
  return gulp.src('./app/client/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [
        './node_modules/normalize.scss/',
        require('node-bourbon').includePaths
      ]
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/assets/css/'))
    .pipe(livereload({
      auto: false
    }))
    .on('error', sass.logError);
});

//gulp.task('sass:build', ['sass'], function () {
//  return gulp.src('./assets.config.json')
//    .pipe(assets.gulp({
//      path: './public'
//    }))
//    .pipe(gulpif('*.css', minify()))
//    .pipe(gulp.dest('./public'));
//});

gulp.task('webpack', function () {
  return gulp.src('./app/client/js/app.js')
    .pipe(webpack({
      devtool: '#source-map',
      output: {
        filename: 'app.js',
      }
    }))
    .pipe(livereload({
      auto: false
    }))
    .pipe(gulp.dest('./public/assets/js/'));
});

//gulp.task('webpack:build', function () {
//  return gulp.src('./app/client/js/app.js')
//    .pipe(webpack({
//      output: {
//        filename: 'app.min.js',
//      }
//    }))
//    .pipe(uglify())
//    .pipe(gulp.dest('./public/js'));
//});

gulp.task('templates', function () {
  livereload.changed('*.jade');
});

gulp.task('nodemon', function () {
 return nodemon({
   script: './server.js',
   verbose: true
 });
});

gulp.task('livereload', function () {
  livereload.listen();
});

//gulp.task('clean', ['sass:build', 'webpack:build'], function () {
//  return gulp.src(['./app/client/.tmp'], {
//      read: false
//    })
//    .pipe(rimraf());
//});

gulp.task('watch', ['sass'], function () {
  gulp.watch('./app/client/scss/**/*.scss', ['sass']);
  gulp.watch('./app/client/js/**/*.js', ['webpack']);
  gulp.watch('./app/views/**/*.jade', ['templates']);
});

gulp.task('default', ['livereload', 'webpack', 'nodemon', 'watch']);
//gulp.task('deploy', ['svg', 'sass:build', 'webpack:build', 'clean']);

var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var jade = require('jade');
var path = require('path');
var webpack = require('webpack');

var output = path.join(__dirname, 'dist');

gulp.task('deploy', shell.task([
    'git stash',
    'git checkout -b deploy',
    'rm .gitignore',
    'git add .gitignore --all',
    'gulp build'
]));

gulp.task('build:webpack', function (callback) {
    webpack(require('./webpack.config')('production'), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);

        callback();
    });
});

gulp.task('build', ['build:webpack']);

var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
// var del = require('del');
var jade = require('jade');
var path = require('path');
var webpack = require('webpack');
// var through = require('through2');
// var sequence = require('run-sequence');

var output = path.join(__dirname, 'dist');

gulp.task('deploy', function () {

    var branch = 'deploy-' + new Date().getTime();

    shell.task([
    'git branch -D ' + branch,
    'git stash',
    'git checkout -b ' + branch,
    'rm .gitignore',
    'git add .gitignore --all',
    'gulp build'
    ]);
});

gulp.task('build:webpack', function (callback) {
    webpack(require('./webpack.config')('production'), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);

        callback();
    });
});

gulp.task('build', ['build:webpack']);

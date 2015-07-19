var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var path = require('path');
var webpack = require('webpack');

var branch = 'deploy-' + new Date().getTime();

gulp.task('deploy', shell.task([
    'git stash',
    'git checkout -b ' + branch,
    'npm run build',
    'git add static/',
    'git commit -am "' + branch + '"',
    'git push heroku ' + branch + ':master --force',
    'git checkout master',
    'git branch -D ' + branch,
    'git stash pop'
]));

gulp.task('build:webpack', function (callback) {
    webpack(require('./webpack.config')('production'), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);

        callback();
    });
});

gulp.task('build', ['build:webpack']);

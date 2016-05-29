var fs = require('fs');
var path = require('path');

var extendify = require('extendify');
var express = require('express');
var locale = require('locale');
var MobileDetect = require('mobile-detect');

var app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('src/templates'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 8015);

app.use('/static', express.static('./static'));

if (app.get('env') === 'development') {
    var config = require('./webpack.config');
    var compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.locals.pretty = true;

var defaults = require('./src/data/default');
var locales = {};
var extend = extendify({
    inPlace: false
});

try {
    fs.readdirSync(path.resolve('src/data/locales')).map(function (filename) {
        locales[path.basename(filename, '.js')] = extend(defaults, require(path.resolve('src/data/locales', filename)))
    });
} catch (e) {
    console.log(e);
}

app.use(locale(Object.keys(locales)));

app.get('/', function (req, res) {
    render(req, res);
});
app.get('/:lang', function (req, res) {
	if (locales[req.params.lang] !== undefined) {
        req.locale = req.params.lang;
	}
    render(req, res);
});

var render = function (req, res) {
    var data = locales[req.locale];
    var md = new MobileDetect(req.headers['user-agent']);

    data.nl2br = require('nl2br');
    data.phone = md.phone();

    res.render('index', data);
};

app.listen(app.get('port'));

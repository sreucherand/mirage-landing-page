var express = require('express');
var path = require('path');

var credentials = require('./credentials');

var app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve('src/views'));
app.set('lang', 'en');
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 8015);

app.use('/static', express.static('./static'));

if (app.get('env') === 'development') {
    var config = require('./config/webpack.development.config');
    var compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {lazy: false, publicPath: config.output.publicPath}));
    app.use(require('webpack-hot-middleware')(compiler));

    app.locals.pretty = true;
}

// var languages = ['fr', 'en'];
// var transporter = nodemailer.createTransport(smtp({
//     host: 'mail.gandi.net',
//     port: 465,
//     secure: true,
//     auth: credentials.gandi
// }));
// var mail = {
//     from: 'Mirage <hello@thinkmirage.io>',
//     to: 'hello@thinkmirage.io',
//     subject: 'New subscription to the newsletter !',
//     text: 'You have a new subscription to newsletter service on thinkmirage.io : {address}'
// };
// var render = function (req, res) {
// 	res.render('index', require(path.resolve(path.join('src/data/', app.get('lang') + '.json'))));
// };

app.get('/', function (req, res) {
	var language = null;

    // if (req.headers['accept-language']) {
    //     language = acceptLanguage.get(req.headers['accept-language']);
    //     language = acceptLanguage.parse(language);

    //     if (languages.indexOf(language[0].language) > -1) {
    //         app.set('lang', language[0].language);
    //     }
    // }

	res.render('index', require(path.resolve(path.join('src/data/fr.json'))));
});
// app.get('/:lang', function (req, res) {
// 	if (languages.indexOf(req.params.lang) > -1) {
// 		app.set('lang', req.params.lang);
// 	}

// 	render(req, res);
// });
// app.post('/', function (req, res) {
// 	if (req.body.newsletter) {
// 		mail.text = mail.text.replace('{address}', req.body.email);
// 		transporter.sendMail(mail);

// 		res.status(201).end();
// 	} else {
// 		res.status(500).end();
// 	}
// });

app.listen(app.get('port'));

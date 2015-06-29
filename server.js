var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
var acceptLanguage = require('accept-language');

var credentials = require('./credentials');

var transporter = nodemailer.createTransport(smtp({
	host: 'mail.gandi.net',
	port: 465,
	secure: true,
	auth: credentials.gandi
}));
var mail = {
    from: 'Mirage <hello@thinkmirage.io>',
    to: 'hello@thinkmirage.io',
    subject: 'New subscription to the newsletter !',
    text: 'You have a new subscription to newsletter service on thinkmirage.io : {address}'
};

var app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve('app/views'));
app.set('lang', 'en');
app.set('port', process.env.PORT || 8015);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use('/public', express.static('public'));

var languages = ['fr', 'en'];
var render = function (req, res) {
	res.render('index', require(path.resolve(path.join('app/client/data/', app.get('lang') + '.json'))));
};

app.get('/', function (req, res) {
	var language = null;

    if (req.headers['accept-language']) {
        language = acceptLanguage.get(req.headers['accept-language']);
        language = acceptLanguage.parse(language);

        if (languages.indexOf(language[0].language) > -1) {
            app.set('lang', language[0].language);
        }
    }

	render(req, res);
});
app.get('/:lang', function (req, res) {
	if (languages.indexOf(req.params.lang) > -1) {
		app.set('lang', req.params.lang);
	}

	render(req, res);
});
app.post('/', function (req, res) {
	if (req.body.newsletter) {
		mail.text = mail.text.replace('{address}', req.body.email);
		transporter.sendMail(mail);

		res.status(201).end();
	} else {
		res.status(500).end();
	}
});

app.listen(app.get('port'));

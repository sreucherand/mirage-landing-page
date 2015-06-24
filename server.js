var express = require('express');
var path = require('path');

var app = express();

app.set('view engine', 'jade');
app.set('views', path.resolve('app/views'));
app.set('port', process.env.PORT || 8015);

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(app.get('port'));

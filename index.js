var request = require('superagent');
var express = require('express');
var browserify = require('browserify-middleware');
var mustache = require('mustache-express');
var app = express();

var port = 3000;

app.listen(port);
console.log('listening on *:' + port);

app.engine('mustache', mustache());
app.set('views', __dirname + '/views');

if ('development' == process.env.NODE_ENV) {
  app.use('/main.js', browserify('./client/login.js'));
  app.use('/order.js', browerserif('./client/app.js'))
}
app.use(express.static(__dirname + '/public'));

var DELIV = 'http://sandbox.delivery.com';
var CLIENT = 'abc';
var SECRET = '';

app.get('/', function(req, res, next) {
  res.render('index.mustache', {});
});

/* get the client id for delivery.com */
app.get('/client', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ key: CLIENT}));
});

app.get('/inside', function(req, res, next) {
  console.log(req);

  var code = req.body.code;

  request
    .post(DELIV + '/third_party/access_token')
    .set('client_id', CLIENT)
    .set('client_secret', SECRET)
    .set('code', code)
    .set('grant_type', 'authorization_code')
    .set('redirect_uri', '/authtoken')
    .end(function(err, res) {

    });
});

app.get('/order', function(req, res, next) {
  res.render('order.mustache', {});
});

app.get('/authtoken', function(req, res, next) {
  console.log(req);
  var token = req.body.access_token;

  res.render('order.mustache', {auth: token});
});

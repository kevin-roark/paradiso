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
  app.use('/main.js', browserify('./client/app.js'));
}
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  
});

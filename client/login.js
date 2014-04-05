
/* dependencies */
var $ = require('jquery');
var request = require('superagent');

var DELIV = 'http://sandbox.delivery.com';
var US = '162.243.192.218:3000';
var key;

request.get('/client', function(res) {
  key = res.body.key;
  console.log(key);
});

$('#login').click(function() {
  request
    .post(DELIV + '/third_party/authorize')
    .set('client_id', key)
    .set('redirect_uri', US + '/inside')
    .set('response_type', 'code')
    .set('scope', 'global')
    .set('state', 'lol')
    .end(function(err, res) {
      console.log(res);
    });

  $(this).unbind('click'); // disable future clicks
});

$('#food').click(function() {
  
});

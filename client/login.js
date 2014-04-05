
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
  var query = {
    client_id: key,
    redirect_uri: US + '/inside',
    response_type: 'code',
    scope: 'global',
    state: 'lol'
  };
  var p = $.param(query);
  var qs = DELIV + '/third_party/authorize?' + p; 
  window.location = qs;

  $(this).unbind('click'); // disable future clicks
});


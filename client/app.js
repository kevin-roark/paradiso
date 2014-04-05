
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

$('#food').click(function() {

});

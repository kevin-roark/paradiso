
/* dependencies */
var $ = require('jquery');
var request = require('superagent');

var DELIV = 'http://sandbox.delivery.com';
var US = '162.243.192.218:3000';
var key;
var auth_token = config.auth;
console.log('token: ' + auth_token);

var foodid = '1234';
var curryid = '9';

request.get('/client', function(res) {
  key = res.body.key;
  console.log(key);
});

$('#food').click(function() {
  locations(function(loc) {
    cc(function(card) {
      order(loc, card, function(res) {
        console.log(res);
      });
    }
  })
});

/* calls callback with one argumet -- delivery.com location object */
function locations(callback) {
  request
    .get(DELIV + '/customer/location')
    .set('Authorization', 'Bearer ' + auth_token)
    .end(function(err, res) {
      var locations = res.body.locations;
      if (locations.length) {
        callback(locations[0]);
      }
      else {
        request
          .post(DELIV + '/customer/location')
          .set('Authorization', 'Bearer ' + auth_token)
          .set('street', '526 W. 114th St')
          .set('city', 'New York')
          .set('state', 'NY')
          .set('zip_code', '10025')
          .set('phone', '9857188538')
          .end(function(err, res) {
            var location = res.body.location;
            callback(location);
          });
      }
    });
}

/* calls callback with one argument -- delivery.com cc object */
function cc(callback) {
  request
    .get(DELIV + '/customer/cc')
    .set('Authorization', 'Bearer ' + auth_token)
    .end(function(err, res) {
      var cards = res.body.cards;
      if (cards.length) {
        callback(cards[0]);
      } else {
        request
          .post(DELIV + '/third_party/credit_card/add')
          .set('client_id', key)
          .set('redirect_uri', US + '/authtoken')
          .set('response_type', 'code')
          .set('scope', 'global')
          .set('state', 'cc')
          .end(function(err, res) {
            console.log('redirecting');
          });
      }
    });
}

/* orders food and does callback with response */
function order(loc, card, callback) {
  request
    .post(DELIV + '/customer/cart/' + foodid)
    .set('Authorization', 'Bearer ' + auth_token)
    .set('order_type', 'delivery')
    .set('item', {item_id: curryid, item_qty: 1})
    end(function(err, res) {
      request
        .post(DELIV + '/customer/cart/' + foodid + '/checkout')
        .set('Authorization', 'Bearer ' + auth_token)
        .set('order_type', 'delivery')
        .set('location', loc.id)
        .set('payments', {'type': 'credit_card', 'id': card.id})
        .set('tip', 1.00)
        .end(function(err, res) {
          callback(res);
        });
    });
}

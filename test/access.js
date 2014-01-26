// http://en.gravatar.com/site/implement/xmlrpc/

var verify = require('check-types').verify;
var crypto = require('crypto');
var xmlrpc = require('xmlrpc');
var client;

var email = process.env.GRAVATAR_EMAIL;
verify.unemptyString(email, 'missing process.env.GRAVATAR_USER');
var hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
verify.unemptyString(hash, 'could not generate hash from email ' + email);
console.log('email hash', hash);

var password = process.env.GRAVATAR_PASSWORD;
verify.unemptyString(password, 'missing process.env.GRAVATAR_PASSWORD');
console.log('password', password);


gt.module('gravatar api access', {
  setupOnce: function () {
    client = xmlrpc.createSecureClient('https://secure.gravatar.com/xmlrpc?user=' + hash);
  }
});

var delay = 15000;

gt.async('grav.test', function () {
  client.methodCall('grav.test', [password], function (error, value) {
    console.log('grav.test returned', error, 'value', value);
    gt.start();
  })
}, delay);

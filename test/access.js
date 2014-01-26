// http://en.gravatar.com/site/implement/xmlrpc/

var verify = require('check-types').verify;
var crypto = require('crypto');
var xmlrpc = require('xmlrpc');
require('console.json');
var client;

var email = process.env.GRAVATAR_EMAIL;
verify.unemptyString(email, 'missing process.env.GRAVATAR_USER');
var hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
verify.unemptyString(hash, 'could not generate hash from email ' + email);
console.json({
  email: email,
  hash: hash
});

var password = process.env.GRAVATAR_PASSWORD;
verify.unemptyString(password, 'missing process.env.GRAVATAR_PASSWORD');

gt.module('gravatar api access', {
  setupOnce: function () {
    var secureClientOptions = {
      host: 'secure.gravatar.com',
      path: '/xmlrpc?user=' + hash,
      port: 443
    };
    client = xmlrpc.createSecureClient(secureClientOptions);
  }
});

var delay = 15000;

gt.async('grav.test', function () {
  client.methodCall('grav.test', [{ password: password }], function (error, value) {
    if (error) throw error;
    gt.ok(value, 'a value is returned');
    gt.start();
  });
}, delay);

gt.async('grav.addresses', function () {
  client.methodCall('grav.addresses', [{ password: password }], function (error, addresses) {
    if (error) throw error;
    console.json(addresses);
    gt.object(addresses, 'list of addresses is an object');
    gt.ok(Object.keys(addresses).length > 0, 'there are several addresses');
    gt.start();
  });
}, delay);


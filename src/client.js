// http://en.gravatar.com/site/implement/xmlrpc/

var verify = require('check-types').verify;
var crypto = require('crypto');
var xmlrpc = require('xmlrpc');

function initClient() {
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

  var secureClientOptions = {
    host: 'secure.gravatar.com',
    path: '/xmlrpc?user=' + hash,
    port: 443
  };
  client = xmlrpc.createSecureClient(secureClientOptions);

  // add a couple of methods specific to gravatar api
  client.test = function (cb) {
    client.methodCall('grav.test', [{ password: password }], cb);
  };

  client.addresses = function (cb) {
    client.methodCall('grav.addresses', [{ password: password }], cb);
  };

  client.userimages = function (cb) {
    client.methodCall('grav.userimages', [{ password: password }], cb);
  };

  return client;
}

module.exports = initClient();

// http://en.gravatar.com/site/implement/xmlrpc/

var verify = require('check-types').verify;
var crypto = require('crypto');
var xmlrpc = require('xmlrpc');

function initClient(email, password) {
  var client;

  email = email || process.env.GRAVATAR_EMAIL;
  verify.unemptyString(email, 'missing process.env.GRAVATAR_USER');
  var hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
  verify.unemptyString(hash, 'could not generate hash from email ' + email);

  password = password || process.env.GRAVATAR_PASSWORD;
  verify.unemptyString(password, 'missing process.env.GRAVATAR_PASSWORD');

  var secureClientOptions = {
    host: 'secure.gravatar.com',
    path: '/xmlrpc?user=' + hash,
    port: 443
  };
  client = xmlrpc.createSecureClient(secureClientOptions);

  // add a couple of methods specific to gravatar api
  client.test = function (cb) {
    verify.fn(cb, 'missing callback function');
    client.methodCall('grav.test', [{ password: password }], cb);
  };

  client.addresses = function (cb) {
    verify.fn(cb, 'missing callback function');
    client.methodCall('grav.addresses', [{ password: password }], cb);
  };

  client.userimages = function (cb) {
    verify.fn(cb, 'missing callback function');
    client.methodCall('grav.userimages', [{ password: password }], cb);
  };

  client.useUserimage = function (userimage, addresses, cb) {
    verify.unemptyString(userimage, 'missing userimage string, get it by .userimages call');
    verify.array(addresses, 'missing addresses array, get by .addresses call');
    verify.fn(cb, 'missing callback function');
    console.log('setting image', userimage, 'for addresses', addresses);
    var args = {
      password: password,
      userimage: userimage,
      addresses: addresses
    };
    client.methodCall('grav.useUserimage', [args], cb);
  };

  return client;
}

module.exports = initClient;

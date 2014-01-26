// http://en.gravatar.com/site/implement/xmlrpc/

var verify = require('check-types').verify;
require('console.json');

var client;

gt.module('gravatar api access', {
  setupOnce: function () {
    client = require('../src/client');
    verify.object(client, 'could not initialize client');
  }
});

var delay = 15000;

gt.async('grav.test', function () {
  gt.func(client.test);
  client.test(function (error, value) {
    if (error) throw error;
    gt.ok(value, 'a value is returned');
    gt.start();
  });
}, delay);

gt.async('grav.addresses', function () {
  gt.func(client.addresses);
  client.addresses(function (error, addresses) {
    if (error) throw error;
    console.json(addresses);
    gt.object(addresses, 'list of addresses is an object');
    gt.ok(Object.keys(addresses).length > 0, 'there are several addresses');
    gt.start();
  });
}, delay);


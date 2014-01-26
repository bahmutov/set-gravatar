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

gt.async('test', function () {
  verify.fn(client.test);
  client.test(function (error, value) {
    if (error) throw error;
    gt.ok(value, 'a value is returned');
    gt.start();
  });
}, delay);

gt.async('addresses', function () {
  verify.fn(client.addresses);
  client.addresses(function (error, addresses) {
    if (error) throw error;
    // console.json(addresses);
    gt.object(addresses, 'list of addresses is an object');
    gt.ok(Object.keys(addresses).length > 0, 'there are several addresses');
    gt.start();
  });
}, delay);

gt.async('userimages', function () {
  verify.fn(client.userimages);
  client.userimages(function (error, images) {
    if (error) throw error;
    console.json(images);
    gt.object(images, 'list of images is an object');
    gt.ok(Object.keys(images).length > 0, 'there are several images');
    gt.start();
  });
}, delay);

gt.async('useUserimage', function () {
  verify.fn(client.useUserimage);

  client.addresses(function (error, addresses) {
    var as = Object.keys(addresses);
    gt.ok(as.length > 0, 'addresses has no keys');

    client.userimages(function (error, images) {
      var is = Object.keys(images);
      gt.ok(is.length > 0, 'user images has not values');
      var image = is[0];
      var url = images[image][1];
      verify.webUrl(url, 'could not get image url by id ' + image);
      console.json('setting user image', { id: image, url: url });
      client.useUserimage(image, as, function (error, results) {
        if (error) throw error;
        console.log('results', results);
        gt.object(results, 'results is an object');
        Object.keys(results).forEach(function (email) {
          gt.ok(results[email], 'could not set image for email', email);
        });
        gt.start();
      });
    });
  });
}, delay);

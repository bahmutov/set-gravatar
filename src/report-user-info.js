var initClient = require('./client');
var verify = require('check-types').verify;
var Table = require('easy-table');

function reportUserInfo(email, password, cb) {
  verify.unemptyString(email, 'expected email');
  verify.unemptyString(password, 'expected password');
  if (cb) {
    verify.fn(cb, 'expected callback function');
  }
  var client = initClient(email, password);
  verify.object(client, 'could not init client');

  client.addresses(function (err, addresses) {
    if (err) throw err;
    console.log('user emails', Object.keys(addresses));

    client.userimages(function (err, images) {
      if (err) throw err;

      var info = {};
      Object.keys(images).forEach(function (id) {
        var props = images[id];
        var url = props[1];
        verify.webUrl(url, 'could not get image url from ' + props);
        info[id] = url;
      });

      var t = new Table();

      console.log('user images:');
      Object.keys(info).forEach(function (id) {
        var url = info[id];
        t.cell('id', id);
        t.cell('url', url);
        t.newRow();
      });
      console.log(t.toString());

      if (cb) {
        cb({
          addresses: Object.keys(addresses),
          images: info
        });
      }

    });
  });
}

module.exports = reportUserInfo;

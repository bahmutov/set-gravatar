require('console.json');

var verify = require('check-types').verify;
var prompt = require('prompt');
var schema = {
  properties: {
    email: {
      description: 'Gravatar email',
      type: 'string',
      required: true
    },
    password: {
      description: 'Gravatar password',
      type: 'string',
      hidden: true,
      required: true
    }
  }
};

prompt.start();
prompt.get(schema, function (err, result) {
  if (err) throw err;

  var client = require('./src/client')(result.email, result.password);
  verify.object(client, 'could not init client');

  client.addresses(function (err, addresses) {
    if (err) throw err;
    console.log('user emails', Object.keys(addresses));

    client.userimages(function (err, images) {
      if (err) throw err;
      console.log('user images:');
      Object.keys(images).forEach(function (id) {
        var props = images[id];
        console.log('id', id, 'url', props[1]);
      });
    });
  });
});

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
  console.json(result);

  var client = require('./src/client')(result.email, result.password);
  verify.object(client, 'could not init client');
});

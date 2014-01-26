require('console.json');

if (module.parent) {
  module.exports = require('./src/client');
} else {
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

    var report = require('./src/report-user-info');
    verify.fn(report, 'expected report function');
    report(result.email, result.password);
  });
}

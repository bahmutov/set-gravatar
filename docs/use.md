`node index.js` asks you for email and password and reports your email
addresses and gravatar urls.

You can use this module from other modules, for example

```js
var gravatar = require('set-gravatar')(email, password);
gravatar.addresses(function (err, addresses) {
    if (err) throw err;
    console.log('user emails', Object.keys(addresses));
});
```

For more examples, see [report-user-info](src/report-user-info.js) and
[unit tests](test/access.js).

Uses Gravatar's [xml-rpc](http://en.gravatar.com/site/implement/xmlrpc/)
interface.


# set-gravatar v0.0.0

> Change Gravatar profile image from Nodejs

[![NPM][set-gravatar-icon] ][set-gravatar-url]

[![Build status][set-gravatar-ci-image] ][set-gravatar-ci-url]
[![dependencies][set-gravatar-dependencies-image] ][set-gravatar-dependencies-url]
[![devdependencies][set-gravatar-devdependencies-image] ][set-gravatar-devdependencies-url]

[set-gravatar-icon]: https://nodei.co/npm/set-gravatar.png?downloads=true
[set-gravatar-url]: https://npmjs.org/package/set-gravatar
[set-gravatar-ci-image]: https://travis-ci.org/bahmutov/set-gravatar.png?branch=master
[set-gravatar-ci-url]: https://travis-ci.org/bahmutov/set-gravatar
[set-gravatar-dependencies-image]: https://david-dm.org/bahmutov/set-gravatar.png
[set-gravatar-dependencies-url]: https://david-dm.org/bahmutov/set-gravatar
[set-gravatar-devdependencies-image]: https://david-dm.org/bahmutov/set-gravatar/dev-status.png
[set-gravatar-devdependencies-url]: https://david-dm.org/bahmutov/set-gravatar#info=devDependencies



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




### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/set-gravatar/issues) on Github



## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.



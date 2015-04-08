'use strict';

var Command     = require('../models/command');
var SilentError = require('../errors/silent');
var Promise     = require('../ext/promise');

module.exports = Command.extend({
  name: 'install:addon',
  description: 'Deprecated. You can use `ember install` for ember-cli addons.',
  works: 'insideProject',

  anonymousOptions: [
    '<addon-name>'
  ],

  run: function() {
    var err  = 'This command has been deprecated. Please use `ember install ';
    err     += '<addonName>` instead.';
    return Promise.reject(new SilentError(err));
  }
});

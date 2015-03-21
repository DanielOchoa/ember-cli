'use strict';

var Command     = require('../models/command');
var Promise     = require('../ext/promise');
var SilentError = require('../errors/silent');

module.exports = Command.extend({
  name: 'install',
  description: 'Installs an ember-cli addon from npm.',
  works: 'insideProject',

  anonymousOptions: [
    '<addon-name>'
  ],

  run: function(commandOptions, rawArgs) {
    if (!rawArgs.length) {
      var msg = 'The `install` command must take an argument with the name of ';
      msg    += 'an ember-cli addon. For installing all npm and bower dependencies ';
      msg    += 'you can run `npm install && bower install`.';
      return Promise.reject(new SilentError(msg));
    }
    var AddonInstallTask = this.tasks.AddonInstall;
    var addonInstall = new AddonInstallTask({
      ui:              this.ui,
      analytics:       this.analytics,
      project:         this.project,
      NpmInstallTask:  this.tasks.NpmInstall,
      BlueprintTask:   this.tasks.GenerateFromBlueprint
    });

    var packageName = rawArgs.slice(0,1)[0];
    var extraArgs   = rawArgs.slice(1);

    return addonInstall.run({
      'package':         packageName,
      extraArgs:         extraArgs,
      blueprintOptions:  commandOptions
    });
  }
});

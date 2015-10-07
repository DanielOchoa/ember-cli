'use strict';

var Command = require('../models/command');
var SilentError = require('silent-error');
var Promise = require('../ext/promise');

module.exports = Command.extend({
  name: 'uninstall',
  description: 'Uninstalls an ember-cli addon from npm.',
  works: 'insideProject',

  anonymousOptions: [
    '<addon-name>'
  ],

  run: function(commandOptions, addonNames) {
    if (!addonNames.length) {
      var msg  = 'The `uninstall` command must take an argument with the name';
      msg     += ' of an ember-cli addon. For uninstalling all npm and bower ';
      msg     += 'dependencies you can run `npm uninstall <package-name> --sa';
      msg     += 've && bower uninstall <package-name> --save`.';
      return Promise.reject(new SilentError(msg));
    }

    var AddonInstallTask = this.tasks.npmUninstall;

    var addonUninstall = new AddonUninstallTask({
      ui:              this.ui,
      analytics:       this.analytics,
      project:         this.project,
      NpmInstallTask:  this.tasks.NpmInstall,
      BlueprintTask:   this.tasks.GenerateFromBlueprint
    });

    return addonInstall.run({
      'packages': addonNames,
      blueprintOptions: commandOptions
    });
  }
});

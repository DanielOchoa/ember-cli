'use strict';

var expect = require('chai').expect;
var InstallAddonCommand = require('../../../lib/commands/install-addon');
var commandOptions = require('../../factories/command-options');

describe('install:addon command', function() {
  var command, options, msg;
  before(function() {
    options = commandOptions({
      settings: {},
      project: {
        name: function() {
          return 'some-random-name';
        },
        isEmberCLIProject: function() {
          return true;
        }
      }
    });

    command = new InstallAddonCommand(options);

    msg  = 'This command has been deprecated. Please use `ember install ';
    msg += '<addonName>` instead.';
  });

  describe('with args', function() {
    it('gives a helpful message if no arguments are passed', function() {
      return command.validateAndRun(['ember-cli-cordova']).then(function() {
        expect(false, 'should reject with error');
      }).catch(function(err) {
        expect(err.message).to.equal(msg, 'expect error to have a helpful message');
      });
    });
  });

  describe('without args', function() {
    it('gives a helpful message if no arguments are passed', function() {
      return command.validateAndRun([]).then(function() {
        expect(false, 'should reject with error');
      }).catch(function(err) {
        expect(err.message).to.equal(msg, 'expect error to have a helpful message');
      });
    });
  });
});

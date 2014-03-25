'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ProviderGenerator = module.exports = function ProviderGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
  console.log('You called the provider subgenerator with the argument ' + this.name + '.');
};

util.inherits(ProviderGenerator, ScriptBase);

ProviderGenerator.prototype.createProviderFiles = function createProviderFiles() {
  var dest;
  if (this.group) {
    dest = [this.group, 'services'].join('/')
  } else {
    dest = 'services';
  }
  this.generateSourceAndTest(
    'provider',
    'spec/service',
    dest,
    this.options['skip-add'] || false
  );


};

'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ProviderGenerator = module.exports = function ProviderGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
  console.log('You called the provider subgenerator with the argument ' + this.name + '.');
};

util.inherits(ProviderGenerator, ScriptBase);

ProviderGenerator.prototype.createProviderFiles = function createProviderFiles() {
  this.generateSourceAndTest(
    'provider',
    'spec/service',
    'services',
    this.options['skip-add'] || false
  );


};

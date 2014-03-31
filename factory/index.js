'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js')

var FactoryGenerator = module.exports = function FactoryGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  ScriptBase.apply(this, arguments);
  console.log('You called the factory subgenerator with the argument ' + this.name + '.');
};

util.inherits(FactoryGenerator, ScriptBase);

FactoryGenerator.prototype.createFactoryFiles = function createFactoryFiles() {
  this.generateSourceAndTest(
    'service/factory',
    'spec/service',
    'services',
    this.options['skip-add'] || false
  );

};

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
  var dest;
  if (this.group) {
    dest = [this.group, 'services'].join('/')
  } else {
    dest = 'services';
  }
  this.generateSourceAndTest(
    'service/factory',
    'spec/service',
    dest,
    this.options['skip-add'] || false
  );

};

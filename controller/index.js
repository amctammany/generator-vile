'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  ScriptBase.apply(this, arguments);
  console.log('You called the controller subgenerator with the argument ' + this.name + '.');

};

util.inherits(ControllerGenerator, ScriptBase);

ControllerGenerator.prototype.createControllerFiles = function createControllerFiles() {
  this.generateSourceAndTest(
    'controller',
    'spec/controller',
    'controllers',
    this.options['skip-add'] || false
  );
};

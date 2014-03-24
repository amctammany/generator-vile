'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  ScriptBase.apply(this, arguments);
  console.log('You called the controller subgenerator with the argument ' + this.name + '.');

  this.groups = this.name.split(':');

  if (this.groups.length === 1) {
    this.name = this.groups[0];
  } else if (this.groups.length === 2) {
    this.group = this.groups[0];
    this.name = this.groups[1];
  } else {
    throw 'You fucked up';
  }

};

util.inherits(ControllerGenerator, ScriptBase);

ControllerGenerator.prototype.createControllerFiles = function createControllerFiles() {
  this.classedName = this._.classify(this.name);
  var dest;
  if (this.group) {
    dest = [this.group, 'controllers'].join('/')
  } else {
    dest = 'controllers';
  }
  this.generateSourceAndTest(
    'controller',
    'spec/controller',
    dest,
    this.options['skip-add'] || false
  );
};

'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js')

var ClassGenerator = module.exports = function ClassGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
  console.log('You called the class subgenerator with the argument ' + this.name + '.');
};

util.inherits(ClassGenerator, ScriptBase);

ClassGenerator.prototype.createClassFiles = function createClassFiles() {
  var dest;
  if (this.group) {
    dest = [this.group, 'services'].join('/')
  } else {
    dest = 'services';
  }
  this.generateSourceAndTest(
    'class',
    'spec/class',
    dest,
    this.options['skip-add'] || false
  );

};

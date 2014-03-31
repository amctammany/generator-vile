'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js')

var ClassGenerator = module.exports = function ClassGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
  console.log('You called the class subgenerator with the argument ' + this.name + '.');
};

util.inherits(ClassGenerator, ScriptBase);

ClassGenerator.prototype.createClassFiles = function createClassFiles() {
  this.generateSourceAndTest(
    'class',
    'spec/class',
    'services',
    this.options['skip-add'] || false
  );

};

'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);

  console.log('You called the service subgenerator with the argument ' + this.name + '.');
};

util.inherits(ServiceGenerator, ScriptBase);

ServiceGenerator.prototype.createServiceFiles = function createServiceFiles() {
  this.generateSourceAndTest(
    'service/service',
    'spec/service',
    'services',
    this.options['skip-add'] || false
  );

};

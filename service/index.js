'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);

  console.log('You called the service subgenerator with the argument ' + this.name + '.');
};

util.inherits(ServiceGenerator, ScriptBase);

ServiceGenerator.prototype.createServiceFiles = function createServiceFiles() {
  var dest;
  if (this.group) {
    dest = [this.group, 'services'].join('/')
  } else {
    dest = 'services';
  }
  this.generateSourceAndTest(
    'service/service',
    'spec/service',
    dest,
    this.options['skip-add'] || false
  );

};

'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);

  console.log('You called the directive subgenerator with the argument ' + this.name + '.');
};

util.inherits(DirectiveGenerator, ScriptBase);

DirectiveGenerator.prototype.createDiretiveFiles = function createDiretiveFiles() {
  var dest;
  if (this.group) {
    dest = [this.group, 'directives'].join('/')
  } else {
    dest = 'directives';
  }
  this.generateSourceAndTest(
    'directive',
    'spec/directive',
    dest,
    this.options['skip-add'] || false
  );


};

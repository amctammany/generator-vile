'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);

  console.log('You called the directive subgenerator with the argument ' + this.name + '.');
};

util.inherits(DirectiveGenerator, ScriptBase);

DirectiveGenerator.prototype.createDiretiveFiles = function createDiretiveFiles() {
  this.generateSourceAndTest(
    'directive',
    'spec/directive',
    'directives',
    this.options['skip-add'] || false
  );


};

'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
  this.templated = options['template'];
  console.log('You called the directive subgenerator with the argument ' + this.name + '.');
};

util.inherits(DirectiveGenerator, ScriptBase);

DirectiveGenerator.prototype.createDiretiveFiles = function createDiretiveFiles() {
  var template, appTemplate = 'directive';
  if (this.templated) {
    appTemplate = 'directive-templated';
    this.write(path.join('app/templates', this.name + '.html'), ['<div>', '</div>'].join('\n'));
  }
  this.generateSourceAndTest(
    appTemplate,
    'spec/directive',
    'directives',
    this.options['skip-add'] || false
  );


};

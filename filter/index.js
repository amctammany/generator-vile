'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);

  console.log('You called the filter subgenerator with the argument ' + this.name + '.');
};

util.inherits(FilterGenerator, ScriptBase);

FilterGenerator.prototype.createFilterFiles = function createFilterFiles() {
  this.generateSourceAndTest(
    'filter',
    'spec/filter',
    'filters',
    this.options['skip-add'] || false
  );


};

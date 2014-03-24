
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  ScriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(ViewGenerator, ScriptBase);

ViewGenerator.prototype.createViewFiles = function createViewFiles() {
  var dest;
  if (this.group) {
    dest = ['views', this.group].join('/')
    this.fullname = [this.group, this.name].map(this._.classify).join(':');
  } else {
    dest = 'views';
    this.fullname = this._.classify(this.name);

  }

  //this.htmlTemplate('view.html', path.join(dest, this.name.toLowerCase() + '.html'));
  this.template('view.html', path.join(this.env.options.appPath, dest, this.name.toLowerCase() + '.html'));
};

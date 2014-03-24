
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('You called the view subgenerator with the argument ' + this.name + '.');
  this.sourceRoot(path.join(__dirname, '../templates'));

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

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

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.createViewFiles = function createViewFiles() {
  var dest;
  if (this.group) {
    dest = ['views', this.group].join('/')
  } else {
    dest = 'views';
  }

  this.template('view.html', path.join(this.env.options.appPath, dest, this.name.toLowerCase() + '.html'));
};

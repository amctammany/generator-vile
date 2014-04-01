'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./utils.js');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }

  this.appname = this._.slugify(this._.humanize(this.appname));
  this.scriptAppName = this._.camelize(this.appname) + 'App';
  this.groups = this.name.split(':');

  this.name = this.groups.splice(-1, 1)[0];
  this.group = this.groups.splice(0, 1)[0];
  if (this.groups.length >= 1) {
    this.subgroups = this.groups.join('/');
  }


  this.cameledName = this._.camelize(this.name);
  this.classedName = this._.classify(this.name);

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }
  if (typeof this.env.options.testPath === 'undefined') {
    try {
      this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
    } catch (e) {}
    this.env.options.testPath = this.env.options.testPath || 'test/spec';
  }

  var sourceRoot = '/templates/javascript';
  this.scriptSuffix = '.js';

  this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.appPath, dest.toLowerCase()) + this.scriptSuffix
  ]);
};

Generator.prototype.testTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.testPath, dest.toLowerCase()) + this.scriptSuffix
  ]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src,
    path.join(this.env.options.appPath, dest.toLowerCase())
  ]);
};

Generator.prototype.addScriptToIndex = function (script) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'index.html');
    angularUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="scripts/' + script.toLowerCase().replace(/\\/g, '/') + '.js"></script>'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetType, skipAdd) {
  // Add group and subgroups
  var targetDirectory = targetType;
  if (this.group) {
    if (this.subgroups) {
      targetDirectory = [this.group, targetType, this.subgroups].join('/');
    } else {
      targetDirectory = [this.group, targetType].join('/')
    }
  }
  // Add group prefix to controller name
  //if ((this.generatorName.toLowerCase() === 'controller' || this.generatorName.toLowerCase() === 'route') && this.group) {
    //console.log('classifing controller with group');
    //this.classedName = this._.classify(this.group) + this._.classify(this.name);
  //}
  // Services use classified names
  if (this.generatorName.toLowerCase() === 'service') {
    this.cameledName = this.classedName;
  }

  this.appTemplate(appTemplate, path.join('scripts', targetDirectory, this.name));
  this.testTemplate(testTemplate, path.join(targetDirectory, this.name));
  if (!skipAdd) {
    this.addScriptToIndex(path.join(targetDirectory, this.name));
  }
};

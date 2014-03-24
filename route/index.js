'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../utils.js');

var RouteGenerator = module.exports = function RouteGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  ScriptBase.apply(this, arguments);
  this.hookFor('vile:controller');
  this.hookFor('vile:view');
  console.log(this.group);
  console.log(this.name);

  //this.groups = this.name.split(':');

  //if (this.groups.length === 1) {
    //this.name = this.groups[0];
  //} else if (this.groups.length === 2) {
    //this.group = this.groups[0];
    //this.name = this.groups[1];
  //} else {
    //throw 'You fucked up';
  //}

  console.log('You called the route subgenerator with the argument ' + this.name + '.');
};

util.inherits(RouteGenerator, ScriptBase);

RouteGenerator.prototype.rewriteAppJs = function () {
  this.classedName = this._.classify(this.name);
  var dest, route;
  if (this.group) {
    dest = ['views', this.group].join('/') + '/';
    route = [this.group, this.name].join('/');
  } else {
    dest = 'views/';
    route = this.name;
  }
  var config = {
    file: path.join(this.env.options.appPath, 'scripts/app.js'),
    needle: '.otherwise',
    splicable: [
      ".when('/" + route + "', {",
      "  templateUrl: '" + dest + this.name.toLowerCase() + ".html',",
      "  controller: '" + this.classedName + "Ctrl'",
      "})"
    ]
  };

  angularUtils.rewriteFile(config);
};

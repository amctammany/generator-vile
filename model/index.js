'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.Base.apply(this, arguments);

  this.props = [];

  this.argument('name', {type: String, required: true});
  this.classedName = this._.classify(this.name);
  var prop, type;
  for (var i = 1; i < args.length; i++) {
    var props = args[i];
    var groups = props.split(':');
    if (groups.length === 1) {
      prop = groups[0];
      type = 'String';
    } else if (groups.length === 2) {
      prop = groups[0];
      type = this._.classify(groups[1]);
    } else if (groups.length > 2) {
      throw 'Cannot have subproperties yet';
    }
    this.props.push({
      prop: prop,
      type: type
    });
  }

  console.log(this.props);

  console.log('You called the model subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.createMongooseDocument = function createMongooseDocument() {
  var _ = this._;
  this.schema = this.props.map(function (p) {
    return [p.prop, _.classify(p.type)].join(': ') + ','
  }).join('\n  ');
  this.template('model.js', path.join('db', this.name + '.js'));

};

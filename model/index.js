'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../utils.js');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  //yeoman.generators.Base.apply(this, arguments);
  ScriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, 'templates'));

  //try {
    //this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  //} catch (e) {
    //this.appname = path.basename(process.cwd());
  //}

  //this.appname = this._.slugify(this._.humanize(this.appname));
  //this.scriptAppName = this._.camelize(this.appname) + 'App';


  this.props = {};

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

    this.props[prop] = type;
    //this.props.push({
      //prop: prop,
      //type: type
    //});
  }

  if (options.hasOwnProperty('identifier')) {
    console.log('identified!');
    this.identifier = options.identifier;
  } else {
    this.identifier = this.props.hasOwnProperty('name') ? 'name' : '_id';
  }
  console.log(this.identifier);

  console.log('You called the model subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModelGenerator, ScriptBase);

ModelGenerator.prototype.askForPlural = function askForPlural() {
  var cb = this.async();

  var prompts = [{
    name: 'pluralizedName',
    message: 'What is the plural form of this model? (RESTful base)'
  }];

  this.prompt(prompts, function (props) {
    this.pluralizedName = props.pluralizedName.toLowerCase()
    cb();
  }.bind(this));
};

ModelGenerator.prototype.createMongooseDocument = function createMongooseDocument() {
  //var _ = this._;
  //this.schema = this.props.map(function (p) {
    //return [p.prop, _.classify(p.type)].join(': ') + ','
  //}).join('\n  ');
  var proplist = [];
  for (var key in this.props) {
    var value = this._.classify(this.props[key]);
    proplist.push([key, value].join(': ') + ',')
  }
  this.schema = proplist.join('\n  ');
  console.log(this.props);

  this.template('model.js', path.join('db', this.name + '.js'));

  angularUtils.rewriteFile({
    file: 'db/index.js',
    needle: '// endmodel',
    splicable: [
      "require('./" + this.name.toLowerCase() + "');"
    ]
  });
};

ModelGenerator.prototype.createRouteFiles = function createRouteFiles() {
  this.template('router.js', path.join('routes', this.pluralizedName + '.js'));

  angularUtils.rewriteFile({
    file: 'routes/index.js',
    needle: '// endmodel',
    splicable: [
      "require('./" + this.pluralizedName.toLowerCase() + "')(app);"
    ]
  });
};

ModelGenerator.prototype.createServiceFile = function createServiceFile() {
  this.template('service.js', path.join('app/scripts/services', this.name + '.js'));
  this.addScriptToIndex(path.join('services', this.name));
};

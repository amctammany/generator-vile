'use strict';
var util = require('util');
var path = require('path');
var wiredep = require('wiredep');
var fs = require('fs');
var yeoman = require('yeoman-generator');


var VileGenerator = module.exports = function VileGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', {type: String, required: false});
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

  this.scriptAppName = this.appname + 'App'

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: this._injectDependencies.bind(this)
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(VileGenerator, yeoman.generators.Base);

//VileGenerator.prototype.askFor = function askFor() {
  //var cb = this.async();

  //// have Yeoman greet the user.
  //console.log(this.yeoman);

  //var prompts = [{
    //name: 'projectName',
    //message: 'What would you like to name this project?'
  //}];

  //this.prompt(prompts, function (props) {
    //this.projectName = props.projectName;

    //cb();
  //}.bind(this));
//};

VileGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/views');
  this.mkdir('app/bower_components');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/styles/src');

  this.mkdir('config');
  this.mkdir('config/environments');

  this.mkdir('routes');
  this.mkdir('test');
};

VileGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
  this.copy('_app.js', 'app.js');
  this.copy('_server.js', 'server.js');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('env', '.env');
  this.copy('Procfile', 'Procfile');
  this.copy('_karma.conf.js', 'karma.conf.js');
  this.copy('_karma-e2e.conf.js', 'karma-e2e.conf.js');
  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');

  this.copy('app/styles/app.css', 'app/styles/app.css');
  this.copy('app/styles/src/app.styl', 'app/styles/src/app.styl');

  this.copy('app/views/home.html', 'app/views/home.html');

  this.template('app/scripts/_app.js', 'app/scripts/app.js');
  this.template('app/scripts/controllers/_main.js', 'app/scripts/controllers/main.js');
  this.template('app/scripts/controllers/_home.js', 'app/scripts/controllers/home.js');

  this.copy('config/environments/_index.js', 'config/environments/index.js');
  this.copy('config/environments/_development.js', 'config/environments/development.js');
  this.copy('config/environments/_production.js', 'config/environments/production.js');

  this.copy('routes/_index.js', 'routes/index.js');
};

VileGenerator.prototype.writeIndex = function writeIndex() {
  this.indexFile = this.engine(this.read('app/index.html'), this);

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js', 'scripts/controllers/home.js'],
    serachPath: ['.tmp', 'app']
  });
  this.write('app/index.html', this.indexFile);
};

VileGenerator.prototype._injectDependencies = function _injectDependencies() {
  wiredep({
    directory: 'app/bower_components',
    bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
    ignorePath: 'app/',
    src: 'app/index.html',
    fileTypes: {
      html: {
        replace: {
          css: '<link rel="stylesheet" href="{{filePath}}">'
        }
      }
    }
  });
};

var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();
app.directory = __dirname;

// Replace with url of your MongoDB server
//var mongoUrl = '';
// My default test MongoDB server
var mongoUrl = 'mongodb://heroku_app23303513:3d223u021e66efbn648j3aa04h@ds033797.mongolab.com:33797/heroku_app23303513';


if (mongoUrl) {
  mongoose.connect(mongoUrl);
  var db = mongoose.connection;
  db.once('open', function () {
    console.log('DB Connection Successful');
  });
}

require('./db');

require('./config/environments')(app);
require('./routes')(app);

module.exports = app;

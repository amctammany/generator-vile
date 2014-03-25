var express = require('express'),
    routes = require('./routes'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();
app.directory = __dirname;

// Replace with url of your MongoDB server
var mongoUrl = '';


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

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var <%= classedName %>Schema = new Schema({
  <%= schema %>

});

mongoose.model('<%= classedName %>', <%= classedName %>Schema);

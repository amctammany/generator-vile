'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var <%= classedName %>Schema = new Schema({
  <%= schema %>
  urlString: String
});

<%= classedName %>Schema.pre('save', function (next) {
  if (this.<%= identifier %>) {
    <% if (typeof identifier === 'String') { %>
    this.urlString = this.<%= identifier %>.toLowerCase().replace(/\s+/g, '-');
    <% } else { %>
    this.urlString = this.<%= identifier %>;
    <% } %>
  }
  next();
});

mongoose.model('<%= classedName %>', <%= classedName %>Schema);

'use strict';

var mongoose = require('mongoose');

module.exports = function (app) {
  var <%= classedName %> = mongoose.model('<%= classedName %>');

  // GET /<%= pluralizedName %> => Index
  app.get('/<%= pluralizedName %>', function (req, res) {
    <%= classedName %>.find()
      .exec(function (err, <%= pluralizedName %>) {
        if (err) { console.log(err); }
        res.send(<%= pluralizedName %>);
      });
  });

  // GET /<%= pluralizedName %>/id => Show
  app.get('/<%= pluralizedName %>/:id', function (req, res) {
    <%= classedName %>.findOne({urlString: req.params.id})
      .exec(function (err, <%= name %>) {
        if (err) { console.log(err); }
        res.send(<%= name %>);
      });
  });

  // DEL /<%= pluralizedName %>/id => Remove
  app.del('/<%= pluralizedName %>/:id', function (req, res) {
    <%= classedName %>.findOneAndRemove({urlString: req.params.id}, function (err, <%= name %>) {
      if (err) { console.log(err); }
      res.send(<%= name %>);
    });
  });

  // POST /<%= pluralizedName %> => Create
  app.post('/<%= pluralizedName %>', function (req, res) {
    var <%= name %> = new <%= classedName %>(req.body);
    <%= name %>.save(function (err) {
      if (err) { console.log(err); }
      res.send(<%= name %>);
    });
  });

  // POST /<%= pluralizedName %>/id => Update
  app.post('/<%= pluralizedName %>', function (req, res) {
    <%= classedName %>.findOne({urlString: req.params.id}, function (err, <%= name %>) {
      if (err) {console.log(err);}
      <% _.each(_.keys(props), function (key) { %>
      <%= name %>.<%= key %> = req.body.<%= key %>
      <% }) %>
      <%= name %>.save(function (err) {
        if (err) { console.log(err); }
        res.send(<%= name %>);
      });
    });
  });

};

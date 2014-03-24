'use strict';

var mongoose = require('mongoose');

module.exports = function (app) {
  var <%= classedName %> = mongoose.model('<%= classedName %>');

  app.get('/<%= _.camelize(name) %>', function (req, res) {
    <%= classedName %>.find()
      .exec(function (err, <%= _.camelize(name) %>) {
        if (err) { console.log(err); }
        res.send(<%= _.camelize(name) %>);
      });
  });

};

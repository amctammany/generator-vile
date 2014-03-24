'use strict';

module.exports = function (app) {
  // model:rest
  // endmodel
  app.get('/', function (req, res) {
    res.render('index', {
      title: 'MEAN Page'
    });
  });
};

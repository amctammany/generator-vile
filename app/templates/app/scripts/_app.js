'use strict';

angular.module('<%= scriptAppName %>', ['ngRoute', 'ngResource', 'ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });
  });

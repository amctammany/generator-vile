'use strict';

angular.module('<%= scriptAppName %>')
  .controller('HomeCtrl', function ($scope) {
    $scope.things = [
      'Angular',
      'Express',
      'MongoDB'
    ];
  });

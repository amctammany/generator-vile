'use strict';

angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', function () {
    return {
      templateUrl: 'templates/<%= name %>.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Do stuff with template
      }
    };
  });

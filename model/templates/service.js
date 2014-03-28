'use strict';

angular.module('<%= scriptAppName %>')
  .factory('<%= classedName %>', function ($resource) {
    return $resource('<%= pluralizedName %>/:id', {id: '@urlString'}, {
        update: {method: 'PUT'}
    });
  });



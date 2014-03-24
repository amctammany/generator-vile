'use strict';

describe('Controller: <%= classedName %>Ctrl', function () {

  beforeEach(module('<%= scriptAppName %>'));

  var <%= classedName %>Ctrl,
      scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.new();
    <%= classedName %>Ctrl = $controller('<%= classedName %>Ctrl', {
      $scope: scope
    });
  }));

  it('should do something', function () {
    expect(scope.foo).toBe('foo');
  });

});

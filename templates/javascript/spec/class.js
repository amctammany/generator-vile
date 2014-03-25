'use strict';

describe('Class: <%= classedName %>', function () {
  beforeEach(module('<%= scriptAppName %>'));

  var <%= classedName %>;
  beforeEach(inject(function (_<%= classedName %>_) {
    <%= classedName %> = _<%= classedName %>_;
  }));

  it('should do something', function () {
    expect(!!<%= classedName %>).toBe(true);
  });

});

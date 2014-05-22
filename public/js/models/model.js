define(function (require) {
  var Backbone = require('backbone');

  require('backbone.deep-model');

  // Extend base Backbone.DeepModel.
  var Model = Backbone.DeepModel.extend({
    // ...
  });

  return Model;
});

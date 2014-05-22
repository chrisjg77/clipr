define(function (require) {
  var Backbone = require('backbone')
    , Model = require('models/model')
    ;

  // Extend Backbone's base Collection.
  var Collection = Backbone.Collection.extend({
    // Use our modified base Model instead of Backbone's.
    model: Model,

    // URL for AJAX fetching/saving collections.
    // Collections must provide `_type` property for this to function.
    url: function () {
      return '/api/' + this._type;
    }
  });

  return Collection;
});

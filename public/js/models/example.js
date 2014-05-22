define(function (require) {
  var Model = require('models/model');

  // Extend the base model.
  var Signer = Model.extend({
    url: '/sign'
  });

  return Signer;
});

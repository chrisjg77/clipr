define(function (require) {
  var Collection = require('collections/collection')
    , Signer = require('models/signer')
    ;

  // Extend our base Collection.
  var Signers = Collection.extend({
    _type: 'signers',
    model: Signer,

    comparator: function (model) {
      return -(new Date(model.get('created')).getTime());
    }
  });

  return Signers;
});

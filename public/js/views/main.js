define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  var MainView = Marionette.ItemView.extend({
    template: require('hbs!main'),
    templateHelpers: {'conf':conf}
  });

  return MainView;

});

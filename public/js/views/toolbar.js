define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  // App-level plugins.
  require('plugins/range-slider');

  var ToolbarView = Marionette.ItemView.extend({
    template: require('hbs!toolbar'),
    templateHelpers: {'conf':conf},
    className: "toolbar animated slideInLeft",

  });

  return ToolbarView;

});

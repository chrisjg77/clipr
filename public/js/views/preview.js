define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  var PreviewView = Marionette.ItemView.extend({
    template: require('hbs!preview'),
    templateHelpers: {'conf':conf},
    className: "video-preview animated slideInDown",

  });

  return PreviewView;

});

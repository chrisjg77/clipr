define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  var ToolbarView = Marionette.ItemView.extend({
    template: require('hbs!toolbar'),
    templateHelpers: {'conf':conf},
    className: "toolbar animated slideInLeft",

    ui: {
      close: '.toolbar-close',
      toolbar: '.toolbar'
    },

    events: {
      'click @ui.close': 'exitEditor'
    },

    exitEditor: function(e) {
      this.$el.addClass('slideOutLeft');
      window.location = '/';
      e.preventDefault();
    }

  });

  return ToolbarView;

});

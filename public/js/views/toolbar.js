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
      toolbar: '.toolbar',
      stepLabel: '.toolbar-nav li'
    },

    events: {
      'click @ui.close': 'exitEditor'
    },

    initialize: function() {
      var self = this;
      app.on('change:step', function(step) {
        self.ui.stepLabel.removeClass('active');
        self.ui.stepLabel.eq(step-1).addClass('active');
      });
    },

    exitEditor: function(e) {
      this.$el.addClass('slideOutLeft');
      window.location = '/';
      e.preventDefault();
    }

  });

  return ToolbarView;

});

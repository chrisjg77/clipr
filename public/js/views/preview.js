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

    ui: {
      video: '.preview-video'
    },

    initialize: function() {
      var self = this;
      app.on('change:filter', function(filter) {
        console.log(filter);
        self.ui.video.attr('class','preview-video').addClass(filter);
      });
    }

  });

  return PreviewView;

});

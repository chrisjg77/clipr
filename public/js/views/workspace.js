define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  // App-level plugins.
  require('plugins/range-slider');

  var WorkspaceView = Marionette.ItemView.extend({
    template: require('hbs!workspace'),
    templateHelpers: {'conf':conf},
    className: 'workspace animated slideInRight',

    ui: {
      sourceSelect: '.source-select',
      inputUrl: '.input-url input',
      link: '.source-link',
      linkForm: '.form-link',
      upload: '.source-upload',
      uploadForm: '.form-upload',
      sourceForm: '.form-source',
      video: '.video',
      next: '.next-step'
    },

    events: {
      'click @ui.link': 'showLinkForm',
      'keyup @ui.inputUrl': 'goToNext',
      'click @ui.next': 'goToNext'
    },

    initialize: function (options) {
      this.step = 2;
    },

    onDomRefresh: function() {
      var self = this,
          vid_w = self.ui.video.width(),
          vid_h = vid_w*0.565;

      app.rangeSlider.init();

      // Adjust video height
      this.ui.video.css('height',vid_h);
      $(window).on('resize', function() {
        var vid_w = self.ui.video.width(),
            vid_h = vid_w*0.565;

        self.ui.video.css('height',vid_h);
      });
    },

    templateHelpers: function () {
       return _.extend({},
        {
          step: this.step,
        }
      );
     },

    goToNext: function(e) {
      this.renderStep(this.step++);
    },

    renderStep: function(step) {
      this.render();
    },

    showLinkForm: function() {
      var self = this;

      this.ui.sourceSelect.addClass('animated fadeOutUp');
      setTimeout(function() {
        self.ui.linkForm.show().addClass('animated fadeInUp');
      },275);

    }

  });

  return WorkspaceView;

});
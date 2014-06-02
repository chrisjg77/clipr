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
    className: 'workspace animated slideInUp',

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

      app.rangeSlider.init();

    },

    templateHelpers: function () {
       return {
          conf: conf,
          step: this.step,
        }
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

define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  var MainView = Marionette.ItemView.extend({
    template: require('hbs!main'),
    templateHelpers: {'conf':conf},

    ui: {
      sourceSelect: '.source-select',
      inputUrl: '.input-url input',
      link: '.source-link',
      linkForm: '.form-link',
      upload: '.source-upload',
      uploadForm: '.form-upload'
    },

    events: {
      'click @ui.link': 'showLinkForm',
      'focus @ui.inputUrl': 'goToNext'
    },

    initialize: function (options) {
      this.step = 1;
    },

    templateHelpers: function () {
       return _.extend({},
        {
          step: this.step,
        }
      );
     },

    goToNext: function() {
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

  return MainView;

});

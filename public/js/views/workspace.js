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
      section: 'section',
      next: '.btn-next',
      filter: '.filter-option'
    },

    events: {
      'click @ui.link': 'showLinkForm',
      'click @ui.next': 'goToNext',
      'click @ui.filter': 'filterSelect'
    },

    initialize: function (options) {
      // @todo: change this to back to 1
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

    filterSelect: function(e) {
      var $el = $(e.currentTarget);
      var filter = $el.data('filter');
      // localStorage.setItem('filter',filter);
      app.trigger('change:filter',filter);
    },

    goToNext: function(e) {
      this.renderStep(this.step++);
    },

    renderStep: function(step) {
      var self = this;
      var step = this.step;

      app.trigger('change:step',step);

      this.ui.section.addClass('animated fadeOutDown');
      setTimeout(function() {
        self.render();
      },500);
    }

  });

  return WorkspaceView;

});

define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , ToolbarView = require('views/toolbar')
    , PreviewView = require('views/preview')
    , WorkspaceView = require('views/workspace')
    , conf = require('conf')
    , _ = require('underscore')
    ;

  var LayoutView = Marionette.Layout.extend({
    template: require('hbs!layout'),
    className: 'wrapper-edit',
    templateHelpers: {'conf':conf},

    regions: {
      toolbar: "#toolbar",
      preview: "#preview",
      workspace: "#workspace"
    },

    onDomRefresh: function() {
      this.toolbar.show(new ToolbarView());
      this.preview.show(new PreviewView());
      this.workspace.show(new WorkspaceView());
    }

  });

  return LayoutView;

});

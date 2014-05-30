define(function (require) {
  var app = require('app')
    , Marionette = require('marionette')
    , ToolbarView = require('views/toolbar')
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
      workspace: "#workspace"
    },

    onRender: function() {
      this.toolbar.show(new ToolbarView());
      this.workspace.show(new WorkspaceView());
    }

  });

  // var layout = new LayoutView;
  // layout.workspace.show(new WorkspaceView());

  return LayoutView;

});

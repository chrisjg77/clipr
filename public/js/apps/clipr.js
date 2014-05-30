define(function (require) {
  var app = require('app')
    , LayoutView = require('views/layout')
    ;

  // Libs.
  // require('transit');

  // App-level plugins.
  require('plugins/handlebars');

  // Add app-level regions.
  app.addRegions({
    layout: '#app-main'
  });

  // Instantiate an empty signer model to act upon.
  // var signer = new Signer();

  // Show views in regions.
  app.layout.show(new LayoutView());

  // Return modified app.
  return app;
});

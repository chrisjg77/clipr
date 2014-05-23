define(function (require) {
  var app = require('app')
    , MainView = require('views/main')
    ;

  // Libs.
  // require('transit');

  // App-level plugins.
  require('plugins/handlebars');

  // Add app-level regions.
  app.addRegions({
    main: '#app-main'
  });

  // Instantiate an empty signer model to act upon.
  // var signer = new Signer();

  // Show views in regions.
  app.main.show(new MainView());

  // Return modified app.
  return app;
});

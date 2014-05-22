define(function (require) {
  var app = require('app')
    , $scene = $('.csstransforms body')
    , $form = $('#app-form')
    ;

  // Vendor plugins.
  require('parallax');

  // Namespace.
  app.parallax = {};

  // Instantiate parallax.
  $scene.parallax();

  app.parallax.disable = function() {
    $scene.parallax('disable');
    $form.removeAttr('style');
  };

  app.parallax.enable = function() {
    $scene.parallax('enable');
  };

});
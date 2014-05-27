define(function (require) {
  var app = require('app')
    ;

  // Vendor plugins.
  require('jquery-ui');

  // Namespace.
  app.rangeSlider = {};

  app.rangeSlider.init = function() {
    $('.slider-handle').draggable({
      axis: 'x',
      containment: ".slider",
      stop: function() {
        var pos = $(this).position().left;
        alert('stopped dragging at ' + pos + 'px');
      }
    });
  };

});

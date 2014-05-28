define(function (require) {
  var app = require('app')
    , $video = $('.video')[0]
    ;

  // Vendor plugins.
  require('jquery-ui');

  // Namespace.
  app.rangeSlider = {};

  app.rangeSlider.init = function() {

    $('.video')[0].autoplay = true;
    $('.video')[0].muted = true;

    var start_time = 0;

    var looper = setInterval(function() {
      $('.video')[0].currentTime = start_time;
      $('.video')[0].play();
    },10000);

    $('.slider-handle').draggable({
      axis: 'x',
      containment: ".slider",
      drag: function() {
        var slider_w = $('.slider').width(),
            vid_time = $('.video')[0].duration,
            px_to_min = vid_time/slider_w,
            pos = $(this).position().left,
            end_time = start_time+10;

        $('.video')[0].currentTime = start_time;
        $('.video')[0].pause();
      },
      stop: function() {
        var slider_w = $('.slider').width(),
            vid_time = $('.video')[0].duration,
            px_to_min = vid_time/slider_w,
            pos = $(this).position().left,
            end_time = start_time+10;

        start_time = pos*px_to_min;

        $('.video')[0].currentTime = start_time;
        $('.video')[0].play();

        // console.log(vid_time);
        // console.log('Stopped dragging at '+pos+'px or '+timify(start_time)+'. Will stop at '+timify(end_time));
      }
    });
  };

  function timify(time) {
    var minutes = Math.floor(time / 60),
        seconds = (Math.round(time - minutes*60)).toString();

    if (seconds.length <= 1) {
      console.log(seconds);
      seconds = '0'+seconds;
    }

    return minutes+':'+seconds;
  };


});

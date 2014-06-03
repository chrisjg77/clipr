define(function (require) {
  var app = require('app')
    ;

  // Vendor plugins.
  require('jquery-ui');

  // Namespace.
  app.rangeSlider = {};

  app.rangeSlider.init = function() {

    console.log('preview initialized');

    $preview_video = $('.preview-video')[0],
    $start_frame = $('.loop-frame-start')[0],
    $end_frame = $('.loop-frame-end')[0];

    var interval = ""
      , preview_duration = ""
      , slider_w = $('.slider').width()
      , user_duration = 10
      , preview_start_time = ""
      , preview_end_time = ""
      ;

    // $('.preview-video').each(function(i) {

    //   $('.preview-video')[i].addEventListener("loadedmetadata", function() {
    //     preview(0);
    //     preview_duration = $preview_video.duration;
    //   });

    // });

    $preview_video.addEventListener("loadedmetadata", function() {
      preview($preview_video,0);
      preview_duration = $preview_video.duration;
    });


    // @todo: check if these elements exist to prevent error

    if ($start_frame && $end_frame) {
      $start_frame.addEventListener("loadedmetadata", function() {
        this.currentTime = 1;
      });

      $end_frame.addEventListener("loadedmetadata", function() {
        this.currentTime = user_duration;
      });
    }

    if ($('.filter-select')) {
      $('.filter-option video').each(function(i) {
        $('.filter-option video')[i].addEventListener("loadedmetadata", function() {
          // @todo: make this dynamic

          preview($('.filter-option video')[i],preview_start_time);

        });
      });
    }

    $('.slider-handle').draggable({
      axis: 'x',
      containment: '.slider',
      drag: function() {

        var pos = $(this).position().left
          , frame_start_time = pos*pxToMin(slider_w,preview_duration)
          , frame_end_time = frame_start_time + user_duration
          ;

        updatePreviewFrames(frame_start_time,frame_end_time);

      },
      stop: function() {
        var pos = $(this).position().left;

        preview_start_time = pos*pxToMin(slider_w,preview_duration);
        preview_end_time = preview_start_time + user_duration;

        preview($preview_video,preview_start_time);
      }
    });

    function pxToMin(width, duration) {
      var vid_duration = duration
        , px_to_min = vid_duration/width
        ;
      return px_to_min;
    }

    function preview($elem,start) {
      var start_time = start;

      clearInterval(interval);

      $elem.currentTime = start_time;
      $elem.play();

      interval = setInterval(function() {
        $elem.currentTime = start_time;
        $elem.play();
      },10000);

    };

    function updatePreviewFrames(start,end) {
      $start_frame.currentTime = start;
      $end_frame.currentTime = end;

      $('.loop-frame-time.time-start').text(timify(start));
      $('.loop-frame-time.time-end').text(timify(end));
    }

    function timify(time) {
      var minutes = Math.floor(time / 60),
          seconds = (Math.round(time - minutes*60)).toString();

      if (seconds.length <= 1) {
        seconds = '0'+seconds;
      }

      return minutes+':'+seconds;
    };


  };
});

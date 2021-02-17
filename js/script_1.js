!(function($, window, document, undefined) {

  "use strict";

    $(document).ready(function(){
        $('body').css('position','relative'); //endure body has this because its needed to stick other container
        if($('.sticky_bar_container').length===0){

            let sticky_bar_container = $('<div></div>');
            $(sticky_bar_container).addClass('sticky_bar_container');
            $(sticky_bar_container).css('position','sticky');
            $(sticky_bar_container).css('top','0');
            $(sticky_bar_container).css('z-index','1000');

            $('body').prepend($(sticky_bar_container));

        }
        $('body').find('.sticky_bar_container').prepend($('.sticky_bar_6')); //move to body to stick container on it
    });

  var sticky_bar7 = true;
  var sticky_bar6 = true;

  function countdown(element, minutes, seconds) {
    if (sticky_bar7 === true) {
      var time = minutes*60 + seconds;
      var interval = setInterval(function() {
          var el = document.querySelector(element);
          if (time <= 0) {
              el.innerHTML = "00:00";
              setTimeout(function() {
                  countdown('clock', 0, 5);
              }, 2000);
              clearInterval(interval);
              return;
          }
          var minutes = Math.floor( time / 60 );
          if (minutes < 10) minutes = "0" + minutes;
          var seconds = time % 60;
          if (seconds < 10) seconds = "0" + seconds;
          var text = minutes + ':' + seconds;
          el.innerHTML = text;
          time--;
      }, 1000);
    }

  }

  window.addEventListener("scroll", function() {
    if (sticky_bar6 === true) {
      if (window.scrollTop() > $('.sticky_bar6-on').offset().top) {
        sticky_bar6 = false;

        $('.b5').hide();
        $('.b6').fadeIn('slow');
        countdown('.b6_counter', 3, 0);

        setTimeout(function() {
          $('.b6').fadeOut('slow');
          $('.b7').fadeIn('slow');
          sticky_bar7 = false;
          $('.cta_fly').click(function() {
            $('html, body').animate({
              scrollTop: $(".container__form").offset().top
            }, 1000);
            $('.b7').fadeOut('slow');
          });
        }, 180000);

      }
    }
  });

})(jQuery, window, document);

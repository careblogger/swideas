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
    $('body').find('.sticky_bar_container').prepend($('.sticky_bar')); //move to body to stick container on it
  });

  var sticky_bar3 = true;

  window.addEventListener("scroll", function() {
    if (sticky_bar3 === true) {

      if (window.scrollY() > $('.sticky_bar3-on').offset().top) {
        sticky_bar3 = false;

        $('.sticky_bar .fly-box').hide();
        $('.b3').fadeIn('slow');

        setTimeout(function() {
          $('.b3').fadeOut('slow');
        }, 5000);
      }

    }
  });

})(jQuery, window, document);


$(document).on('ready', function () {
  $(".x-testimonial-slider_mobile-medical-sp").each(function () {
    $(this).find('.slides').slick({
        dots: false,
        appendArrows: '.slide-buttons',
        nextArrow: '<a class="slide-next"><i>',
        prevArrow: '<a class="slide-back"><i>'
    });
  });
})

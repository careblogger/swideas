;
(function($, window, document, undefined) {

  "use strict";

  var pluginName = "scrollBox";

  function ScrollBox(element, options) {
    this.element = element;
    this.container = null;

    this._name = pluginName;
    this.init();
  }

  $.extend(ScrollBox.prototype, {
    init: function() {
			var elem = this.element;
      this.container = $(this.element);
      this.container.click(this.scroll);
    },
    scroll: function(elem) {
      $('html, body').animate({
        scrollTop: $(".scroll_box").offset().top + $(".scroll_box").height()
      }, 1000);
    }
  });

  $.fn.scrollBox = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" +
          pluginName, new ScrollBox(this, options));
      }
    });
  };

})(jQuery, window, document);

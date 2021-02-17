// (function($, window, document, undefined) {

//     "use strict";

//     let pluginName = "footer_text";

//     function Footer_text(element, options) {
//         this.element = element;
//         this._name = pluginName;
//         this.init();
//     }

//     $.extend(Footer_text.prototype, {
//         init: function() {
//             this.buildCache();
//             this.bindEvents();
//         },

//         // Remove plugin instance completely
//         destroy: function() {
//             this.unbindEvents();
//             this.$element.removeData();
//         },

//         // Cache DOM nodes for performance
//         buildCache: function() {
//             this.$element = $(this.element);
//         },

//         // Bind events that trigg
//         bindEvents: function() {
//             let plugin = this;

//             plugin.footerText.call(plugin);
//         },

//         footerText: function() {

//             setTimeout(() => {
//                 console.log($('.footer_text'));
//             }, 1000);

//         },
//     });

//     $.fn.footer_text = function(options) {
//         return this.each(function() {
//             if (!$.data(this, "plugin_" + pluginName)) {
//                 $.data(this, "plugin_" +
//                     pluginName, new Footer_text(this, options));
//             }
//         });
//     };

// })(jQuery, window, document)



$(document).ready(function() {
    $('.footer_text').hide();
    $($('.footer_text')[0]).show();
});
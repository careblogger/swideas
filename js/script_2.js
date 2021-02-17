(function($, window, document, undefined) {
    "use strict";
    var pluginName = 'guarantee';

    function Guarantee(element, options) {
        this.element = element;
        this._name = pluginName;

        this.init();
    }

    $.extend(Guarantee.prototype, {

        // Initialization logic
        init: function() {

            this.buildCache();
            this.bindEvents();
        },

        // Remove plugin instance completely
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
        },

        // Cache DOM nodes for performance
        buildCache: function() {
            this.$element = $(this.element);

        },

        // Bind events that trigger methods
        bindEvents: function() {
            var plugin = this;
            let $img = this.$element.find(".offer-img")

            $img.one("load", function() {
                plugin.setGuaranteePosition.call(plugin)
              }).each(function() {
                if(this.complete) {
                    $(this).load(plugin.setGuaranteePosition.call(plugin));
                }
              });
        },

        // Unbind events that trigger methods
        unbindEvents: function() {
            this.$element.off('.' + this._name);
        },

        // Create custom methods
        setGuaranteePosition: function() {
            const $img = this.$element.find(".offer-img");
            const $gwa = this.$element.find(".offer-g");

            if ($img.height() > $img.width()) {
                $gwa.css({"width": `${$img.height() * 0.200}px`, "height": `${$img.height() * 0.200}px`,"top": `${$img.height() * 0.02}px`,"left": `${$img.width() * 0.65}px`});
            } else {
                $gwa.css({"width": `${$img.height() * 0.3}px`, "height": `${$img.height() * 0.3}px`,"top": `${$img.height() * 0.02}px`,"right": `${$img.width() * 0.029}px`});
            }
        },

    });

    $.fn.guarantee = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Guarantee(this, options));
            }
        });
        return this;
    };


})(jQuery, window, document);

;
(function($, window, document, undefined) {
    "use strict";
    var pluginName = 'productCounter';
    var borderPosition=0;
    function ProductCounter(element, options) {
        this.element = element;
        this._name = pluginName;

        this.init();

    }

    $.extend(ProductCounter.prototype, {
        init: function() {
            this.buildCache();
            this.bindEvents();
        },
        destroy: function() {
            this.unbindEvents();
            this.$element.removeData();
            this.$borderPosition.removeData();
        },
        buildCache: function() {
            this.$element = $(this.element);
            this.$borderPosition = $(this.$borderPosition);
            this.$borderCross = $(this.borderCross);
            this.$startValue=21;

        },
        bindEvents: function() {
            var plugin=this;
            this.$borderPosition=this.$element.offset();
            var scrollHandler = function() {
                plugin.checkScrollPosition.call(plugin);
            }
            $(window).on("scroll",scrollHandler);
        },
        checkScrollPosition: function() {
            var plugin=this;
            if(this.$borderPosition.top < $(window).scrollTop()+$(window).height())
            {
                this.$borderCross = true;
                $(window).off("scroll", this.scrollHandler);
                plugin.startUpdating.call(plugin);
            }
        },
        startUpdating: function() {
            var myCounter = 0;
            var plugin=this;
            setInterval(function(){
                var randomTimeOffset = Math.floor((Math.random() * 30) + 1);
                var buyInterval = 60;
                myCounter++;
                if (myCounter > (buyInterval + randomTimeOffset)) {

                    myCounter = 0;
                    plugin.updateCounter.call(plugin);
                }
            },1000);
        },
        unbindEvents: function() {
            this.$element.off('.' + this._name);
        },
        showCounter: function() {

        },
        updateCounter: function () {
            var decimal = this.$element.find(".decimal");
            var endValue = 7;
            var unity = this.$element.find(".units");
            if (this.$startValue > endValue) {
                this.$startValue--;
                var decimalOut;
                var unityOut;

                if (this.$startValue > 9) {
                    decimalOut = Math.floor(this.$startValue / 10);
                    unityOut = this.$startValue % 10;
                    decimal.text(decimalOut);
                    unity.text(unityOut);

                } else if (this.$startValue >= endValue) {
                    decimal.text(0);
                    unity.text(this.$startValue);

                }
            }
        }
    });
    $.fn.productCounter = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new ProductCounter(this, options));
            }
        });
        return this;
    };
})(jQuery, window, document);

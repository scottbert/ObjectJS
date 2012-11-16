/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
ObjectJS.reqNameSpace('ObjectJS.extras.mixins');
(function (mixins, $) {
	"use strict";
	if (!$) {
		return true;
	}
	var jQueryMixin = function (object) {
		var OBJMIXINS,
			UIMIXINS,
			i,
			that;
		OBJMIXINS = {
			superOpen: function (callback) {
				that = that || this;
				that.domNode.show().css({opacity: 0}).animate({opacity: 1}, function () {
					return (callback) ? callback() : null;
				});
			},
			superClose: function (callback) {
				that = that || this;
				that.domNode.animate({opacity: 0}, function () {
					that.domNode.hide();
					return (callback) ? callback() : null;
				});
			},
			on: function () {
				that = that || this;
				that.domNode.show();
			},
			off: function () {
				that = that || this;
				that.domNode.hide();
			}
		};
		UIMIXINS = {
		};
		for (i in OBJMIXINS) {
			if (OBJMIXINS.hasOwnProperty(i)) {
				object[i] = OBJMIXINS[i];
			}
		}
		for (i in UIMIXINS) {
			if (UIMIXINS.hasOwnProperty(i)) {
				object[i] = UIMIXINS[i];
			}
		}
	};
	mixins.jQuery = jQueryMixin;
}(ObjectJS.extras.mixins, window.jQuery || window.Zepto));
if (ObjectJS.extras.mixins.jQuery) {
	ObjectJS.mixins.UI = ObjectJS.extras.mixins.jQuery;
}
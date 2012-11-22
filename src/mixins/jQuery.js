/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, ActiveXObject:false*/
/**
 * @author scottvanlooy
 */
(function (mixins, $) {
	"use strict";
	var
		OBJMIXINS,
		UIMIXINS,
		that,
		dataObj = {},
		eventBind,
		eventPrefix,
		getAttr = function (str, attr) {
			return (str.split(new RegExp('\\b' + attr + '='))[1] || '').split('&')[0];
		},
		$UI = function (object) {
			var i;
			for (i in OBJMIXINS) {
				if (OBJMIXINS.hasOwnProperty(i)) {
					object[i] = OBJMIXINS[i];
				}
			}
		},
		$Controller = function (Controller) {
			Controller.createXHR = Controller.createJSONP = function (jsonp) {
				if (jsonp) {
					return {
						open : function (options) {
							options.dataType = 'jsonp';
							if (typeof jsonp === "string") {
								if (typeof window[jsonp] !== "function") {
									window[jsonp] = function (obj) {
										options.success(obj);
										delete window[jsonp];
									};
								}
							}
							$.ajax(options);
						}
					};
				}
				return {
					open: function (options) {
						$.ajax(options);
					}
				};
			};
		};
	OBJMIXINS = {
		superOpen: function (callback) {
			that = that || this;
			that.domNode.show();
			return (callback) ? callback() : null;
		},
		superClose: function (callback) {
			that = that || this;
			that.domNode.hide();
			return (callback) ? callback() : null;
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
	mixins.UI = mixins.UI = $UI;
	mixins.Selector = mixins.Selector = $;
	mixins.Controller = mixins.Controller = $Controller;
	mixins.jQuery = true;
}(ObjectJS.reqNameSpace('ObjectJS.mixins'), window.jQuery || window.Zepto));
/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, jQuery:false, window:false*/

/**
 * @author Scott van Looy
 */
FF.reqNameSpace('FF.core.uis');
(function (uis) {
	"use strict";
	/** PRIVATE METHODS **/
	var BaseUI = FF.augmentObject({}),
		f = function (fn) {
			return (typeof fn === "function");
		};

	/** API METHODS **/
	BaseUI.setRootDomNode = function (domNode) {
		BaseUI.root = (domNode.jquery || domNode.zepto) ? domNode : $(domNode);
	};
	/**
	 * setupUI - sets up a UI, caches its domnode and prepares it for use.
	 * @param {string|object} id - the dom ID, className or jQuery object of the root element for the UI.
	 */
	BaseUI.setupUI = function (id) {
		if (!FF.mixins.UI) {
			FF.requires(['core.mixins.Native']);
		}
		FF.mixins.UI(this);
		if (!window.jQuery || !window.Zepto) {
			this.domNode = FF.mixins.Selector(id);
		} else {
			if (id.jquery || id.zepto) {
				this.domNode = id;
			} else {
				this.domNode = BaseUI.root.find(id).eq(0);
			}
		}
		this.contentNode = this.domNode.find('.content');
		this.headerNode = this.domNode.find('.title');
		this.templateNode = this.domNode.find('.template').remove();
		this.footerNode = this.domNode.find('.footer');
	};
	BaseUI.setView = function (view) {
		this.view = view;
	};
	BaseUI.getView = function () {
		return this.view;
	};
	BaseUI.open = function (obj) {
		setTimeout(function () {
			obj.domNode.addClass('open');
		}, 100);
	};
	BaseUI.close = function (cb) {
		this.domNode.removeClass('open');
		if (cb && f(cb)) {
			cb();
		}
	};
	BaseUI.getContentNode = function () {
		return this.contentNode;
	};
	BaseUI.addMethods = function (options) {
		var method,
			args;
		for (method in options) {
			if (options.hasOwnProperty(method) && typeof method === "function") {
				if (!this[method]) {
					this[method] = options[method];
				} else {
					options['super' + method] = this[method];
					this[method] = function () {
						if (arguments.length === 1) {
							args = arguments[0];
						} else {
							args = arguments;
						}
						options[method](args);
						options['super' + method](args);
					};
				}
			}
		}
	};
	/**
	 * createUI - takes an object and extends it with the BaseUI
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	BaseUI.createUI = BaseUI.extend.curry(undefined, BaseUI);
	uis.BaseUI = BaseUI;
}(FF.core.uis));


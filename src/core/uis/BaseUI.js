/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, jQuery:false, window:false*/

/**
 * @author Scott van Looy
 */
(function (uis) {
	"use strict";
	/** PRIVATE METHODS **/
	var BaseUI = ObjectJS.augmentObject({}),
		f = function (fn) {
			return (typeof fn === "function");
		};

	/** API METHODS **/
	/**
	 * Sets the root dom node that the library uses to find other dom nodes when generating UI components. Defaults to body.
	 * @param {String|Object} domNode the selector for the domNode
	 */
	BaseUI.setRootDomNode = function (domNode) {
		BaseUI.root = ObjectJS.mixins.Selector(domNode);
	};
	/**
	 * Sets up a UI, caches its domnode and prepares it for use.
	 * @param {String|Object} id - the dom ID, className or jQuery object of the root element for the UI.
	 */
	BaseUI.setupUI = function (id) {
		if (!ObjectJS.mixins.UI) {
			ObjectJS.requires(['core.mixins.Native']);
		}
		ObjectJS.mixins.UI(this);
		this.domNode = (BaseUI.root) ? BaseUI.root.find(id) : ObjectJS.mixins.Selector(id);
		this.contentNode = this.domNode.find('.content');
		this.headerNode = this.domNode.find('.title');
		this.templateNode = this.domNode.find('.template').remove();
		this.footerNode = this.domNode.find('.footer');
	};
	/**
	 * Sets the active view on a UI object
	 * @param {Object} view a reference to the view we wish to set on the UI object.
	 */
	BaseUI.setView = function (view) {
		this.view = view;
	};
	/**
	 * Gets a reference to the currently set view on a UI object
	 * @return {Object} a reference to the currently set view
	 */
	BaseUI.getView = function () {
		return this.view;
	};
	/**
	 * 
	 * Opens a UI object. Adds a class of "open" to the UI's domNode. Either animate using CSS3 or override this to create a Javascript animation.
	 * @param  {Object} obj A reference to the UI object
	 * @return {Object}     a reference to the UI object (for chaining).
	 */
	BaseUI.open = function (obj) {
		obj = obj || this;
		setTimeout(function () {
			obj.domNode.addClass('open');
			obj.isOpen = true;
		}, 100);
		return obj;
	};
	/**
	 * Closes a UI object. Removes the class "open" from the UI's domNode. Either animate using CSS3 or override this to create a Javascript animation.
	 * @param  {Function} [cb] Callback to run when the close is complete.
	 * @return {Object}     a reference to the UI object (for chaining).
	 */
	BaseUI.close = function (cb) {
		this.domNode.removeClass('open');
		this.isOpen = false;
		if (cb && f(cb)) {
			cb();
		}
		return this;
	};
	/**
	 * Returns the contentNode for a UI.
	 * @return {Object} a .content node or the domNode of the UI in question.
	 */
	BaseUI.getContentNode = function () {
		return this.contentNode;
	};
	/**
	 * Add methods to the UI object you're creating. Automatically create super methods when the object you're passing in contains the same methods as its parent.
	 * @param {Object} options Object containing the methods you wish to add to the host object.
	 */
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
	 * Takes an object and extends it with the BaseUI
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	BaseUI.createUI = BaseUI.extend.curry(undefined, BaseUI);
	uis.BaseUI = BaseUI;
}(ObjectJS.reqNameSpace('ObjectJS.core.uis'), window.jQuery || window.Zepto));


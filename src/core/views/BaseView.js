/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author Scott van Looy
 */
(function (views) {
	"use strict";
	/** PRIVATE METHODS **/
	var BaseView = ObjectJS.augmentObject({}),
		defaults = [],
		loadComponents = function (namespace, uisArray, view, addToDefaults) {
			var arr = ObjectJS.core.utils.ArrayUtils.combine(defaults, uisArray),
				l = arr.length,
				ret = {};
			view = view || {};
			while (l--) {
				if (arr[l] && namespace[arr[l]]) {
					if (typeof namespace[arr[l]] === 'function') {
						namespace[arr[l]] = new namespace[arr[l]](view);
					} else {
						namespace[arr[l]].setView(view);
					}
					if (addToDefaults) {
						defaults.push(arr[l]);
					}
					ret[arr[l]] = namespace[arr[l]];
				}
			}
			return ret;
		};
	/** API METHODS **/
	/**
	 * Sets default UIs. These UIs appear on every page. Should only be
	 * called once in your project as it replaces everything each time.
	 * generally you would call this from your app view.
	 * @param {Object} ns - the namespace your UIs can be found under.
	 * @param {String} arr - An array of UI names.
	 */
	BaseView.setDefaultComponents = function (namespace, arr) {
		defaults = [];
		return loadComponents(namespace, arr, null, true);
	};
	/**
	 * returns the array of default components.
	 * @return {Array} [description]
	 */
	BaseView.getDefaultComponents = function () {
		return defaults;
	};
	/**
	 * All views require a set of components that exist within that view. Every
	 * view should have an enter method that calls requires and adds the following.
	 * @param  {Object} namespace your namespace
	 * @param  {String[]} arr       an array of strings containing UI component names
	 * @param  {Object}				a reference to the view object
	 * @return {String[]}           array of objects
	 */
	BaseView.requires = function (namespace, arr, view) {
		var uiMap = ObjectJS.core.utils.ArrayUtils.combine(arr, defaults);
		view.uis = loadComponents(namespace, uiMap, view);
		return view.uis;
	};
	BaseView.routes = function () {
		//write code
	};
	BaseView.captureRoutes = function () {
		//write code
	};
	BaseView.captureForms = function () {
		//write code
	};
	/**
	 * Takes an object and extends it with the BaseView
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	BaseView.createView = BaseView.extend.curry(undefined, BaseView);
	/**
	 * This is where you can find an object representing your UIs once you've called requires
	 * @type {Object}
	 */
	BaseView.uis = null;
	/**
	 * This is a reference to the controller that instantiated the view
	 * @type {Object}
	 */
	BaseView.controller = null;

	views.BaseView = BaseView;
}(ObjectJS.reqNameSpace('ObjectJS.core.views')));
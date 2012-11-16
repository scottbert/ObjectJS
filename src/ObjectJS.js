/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, vars: true, evil:true, regexp:true */
/*globals ObjectJS:true,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, window:false*/
/**
 * @author scottvanlooy
 * @name { ObjectJS:[name]}
 */
var ObjectJS = {};
(function (Oj) {
	"use strict";
	/**
	 * Load a script asynchronously.
	 * @param  {string}   src  href of the script to load.
	 * @param  {Function} cb   callback to fire upon loading.
	 * @param  {Number}   load Scripts remaining to load.
	 * @param  {Number}   len  Total scripts to load
	 * @param  {Number}   num  Script index
	 * @param  {Function}   err  Something to do on error.
	 */
	var loadScript = function (src, cb, load, len, num, err) {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = src;
			s.async = false;
			s.onload = s.onreadystatechange =  function () {
				var state = s.state;
				if ((!state || /loaded|complete/.test(state))) {
					load--;
					if (!load && len === num) {
						if (cb && typeof cb === "function" && !cb.called) {
							cb.call(this);
							cb.called = true;
						}
					}
				}
			};
			s.onerror = function () {
				if (err && typeof err === "function" && !err.called) {
					err.call(this);
					err.called = true;
				}
			};
			document.getElementsByTagName('head')[0].appendChild(s);
		},
		/**
		 * initialise the object
		 * @private
		 */
		init = function () {
			Function.prototype.curry = Function.prototype.partial || function () {
				var fn = this, args = Array.prototype.slice.call(arguments);
				return function () {
					var myArgs = Array.prototype.slice.call(arguments),
						combined = [];
					var arg = 0,
						i,
						n = 0,
						ii,
						l = args.length,
						ll = myArgs.length;
					for (i = 0; i < l; i++) {
						if (args[i] === undefined) {
							for (ii = 0; ii < ll; ii++) {
								n++;
								combined.push(myArgs[ii]);
							}
						} else {
							combined.push(args[i]);
						}
					}
					return fn.apply(this, combined);
				};
			};
			Oj.mixins = Oj.mixins || {};
			Oj.core = Oj.core || {};
			Oj.extras = Oj.extras || {};
			Oj.NOOP = function () {};
			Oj.Console = Oj.Console || Oj.NOOP;
			Oj.requires('config');
		},
		currentView;
	/**
	 * Requests a namespace. If the namespace does not exist, it will
	 * be created
	 * @param {String} req - request in the format of 'my.name.space'
	 * @param {Object} test - test for a mamespace.
	 * @return {Object|false} The namespace or false if test is true and the namespace doesn't exist
	 */
	Oj.reqNameSpace = function (req, test) {
		var t,
			x,
			tns,
			l;
		if (!req || typeof req !== "string") {
			Oj.Console.error('getNameSpace error - requires a string in the format "my.name.space"');
			return null;
		}
		if (!req.match('\\.')) {
			t = [req];
		} else {
			t = req.split('.');
		}
		tns = window;
		l = t.length;
		for (x = 0; x < l; x++) {
			if (tns[t[x]]) {
				tns = tns[t[x]];
			} else {
				if (test) {
					return false;
				}
				tns = tns[t[x]] = {};
			}
		}
		return tns;
	};
	/**
	 * requires method. Using the location of object.min?.js as the base, can
	 * load other modules. Checks to see if they exist and if they don't, we grab
	 * the module.
	 * @param {Array} requires - array of strings representing a component's path.
	 * 'myapp/main/Hello.js' would be written as 'myapp.main.Hello' and Hello.js
	 * would contains an object at the same namespace
	 * (myapp.main.Hello = (function(){}()))
	 * @param {Function} [callback]. Optional callback to run when loading is complete.
	 */
	Oj.requires =  function (requires, callback) {
		var l = requires.length,
			src,
			load = 0,
			n,
			docallback = false,
			namespaceTest;
		namespaceTest = function (namespace, test) {
			var ret = namespace,
				strArr = test.split('.'),
				l = strArr.length,
				p;
			// Find starting point. Either our own namespace or the window. If neither, return false.
			if (!ret[strArr[0]] && !window[strArr[0]]) {
				return undefined;
			}
			// If starting point is the window, set window to the return value.
			if (!ret[strArr[0]] && window[strArr[0]]) {
				ret = window;
			}
			for (p = 0; p < l; p++) {
				if (ret !== undefined) {
					ret = ret[strArr[p]];
				}
			}
			return ret;
		};
		if (typeof requires === "string") {
			requires = [requires];
			l = requires.length;
		}
		for (n = 0; n < l; n++) {
			docallback = false;
			src = null;
			if (namespaceTest(Oj, requires[n]) === undefined) {
				src = this.baseUrl + requires[n].replace(/\./gi, '/') + '.js';
				if (Oj.finished) {
					loadScript(src, callback, load, requires.length, n);
				} else {
					docallback = true;
					document.write('<script type="text/javascript" src="' + src + '"><\/script>');
				}
			} else {
				// We already have this item. Run callback.
				docallback = true;
			}
		}
		if (docallback) {
			if (callback) {
				callback();
			}
		}
	};
	/**
	 * The base URL for library scripts - determined by the location of
	 * object.min?.js
	 * @return {string}
	 */
	Oj.baseUrl = (function () {
		var s = document.getElementsByTagName('script');
		var m = s[s.length - 1];
		return m.src.replace(/[^\/]+?$/, '');
	}());
	/**
	 * Augment the object, adding a few shared methods to it.
	 * @param  {Object} object the object to be augmented
	 * @return {Object} the augmented object.
	 */
	Oj.augmentObject = function (object) {
		if (typeof object === "undefined") {
			Oj.err('tried to augment', object);
			return null;
		}
		if (!object.augmented) {
			/**
			 * extend an object with another object.
			 *
			 * @param  {Function} item       child function
			 * @param  {Function|Object} Inheritant parent function/object
			 *
			 * @return {Object}            Returns the object with its augmentation
			 */
			object.extend = object.extend || function (Child, Parent) {
				if (typeof Child === "undefined" || typeof Parent === "undefined") {
					Oj.err('Tried to extend', Child, 'with', Parent);
					return null;
				}
				if (typeof Parent === "function") {
					Child.prototype = new Parent();
					Child.constructor = Child;
				} else {
					Child.prototype = Parent;
					Child.constructor = Child;
				}
			};
			object.err = Oj.err;
			object.augmented = true;
		}
		return object;
	};
	/**
	 * Initialise an object
	 * @param  {String}   obj the name of the object to initialise
	 * @param  {Object}   ns  the namespace it lives in
	 * @param  {String} [fn]  A function to run on the newly initialised object.
	 * @return {Object}       The new object
	 */
	Oj.initObj = function (obj, ns, fn) {
		if (!ns || !ns[obj]) {
			Oj.err('Attempted to init object', obj, 'in namespace', ns, 'failed.');
			return null;
		}
		if (typeof ns[obj] === 'function') {
			ns[obj] = new ns[obj]();
		}
		if (ns[obj][fn]) {
			ns[obj][fn]();
		}
		return ns[obj];
	};
	/**
	 * Returns a reference to the current active view.
	 * @return {Object} a reference to the current active view.
	 */
	Oj.getView = function () {
		return currentView;
	};
	/**
	 * Calls a view. Used at the bottom of an HTML page to call the associated JS view with that page.
	 * @param  {String} view The view name
	 */
	Oj.view = function (view) {
		Oj.initObj(view, Oj.views, 'enter');
		currentView = Oj.views[view];
	};
	/**
	 * If the string "debug" appears in the URL, we write to the console if there is one whatever we feed into this function.
	 */
	Oj.err = function () {
		if (window.console && window.location.href === 'debug') {
			window.console.error(arguments);
		}
		return true;
	};
	/**
	 * If the string "debug" appears in the URL, we write to the console if there is one whatever we feed into this function.
	 */
	Oj.log = function () {
		if (window.console && window.location.href.indexOf('debug') !== -1) {
			window.console.log(arguments);
		}
		return true;
	};
	/**
	 * If the string "debug" appears in the URL, we write to the console if there is one whatever we feed into this function.
	 */
	Oj.warn = function () {
		if (window.console && window.location.href.indexOf('debug') !== -1) {
			window.console.log(arguments);
		}
		return true;
	};
	Oj.loadScript = loadScript;
	init();
}(ObjectJS));

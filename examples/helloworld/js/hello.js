/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true*/
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, jQuery:false, window:false*/
/**
 * @author scottvanlooy
 */

/**
 * create namespaces
 */
var HelloNamespace = {};
(function (ns) {
	"use strict";
	/**
	 * Create objects - for such a small page you'd probably not use a
	 * view/controller, but as your pages get more complex, it's a useful paradigm
	**/
	/**
	 * Controls data in and out of the front end.
	 * @constructor
	 */
	ns.Controller = function () {
		var that = this,
			init = function () {
				that.enter(true);
			};
		that.enter = function (runonce) {
			that.callView(ns, 'View');
		};
		init();
	};
	/**
	 * View - controls the UIs in the front end.
	 * @param {Object} controller
	 */
	ns.View = function (controller) {
		var that = this,
			init = function () {
				that.enter(true);
			};
		that.controller = controller;
		that.enter = function (runonce) {
			that.requires(
				ns.uis,
				[
					'HelloWorld'
				],
				that
			);
			/** if (runonce) {
				// Things you only need to run once.
			} **/
			that.uis.HelloWorld.open();
		};
		init();
	};
	ns.uis = {};
	ns.uis.HelloWorld = function (view) {
		var HelloWorld = this,
			init = function () {
				HelloWorld.setupUI('#HelloWorld');
			};
		HelloWorld.view = view;
		HelloWorld.open = function () {
			var options = {
				url : 'http://api.flickr.com/services/feeds/photos_public.gne?format=json',
				error : function () {
					return 'error';
				},
				jsonp : 'jsonFlickrFeed',
				success : function (data) {
					if (window.console) {
						window.console.log('data', data);
					}
				}
			};
			HelloWorld.domNode.find('.tst').bind('click', function (e) {
				e.preventDefault();
				ObjectJS.core.controllers.BaseController.getData(options);
			});
		};
		init();
	};
	ObjectJS.core.uis.BaseUI.createUI(ns.uis.HelloWorld);
	ObjectJS.core.views.BaseView.createView(ns.View);
	ObjectJS.core.controllers.BaseController.createController(ns.Controller);
	ns.Controller = new ns.Controller();
}(HelloNamespace));

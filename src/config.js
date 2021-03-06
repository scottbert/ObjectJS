/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * This is the set of core components that the library requires to run.
 * If using the automatic build tools, these will be included. If not,
 * they will be dynamically loaded one at a time. You can use ObjectJS.requires
 * elsewhere in your codebase to load your own components, you can also use it to
 * lazy load code.
 */
var ObjectJS = ObjectJS || function (node) {
	"use strict";
	return ObjectJS.mixins.Selector(node);
};
ObjectJS.config =
	[
	// utils
		'core.utils.Core',
		'core.utils.ArrayUtils',
	//Controllers
		'core.controllers.BaseController',
	// Views
		'core.views.BaseView',
	//uis
		'core.uis.BaseUI',
	//templates
		'core.templates.Templates',
	//events
		'core.Events',
	//mixins
		'mixins.Native'
	];
ObjectJS.requires(ObjectJS.config,
	function () {
		"use strict";
		ObjectJS.finished = true;
	}
);
/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, window:false */
/**
 * @author scottvanlooy
 */
ObjectJS.reqNameSpace('ObjectJS.extras.utils');
(function (utils) {
	"use strict";
	var Console = (function () {
		var Nlog,
			log,
			warn,
			error;
		Nlog = function (type) {
			if (window.console) {
				return function () {
					window.console[type](arguments);
				};
			}
		};
		log = new Nlog('log');
		warn = new Nlog('warn');
		error = new Nlog('error');
		return {
			log: log,
			warn: warn,
			error: error
		};

	}());
	utils.Console = Console;
}(ObjectJS.extras.utils));
ObjectJS.Console = ObjectJS.extras.utils.Console;
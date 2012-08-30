/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/

/**
 * reqNameSpace - requests a namespace associated with the internal ns namespace
 * @param {string} req - string representing the namespace requested, eg 'ns.util.foo'
 */
ObjectJS.reqNameSpace('ObjectJS.core.utils');
(function (utils) {
	"use strict";
	/** empty function, used as a stub **/
	var empty = function () {};
	utils.Console = empty;
}(ObjectJS.core.utils));
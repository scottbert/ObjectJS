/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * This is the set of extra components that the library doesn't require to run.
 * If they're included, then when using the automatic build tools, these will be
 * included. If not, they will be dynamically loaded one at a time.
 * You can use ObjectJS.requires elsewhere in your codebase to load your own components,
 * you can also use it to lazy load code.
 */
ObjectJS.requires(
	[
	// utils
		'extras.utils.HashMap',
		'extras.utils.Console',
	//Mixins
		'extras.mixins.jQuery'
	]
);
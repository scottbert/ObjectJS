/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true*/
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, ActiveXObject:false*/
/**
 * @author scottvanlooy
 * EXAMPLES OF HOW ROUTING WORK.
 * First required route. Other routes are optional.
 */
ObjectJS.routes = {
	'/' : ObjectJS.controllers.ApplicationController,
	'/profiles/$name': ObjectJS.controllers.Profiles,
	'/gallery/$id': ObjectJS.controllers.Gallery
};
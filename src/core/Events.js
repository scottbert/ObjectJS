/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author scottvanlooy
 */
(function (Oj) {
	"use strict";
	/** PRIVATE METHODS **/
	var Events = {},
		Registry = {
			"GET_DATA" : 'onGetData',
			"GOT_DATA" : 'onGotData'
		},
		E = {};
	/** API METHODS **/
	/**
	 * Subscribe an object to some events. Pass this function a ObjectJS object with methods that
	 * match methods in the registry and they will be added as event listeners to the events system.
	 * @param  {Object} Object	this is the ObjectJS object you wish to listen to specific events.
	 * @return {null}			Does not return anything.
	 */
	Events.subscribe = function (Object) {
		var customEvent;
		for (customEvent in Registry) {
			if (Registry.hasOwnProperty(customEvent)) {
				if (typeof Object[Registry[customEvent]] === "function") {
					if (!E[customEvent]) {
						E[customEvent] = [];
					}
					E[customEvent].push({
						id : Object.id,
						fn : Object[Registry[customEvent]],
						view: Object.getView()
					});
				}
			}
		}
	};
	/**
	 * Allows us to manually remove an object's event listeners, for instance if
	 * we destroy an object.
	 * @param  {Object} Object	the ObjectJS object we want to remove from the events system
	 * listener list.
	 * @return {null}			Does not return anything.
	 */
	Events.unsubscribe = function (Object) {
		var customEvent,
			l;
		for (customEvent in E) {
			if (E.hasOwnProperty(customEvent)) {
				l = E[customEvent].length;
				while (l--) {
					if (E[customEvent][l].id === Object.id) {
						E[customEvent].splice(l, 1);
					}
				}
			}
		}
	};
	/**
	 * This publishes an event.
	 * @param  {string} eventKey	The key for the event we would like to publish
	 * @param  {Object} parameters  Any parameters passed to the event.
	 * @param  {string} [view]        Optionally pass a view's ID to only publish to that view.
	 * @return {Array|Object}		an optional argument or array of arguments.
	 */
	Events.publish = function (eventKey, parameters, view) {
		var functions,
			l,
			x;
		if (Registry[eventKey]) {
			functions = E[eventKey];
			if (functions) {
				l = functions.length;
				for (x = 0; x < l; x++) {
					if (view && view === functions[x].view.id) {
						functions[x].fn(parameters || null);
					} else {
						functions[x].fn(parameters || null);
					}
				}
			}
		}
	};
	/**
	 * Adds events to registry. Takes an event object consisting of one or more events key value pairs, for example:
	 * {
	 *    "EVENT_FOO" : "onFoo"
	 * }
	 * @param {Object} eventKeys An object of strings.
	 */
	Events.add = function (eventKeys) {
		var customEvent;
		for (customEvent in eventKeys) {
			if (eventKeys.hasOwnProperty(customEvent)) {
				Registry[customEvent] = eventKeys[customEvent];
			}
		}
	};
	/**
	 * Test to see if we have an event key for the specified event
	 * @param {String} key the key to test for.
	 * @return {Boolean} returns true or false.
	 */
	Events.hasEvent = function (key) {
		return (Registry[key]) ? true : false;
	};
	/**
	 * Remove events from registry
	 * @param {String...} arguments list of keys to be removed from the event registry
	 */
	Events.remove = function () {
		var l = arguments.length;
		while (l--) {
			if (Registry[arguments[l]]) {
				delete Registry[arguments[l]];
			}
		}
	};
	Oj.Events = Oj.core.Events = Events;
}(ObjectJS));
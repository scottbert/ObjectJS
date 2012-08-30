/*jslint bitwise: false, sloppy:true, browser: true, newcap:true, windows: false, evil: false, white: false, plusplus: true */
/*globals
	ObjectJS:false,
	TestCase:false,
	assertEquals:false,
	expectAsserts:false,
	assertFunction:false,
	assertNotUndefined:false,
	assertNoException:false,
	assertObject:false,
	assertTrue,
	assertFalse,
	assertException:false,
	assertNotEquals:false,
	test:false
*/
var foo, getData, customEvent;
TestCase("Test the Events object", {
	setUp : function () {
		foo = {
			id: 'foo',
			onGetData : function (args) {
				getData = true;
				return "got data";
			},
			onCustomEventTrigger : function (args) {
				customEvent = true;
				return "got custom data";
			}
		};
		getData = false;
		customEvent = false;
	},
	tearDown : function () {
		foo = null;
	},
	"test subscription of Events." : function () {
		expectAsserts(1);
		assertNoException(function () {
			ObjectJS.Events.subscribe(foo);
		});
	},
	"test publishing of Events" : function () {
		expectAsserts(3);
		assertNoException(function () {
			ObjectJS.Events.publish('GET_DATA');
		});
		assertTrue(getData);
		assertFalse(customEvent);
	},
	"test unsubscription of Events." : function () {
		expectAsserts(2);
		ObjectJS.Events.subscribe(foo);
		assertNoException(function () {
			ObjectJS.Events.unsubscribe(foo);
		});
		ObjectJS.Events.publish('GET_DATA');
		assertFalse(getData);
	},
	"test adding of custom Events." : function () {
		expectAsserts(1);
		assertNoException(function () {
			ObjectJS.Events.add({"CUSTOM_EVENT_TRIGGER": 'onCustomEventTrigger'});
		});
	},
	"test firing of custom Events." : function () {
		expectAsserts(2);
		ObjectJS.Events.add({"CUSTOM_EVENT_TRIGGER": 'onCustomEventTrigger'});
		ObjectJS.Events.subscribe(foo);
		ObjectJS.Events.publish('CUSTOM_EVENT_TRIGGER');
		assertTrue(customEvent);
		assertFalse(getData);
	},
	"test hasEvent for custom event" : function () {
		ObjectJS.Events.add({"CUSTOM_EVENT_TRIGGER": 'onCustomEventTrigger'});
		assertTrue(ObjectJS.Events.hasEvent("CUSTOM_EVENT_TRIGGER"));
	}
});
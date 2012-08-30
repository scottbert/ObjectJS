/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, assertUndefined:false, assertObject:false*/
var Foo;
TestCase("Test the fractaljs methods", {
	setUp: function () {
		delete ObjectJS.namespace;
		delete ObjectJS.extras.Dummy;
		Foo = function () {
			"use strict";
			this.myFunction = function () {
				return 'my function';
			};
		};
		ObjectJS.reqNameSpace('ObjectJS.extras');
		(function () {
			var Dummy = {
				iExist : function () {
					return 'iDo';
				}
			};
			ObjectJS.extras.Dummy = Dummy;
		}());
	},
	tearDown: function () {
		Foo = null;
		ObjectJS.extras.Dummy = null;
	},
	"test Function.prototype.curry method" : function () {
		expectAsserts(3);
		var displayText = function () {
			var ret = [], l = arguments.length, n = 0;
			while (n < l) {
				ret.push(arguments[n]);
				n = n + 1;
			}
			return ret.join('');
		};
		assertEquals("I think I might go out", displayText('I ', 'think ', 'I ', 'might ', 'go ', 'out'));
		var simonSays = displayText.curry('Simon says, "', undefined, '".');
		assertEquals("Simon says, \"I think I might go out\".", simonSays('I ', 'think ', 'I ', 'might ', 'go ', 'out'));
		simonSays = displayText.curry('"', undefined, '", Simon says.');
		assertEquals("\"I think I might go out\", Simon says.", simonSays('I ', 'think ', 'I ', 'might ', 'go ', 'out'));
	},
	"test reqNameSpace function to request a namespace" : function () {
		expectAsserts(4);
		assertUndefined(ObjectJS.namespace);
		ObjectJS.reqNameSpace('ObjectJS.namespace');
		assertObject(ObjectJS.namespace);
		ObjectJS.reqNameSpace('ObjectJS.core.views');
		assertObject(ObjectJS.core.views);
		ObjectJS.reqNameSpace('ObjectJS.core.views.namespace');
		assertObject(ObjectJS.core.views.namespace);
	},
	"test requires function to request an additional module" : function () {
		expectAsserts(1);
		ObjectJS.requires('extras.Dummy', function () {
			assertObject(ObjectJS.extras.Dummy);
		});
		ObjectJS.requires('extras.Foo', function () {
			// should never get here
			assertObject(ObjectJS.extras.Dummy);
		});
	},
	"test augmentObject function to add items to an object" : function () {
		expectAsserts(1);
		var o = ObjectJS.augmentObject({});
		assertFunction(o.extend);
	},
	"test extend function to extend a function with another function" : function () {
		expectAsserts(3);
		var obj1 = function () {
			this.method1 = 'method1';
		},
		obj2 = function () {
			this.method2 = 'method2';
		},
		o = ObjectJS.augmentObject({});
		assertNoException(function () {
			o.extend(obj1, obj2);
		});
		obj1 = new obj1();
		assertEquals('method1', obj1.method1);
		assertEquals('method2', obj1.method2);
	}
});
/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, assertUndefined:false, assertObject:false*/
var Foo;
TestCase("Test the fractaljs methods", {
	setUp: function () {
		delete ObjectJS.namespace;
		delete ObjectJS.extras.Dummy;
		delete ObjectJS.uis;
		delete ObjectJS.views;
		Foo = function () {
			this.myFunction = function () {
				return 'my function';
			};
		};
		(function (ns) {
			var Dummy = function () {
				this.iExist = function () {
					return 'iDo';
				};
			};
			ns.Dummy = Dummy;
		}(ObjectJS.reqNameSpace('ObjectJS.extras')));
		(function (ns) {
			var Dummy = function () {
				this.runTest = function () {
					this.iHaveRun = 'yes';
				};
			};
			ns.Dummy = Dummy;
		}(ObjectJS.reqNameSpace('ObjectJS.uis')));
		(function (ns) {
			var Dummy2 = function () {
				this.runTest = function () {
					this.iHaveRun = 'yes';
				};
			};
			ns.Dummy2 = Dummy2;
		}(ObjectJS.reqNameSpace('ObjectJS.uis')));
		(function (ns) {
			var Dummy = function () {
				this.enter = function () {
					this.enterHasRun = 'yes';
				};
			};
			ns.Dummy = Dummy;
		}(ObjectJS.reqNameSpace('ObjectJS.views')));
	},
	tearDown: function () {
		Foo = null;
		ObjectJS.extras.Dummy = null;
	},
	"test init" : function () {
		expectAsserts(1);
		assertObject(ObjectJS);
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
		expectAsserts(6);
		assertUndefined(ObjectJS.namespace);
		ObjectJS.reqNameSpace('ObjectJS.namespace');
		assertObject(ObjectJS.namespace);
		ObjectJS.reqNameSpace('ObjectJS.core.views');
		assertObject(ObjectJS.core.views);
		ObjectJS.reqNameSpace('ObjectJS.core.views.namespace');
		assertObject(ObjectJS.core.views.namespace);
		assertFalse(ObjectJS.reqNameSpace('ObjectJS.core.woobie', true));
		assertUndefined(ObjectJS.core.woobie);
	},
	"test requires function to request an additional module" : function () {
		expectAsserts(3);
		ObjectJS.requires('extras.Dummy', function () {
			assertFunction(ObjectJS.extras.Dummy);
			ObjectJS.extras.Dummy = new ObjectJS.extras.Dummy();
			assertObject(ObjectJS.extras.Dummy);
			assertString(ObjectJS.extras.Dummy.iExist());
		});
		ObjectJS.requires('extras.Foo', function () {
			// should never get here
			assertObject(ObjectJS.extras.Dummy);
		});
	},
	"test baseURL property" : function () {
		expectAsserts(1);
		assertString(ObjectJS.baseUrl);
	},
	"test augmentObject function to add items to an object" : function () {
		expectAsserts(2);
		assertNull(ObjectJS.augmentObject());
		var o = ObjectJS.augmentObject({});
		assertFunction(o.extend);
	},
	"test extend function to extend a function with another function" : function () {
		expectAsserts(4);
		var Obj1 = function () {
				this.prop1 = 'prop1';
			},
			Obj2 = function () {
				this.prop2 = 'prop2';
			},
			o = ObjectJS.augmentObject({});
		assertNull(o.extend());
		assertNoException(function () {
			o.extend(Obj1, Obj2);
		});
		Obj1 = new Obj1();
		assertEquals('prop1', Obj1.prop1);
		assertEquals('prop2', Obj1.prop2);
	},
	"test initObj function" : function () {
		expectAsserts(7);
		assertNull(ObjectJS.initObj());
		assertNull(ObjectJS.initObj('Dummy'));
		assertFunction(ObjectJS.uis.Dummy);
		ObjectJS.initObj('Dummy', ObjectJS.uis);
		assertObject(ObjectJS.uis.Dummy);
		assertUndefined(ObjectJS.uis.Dummy.iHaveRun);
		ObjectJS.initObj('Dummy2', ObjectJS.uis, 'runTest');
		assertObject(ObjectJS.uis.Dummy2);
		assertString(ObjectJS.uis.Dummy2.iHaveRun);
	},
	"test getView function without view" : function () {
		expectAsserts(1);
		assertUndefined(ObjectJS.getView());
	},
	"test view function" : function () {
		expectAsserts(2);
		assertFunction(ObjectJS.views.Dummy);
		ObjectJS.view('Dummy');
		assertObject(ObjectJS.views.Dummy);
	},
	"test getView function with view" : function () {
		expectAsserts(1);
		assertObject(ObjectJS.getView());
	},
	"test err function with view" : function () {
		expectAsserts(1);
		assertTrue(ObjectJS.err('Hi'));
	},
	"test log function with view" : function () {
		expectAsserts(1);
		assertTrue(ObjectJS.log('Hi'));
	},
	"test warn function with view" : function () {
		expectAsserts(1);
		assertTrue(ObjectJS.warn('Hi'));
	}
});
AsyncTestCase("Test loadScript asynchronously", {
	"test loadScript" : function (queue) {
		expectAsserts(1);
		var dataObj;
		queue.call('call loadScript', function (callbacks) {
			ObjectJS.loadScript('//ajax.googleapis.com/ajax/libs/dojo/1.8.1/dojo/dojo.js', function () {
				queue.call('check loadScript returned an Dojo from Google', function () {
					assertObject(window.dojo);
				});
			});
		});
	}
});
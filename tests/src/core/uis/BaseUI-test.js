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
	assertNull,
	assertUndefined,
	assertException:false,
	assertNotEquals:false,
	test:false
*/
TestCase("Test the BaseUI object", {
	setUp :  function () {
		/*:DOC += 
			<div id="myRoot">
				<div id="Foo">
					<h3 class="title">Head</h3>
					<div class="content">content</div>
					<div class="footer">Foot</div>
					<div class="template">
						TEML
					</div>
				</div>
				<div id="Foo2">
					<h3 class="title">Head</h3>
					<div class="content">content</div>
					<div class="footer">Foot</div>
					<div class="template">
						TEML
					</div>
				</div>
			</div>
		*/
		ObjectJS.reqNameSpace('test.uis');
		test.uis.Foo = function (view) {
			var Foo = this;
			Foo.view = view;
			(function () {
				Foo.setupUI('#Foo');
			}());
		};
		test.uis.Foo2 = function (view) {
			var Foo2 = this;
			Foo2.view = view;
			(function () {
				Foo2.setupUI('#Foo2');
			}());
		};
		ObjectJS.core.uis.BaseUI.createUI(test.uis.Foo);
		ObjectJS.core.uis.BaseUI.createUI(test.uis.Foo2);
	},
	"test the setRootDomNode method" : function () {
		expectAsserts(2);
		test.uis.Foo = new test.uis.Foo();
		test.uis.Foo.setRootDomNode('#myRoot');
		assertObject(test.uis.Foo.root);
		test.uis.Foo2 = new test.uis.Foo2();
		assertObject(test.uis.Foo2.domNode);
	},
	"test the setupUI method" : function () {
		expectAsserts(4);
		test.uis.Foo = new test.uis.Foo();
		assertEquals(test.uis.Foo.contentNode.html(), 'content');
		assertEquals(test.uis.Foo.titleNode.html(), 'Head');
		assertEquals(test.uis.Foo.footerNode.html(), 'Foot');
		assertEquals(test.uis.Foo.templateNode.html(), 'TEML');
	},
	"test the get/setView methods" : function () {
		expectAsserts(2);
		test.uis.Foo = new test.uis.Foo();
		test.uis.Foo2 = new test.uis.Foo2();
		test.uis.Foo.setView({id : 'myview'});
		assertEquals(test.uis.Foo.getView().id, 'myview');
		assertUndefined(test.uis.Foo2.getView());
	},
	"test the open method" : function () {
		expectAsserts(2);
		test.uis.Foo = new test.uis.Foo();
		test.uis.Foo.open();
		assertTrue(test.uis.Foo.domNode.hasClass('open'));
		assertTrue(test.uis.Foo.isOpen);
	},
	testClear : function () {
		expectAsserts(0);
	}
});
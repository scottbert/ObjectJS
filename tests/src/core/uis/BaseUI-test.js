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
TestCase("Test the BaseUI object", {
	setUp :  function () {
		/*:DOC += 
			<div id="Foo">
				<h3 class="title">Head</h3>
				<div class="content">content</div>
				<div class="footer">Foot</div>
				<div class="template">
					TEML
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
		ObjectJS.core.uis.BaseUI.createUI(test.uis.Foo);
	},
	"test the setupUI method" : function () {
		expectAsserts(4);
		test.uis.Foo = new test.uis.Foo();
		assertEquals(test.uis.Foo.contentNode.html(), 'content');
		assertEquals(test.uis.Foo.titleNode.html(), 'Head');
		assertEquals(test.uis.Foo.footerNode.html(), 'Foot');
		assertEquals(test.uis.Foo.templateNode.html(), 'TEML');
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
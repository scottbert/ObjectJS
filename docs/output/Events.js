Ext.data.JsonP.Events({"tagname":"class","name":"Events","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-Events","members":{"cfg":[],"property":[{"name":"","tagname":"property","owner":"Events","meta":{},"id":"property-"}],"method":[{"name":"add","tagname":"method","owner":"Events","meta":{},"id":"method-add"},{"name":"hasEvent","tagname":"method","owner":"Events","meta":{},"id":"method-hasEvent"},{"name":"publish","tagname":"method","owner":"Events","meta":{},"id":"method-publish"},{"name":"remove","tagname":"method","owner":"Events","meta":{},"id":"method-remove"},{"name":"subscribe","tagname":"method","owner":"Events","meta":{},"id":"method-subscribe"},{"name":"unsubscribe","tagname":"method","owner":"Events","meta":{},"id":"method-unsubscribe"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":8,"files":[{"filename":"Events.js","href":"Events.html#Events"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Events.html#Events' target='_blank'>Events.js</a></div></pre><div class='doc-contents'><p>PRIVATE METHODS *</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-property-' class='name not-expandable'></a><span> : Object</span></div><div class='description'><div class='short'><p>API METHODS *</p>\n</div><div class='long'><p>API METHODS *</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-add' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-method-add' class='name expandable'>add</a>( <span class='pre'>eventKeys</span> )</div><div class='description'><div class='short'>Adds events to registry. ...</div><div class='long'><p>Adds events to registry. Takes an event object consisting of one or more events key value pairs, for example:\n{\n   \"EVENT_FOO\" : \"onFoo\"\n}</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventKeys</span> : Object<div class='sub-desc'><p>An object of strings.</p>\n</div></li></ul></div></div></div><div id='method-hasEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-method-hasEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-method-hasEvent' class='name expandable'>hasEvent</a>( <span class='pre'>key</span> ) : Boolean</div><div class='description'><div class='short'>Test to see if we have an event key for the specified event ...</div><div class='long'><p>Test to see if we have an event key for the specified event</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>key</span> : String<div class='sub-desc'><p>the key to test for.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>returns true or false.</p>\n</div></li></ul></div></div></div><div id='method-publish' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-method-publish' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-method-publish' class='name expandable'>publish</a>( <span class='pre'>eventKey, parameters, [view]</span> ) : Array|Object</div><div class='description'><div class='short'>This publishes an event. ...</div><div class='long'><p>This publishes an event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventKey</span> : string<div class='sub-desc'><p>The key for the event we would like to publish</p>\n</div></li><li><span class='pre'>parameters</span> : Object<div class='sub-desc'><p>Any parameters passed to the event.</p>\n</div></li><li><span class='pre'>view</span> : string (optional)<div class='sub-desc'><p>Optionally pass a view's ID to only publish to that view.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array|Object</span><div class='sub-desc'><p>an optional argument or array of arguments.</p>\n</div></li></ul></div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-method-remove' class='name expandable'>remove</a>( <span class='pre'>arguments</span> )</div><div class='description'><div class='short'>Remove events from registry ...</div><div class='long'><p>Remove events from registry</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>arguments</span> : String...<div class='sub-desc'><p>list of keys to be removed from the event registry</p>\n</div></li></ul></div></div></div><div id='method-subscribe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-method-subscribe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-method-subscribe' class='name expandable'>subscribe</a>( <span class='pre'>Object</span> ) : null</div><div class='description'><div class='short'>Subscribe an object to some events. ...</div><div class='long'><p>Subscribe an object to some events. Pass this function a ObjectJS object with methods that\nmatch methods in the registry and they will be added as event listeners to the events system.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>Object</span> : Object<div class='sub-desc'><p>this is the ObjectJS object you wish to listen to specific events.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>null</span><div class='sub-desc'><p>Does not return anything.</p>\n</div></li></ul></div></div></div><div id='method-unsubscribe' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Events'>Events</span><br/><a href='source/Events.html#Events-method-unsubscribe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Events-method-unsubscribe' class='name expandable'>unsubscribe</a>( <span class='pre'>Object</span> ) : null</div><div class='description'><div class='short'>Allows us to manually remove an object's event listeners, for instance if\nwe destroy an object. ...</div><div class='long'><p>Allows us to manually remove an object's event listeners, for instance if\nwe destroy an object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>Object</span> : Object<div class='sub-desc'><p>the ObjectJS object we want to remove from the events system\nlistener list.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>null</span><div class='sub-desc'><p>Does not return anything.</p>\n</div></li></ul></div></div></div></div></div></div></div>"});
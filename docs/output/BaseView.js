Ext.data.JsonP.BaseView({"tagname":"class","name":"BaseView","extends":null,"mixins":[],"alternateClassNames":[],"aliases":{},"singleton":false,"requires":[],"uses":[],"enum":null,"override":null,"inheritable":null,"inheritdoc":null,"meta":{},"private":null,"id":"class-BaseView","members":{"cfg":[],"property":[{"name":"","tagname":"property","owner":"BaseView","meta":{},"id":"property-"},{"name":"controller","tagname":"property","owner":"BaseView","meta":{},"id":"property-controller"},{"name":"uis","tagname":"property","owner":"BaseView","meta":{},"id":"property-uis"}],"method":[{"name":"createView","tagname":"method","owner":"BaseView","meta":{},"id":"method-createView"},{"name":"getDefaultComponents","tagname":"method","owner":"BaseView","meta":{},"id":"method-getDefaultComponents"},{"name":"requires","tagname":"method","owner":"BaseView","meta":{},"id":"method-requires"},{"name":"setDefaultComponents","tagname":"method","owner":"BaseView","meta":{},"id":"method-setDefaultComponents"}],"event":[],"css_var":[],"css_mixin":[]},"linenr":8,"files":[{"filename":"BaseView.js","href":"BaseView.html#BaseView"}],"html_meta":{},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/BaseView.html#BaseView' target='_blank'>BaseView.js</a></div></pre><div class='doc-contents'><p>PRIVATE METHODS *</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-property-' class='name not-expandable'></a><span> : Object</span></div><div class='description'><div class='short'><p>API METHODS *</p>\n</div><div class='long'><p>API METHODS *</p>\n</div></div></div><div id='property-controller' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-property-controller' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-property-controller' class='name not-expandable'>controller</a><span> : Object</span></div><div class='description'><div class='short'><p>This is a reference to the controller that instantiated the view</p>\n</div><div class='long'><p>This is a reference to the controller that instantiated the view</p>\n</div></div></div><div id='property-uis' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-property-uis' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-property-uis' class='name not-expandable'>uis</a><span> : Object</span></div><div class='description'><div class='short'><p>This is where you can find an object representing your UIs once you've called requires</p>\n</div><div class='long'><p>This is where you can find an object representing your UIs once you've called requires</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-createView' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-method-createView' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-method-createView' class='name expandable'>createView</a>( <span class='pre'>object</span> ) : Object</div><div class='description'><div class='short'>Takes an object and extends it with the BaseView ...</div><div class='long'><p>Takes an object and extends it with the BaseView</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>object</span> : Object<div class='sub-desc'><p>to extend;</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>extended object</p>\n</div></li></ul></div></div></div><div id='method-getDefaultComponents' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-method-getDefaultComponents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-method-getDefaultComponents' class='name expandable'>getDefaultComponents</a>( <span class='pre'></span> ) : Array</div><div class='description'><div class='short'>returns the array of default components. ...</div><div class='long'><p>returns the array of default components.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>[description]</p>\n</div></li></ul></div></div></div><div id='method-requires' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-method-requires' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-method-requires' class='name expandable'>requires</a>( <span class='pre'>namespace, arr, a</span> ) : String[]</div><div class='description'><div class='short'>All views require a set of components that exist within that view. ...</div><div class='long'><p>All views require a set of components that exist within that view. Every\nview should have an enter method that calls requires and adds the following.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>namespace</span> : Object<div class='sub-desc'><p>your namespace</p>\n</div></li><li><span class='pre'>arr</span> : String[]<div class='sub-desc'><p>an array of strings containing UI component names</p>\n</div></li><li><span class='pre'>a</span> : Object<div class='sub-desc'><p>reference to the view object</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String[]</span><div class='sub-desc'><p>array of objects</p>\n</div></li></ul></div></div></div><div id='method-setDefaultComponents' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='BaseView'>BaseView</span><br/><a href='source/BaseView.html#BaseView-method-setDefaultComponents' target='_blank' class='view-source'>view source</a></div><a href='#!/api/BaseView-method-setDefaultComponents' class='name expandable'>setDefaultComponents</a>( <span class='pre'>ns, arr</span> )</div><div class='description'><div class='short'>Sets default UIs. ...</div><div class='long'><p>Sets default UIs. These UIs appear on every page. Should only be\ncalled once in your project as it replaces everything each time.\ngenerally you would call this from your app view.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>ns</span> : Object<div class='sub-desc'><ul>\n<li>the namespace your UIs can be found under.</li>\n</ul>\n\n</div></li><li><span class='pre'>arr</span> : String<div class='sub-desc'><ul>\n<li>An array of UI names.</li>\n</ul>\n\n</div></li></ul></div></div></div></div></div></div></div>"});
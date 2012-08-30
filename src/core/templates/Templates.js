/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4, vars: true, evil:true, regexp:true */
/*globals FF:true,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, window:false*/
/**
 * @author Scott van Looy
 */
/**
 * @namespace contains the framework.
 */
FF.reqNameSpace('FF.core.Templating');
(function (ff) {
	"use strict";
	var walkTree,
		processText,
		processLoop,
		nodePath;
	nodePath = function ($node, name) {
		if (typeof name !== "string") {
			return;
		}
		return $node.find('[data-json=' + name + ']');
	};
	processText = function ($node, name, text) {
		var n = nodePath($node, name),
			p;
		if (n) {
			p = n.parent().removeClass('template');
			n.removeClass('template');
			if (text === null) {
				n.addClass('template');
				return;
			}
			if (text.domID) {
				n.attr('id', text.domID);
			}
			if (text.cssClass) {
				n.addClass(text.cssClass);
			}
			if (text.href) {
				n.attr('href', text.href);
			}
			if (text.text || typeof text === "string") {
				n.html(text.text || text);
			}
			return true;
		}
		return false;
	};
	processLoop = function ($node, name, array) {
		var n = nodePath($node, name),
			l = array.length,
			i,
			p,
			tmp;
		if (!n.length) {
			n = $node;
		}
		p = n.parent();
		n = n.remove().eq(0).removeClass('template');
		p.empty();
		for (i = 0; i < l; i++) {
			tmp = n.clone();
			if (typeof array[i] === "string") {
				tmp.html(array[i]);
			} else {
				walkTree(tmp, array[i], name);
			}
			p.append(tmp);
		}
	};
	walkTree = function ($node, json, name) {
		var j;
		if (typeof name === "string" && typeof json === "string") {
			processText($node, name, json);
		} else if (FF.core.utils.ArrayUtils.isArray(json)) {
			processLoop($node, json);
		} else {
			for (j in json) {
				if (json.hasOwnProperty(j) && j !== "enabled" && j !== "obj_attributes") {
					if (json[j] === null || (json !== null && (typeof json[j] === "string" || json[j].text || json[j].domID || json[j].cssClass || json[j].href))) {
						processText($node, j, json[j]);
					} else if (FF.core.utils.ArrayUtils.isArray(json[j])) {
						processLoop($node, j, json[j]);
					} else if (typeof json[j] === "object") {
						walkTree(nodePath($node, j), json[j]);
					}
				}
			}
		}
	};
	ff.renderJSONTemplate = walkTree;
}(FF.core.Templating));
/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true */
/*globals ObjectJS:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, ActiveXObject:false*/
/**
 * @author scottvanlooy
 */
(function (mixins) {
	"use strict";
	var augment,
		OBJMIXINS,
		UIMIXINS,
		that,
		dataObj = {},
		eventBind,
		eventPrefix,
		getAttr = function (str, attr) {
			return (str.split(new RegExp('\\b' + attr + '='))[1] || '').split('&')[0];
		},
		hijack = function (callback) {
			return function (e) {
				if (!e || !e.stopPropagation) {
					e = {
						stopPropagation : window.event.cancelBubble,
						preventDefault : function () {
							window.event.returnValue = false;
						}
					};
				}
				callback(e);
			};
		},
		NativeUI = function (object) {
			var i;
			for (i in OBJMIXINS) {
				if (OBJMIXINS.hasOwnProperty(i)) {
					object[i] = OBJMIXINS[i];
				}
			}
		},
		NativeSelector = function (id, node) {
			if (!document.querySelectorAll) {
				throw ('Old browser, please use jQuery mixin');
			}
			var Node;
			// If we're just an ID, get us. getElementById is faster than querySelectorAll - 
			// this currently works about 10 times faster than jQuery for single IDs and 
			// nearly twice as fast for more complex queries.
			if (id.charAt(0).indexOf('#') !== -1 && id.indexOf(' ') === -1) {
				Node = document.getElementById(id.substring(1));
			} else {
				Node = (node || document).querySelectorAll(id);
			}
			if (!Node) {
				return null;
			}
			augment(Node);
			return Node;
		},
		NativeController = function (Controller) {
			Controller.createXHR = function () {
				var xhr,
					XHR = {};
				if (window.XMLHttpRequest) {
					xhr = new window.XMLHttpRequest();
				} else if (window.ActiveXObject) {
					xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
				} else {
					return null;
				}
				XHR.open = function (url, callback, error) {

				};
				XHR.error = function () {

				};
				return XHR;
			};
			Controller.createJSONP = function (cbname) {
				var fn = (typeof cbname === "string") ? cbname : 'f' + (new Date().getTime()).toString(16),
					JSONP = {};
				JSONP.open = function (options) {
					var c,
						n = 0,
						t,
						url = options.url,
						callback = options.success,
						error = options.error,
						cb = function () {
							if (callback) {
								if (c > 10000) {
									if (error) {
										error('Didn\'t get any data after 10s, check ?callback');
									}
								}
								if (typeof dataObj[fn] !== "undefined") {
									callback(dataObj[fn]);
								} else {
									setTimeout(cb, 100);
								}
							}
						};
					t = getAttr(url, 'callback');
					if (t) {
						fn = t;
					} else {
						c = '?callback';
						if (url.indexOf('?') !== -1) {
							c = '&callback';
						}
						url += c + '=' + fn;
					}
					window[fn] = function (data) {
						dataObj[fn] = data;
					};
					try {
						ObjectJS.loadScript(url, cb, 1, 0, 0, error);
					} catch (ex) {
						error(ex);
					}
				};
				JSONP.error = function () {
					//something
				};
				return JSONP;
			};
		};
	augment = function (Nodes) {
		var i;
		if (!Nodes.augmented) {
			for (i in UIMIXINS) {
				if (UIMIXINS.hasOwnProperty(i)) {
					Nodes[i] = UIMIXINS[i];
				}
			}
			Nodes.augmented = true;
		}
		return Nodes;
	};
	OBJMIXINS = {
		superOpen: function (callback) {
			that = that || this;
			that.domNode.style.display = 'block';
			return (callback) ? callback() : null;
		},
		superClose: function (callback) {
			that = that || this;
			that.domNode.style.display = 'none';
			return (callback) ? callback() : null;
		},
		on: function () {
			that = that || this;
			that.domNode.style.display = 'block';
		},
		off: function () {
			that = that || this;
			that.domNode.style.display = 'none';
		}
	};
	UIMIXINS = {
		find: function (str) {
			return NativeSelector(str, this);
		},
		remove: function () {
			var NodeList = this,
				ret = [],
				l = NodeList.length,
				n;
			if (!NodeList.item) {
				NodeList = [NodeList];
			}
			for (n = 0; n < l; n++) {
				ret.push(augment(NodeList[n].parentNode.removeChild(NodeList[n])));
			}
			return augment(ret);
		},
		bind : function (str, func) {
			var NodeList = this,
				ret = [],
				l = NodeList.length,
				n;
			if (!NodeList.item) {
				NodeList = [NodeList];
			}
			if (!eventBind) {
				if (NodeList[0].addEventListener) {
					eventBind = 'addEventListener';
					eventPrefix = '';
				} else {
					eventBind = 'attachEvent';
					eventPrefix = 'on';
				}
			}
			for (n = 0; n < l; n++) {
				if (NodeList[n][eventBind]) {
					NodeList[n][eventBind](eventPrefix + str, hijack(func), true);
				}
				ret.push(augment(NodeList[n]));
			}
			return ret;
		},
		addClass : function (classNames) {
			function p(o, c) {
				var e = o || '',
					ca,
					pa,
					l,
					ia = false,
					pia = (e.indexOf(' ') !== -1),
					cia = (c.indexOf(' ') !== -1),
					cs;
				if (pia || cia) {
					if (pia && cia) {
						return ObjectJS.core.utils.ArrayUtils.combine(e.split(' '), c.split(' ')).join(' ');
					}
					pa = (pia) ? e.split(' ') : c.split(' ');
					cs = (pia) ? c : e;
					l = pa.length;
					while (l--) {
						if (pa[l] === cs) {
							ia = true;
						}
					}
					if (!ia && cs !== '') {
						pa.push((cs.trim) ? cs.trim() : cs);
					}
					return pa.join(' ');
				}
				return (e === '') ? c : e + ' ' + c;
			}
			// more than one class
			if (this.length) {
				var l = this.length;
				while (l--) {
					this[l].setAttribute('class', p(this[l].getAttribute('class'), classNames));
				}
			} else {
				this.setAttribute('class', p(this.getAttribute('class'), classNames));
			}
		},
		removeClass : function (classNames) {
			var l = this.length;
			function d(o, s) {
				o.setAttribute('class', (s.trim) ? o.getAttribute('class').replace(s, '').trim() : o.getAttribute('class').replace(s, ''));
			}
			function m(o, cn) {
				var ca = cn.split(' '),
					cl = ca.length;
				if (cl) {
					while (cl--) {
						d(o, ca[cl]);
					}
				} else {
					d(o, cn);
				}
			}
			if (l) {
				while (l--) {
					m(this[l], classNames);
				}
			} else {
				m(this, classNames);
			}
		},
		hasClass : function (className) {
			var i,
				n = this,
				l;
			if (!l) {
				n = [this];
			}
			l = n.length;
			for (i = 0; i < l; i++) {
				if (n[i].className && n[i].className.split && n[i].className.split(' ').indexOf(className) !== -1) {
					return true;
				}
			}
			return false;
		},
		html : function (content) {
			var ret = (this.length) ? this[0] : this;
			if (content) {
				ret.innerHTML = content;
			}
			return (ret.innerHTML && ret.innerHTML.trim) ? ret.innerHTML.trim() : ret.innerHTML;
		}
	};
	mixins.UI = mixins.NativeUI = NativeUI;
	mixins.Selector = mixins.NativeSelector = NativeSelector;
	mixins.Controller = mixins.NativeController = NativeController;
}(ObjectJS.reqNameSpace('ObjectJS.mixins')));
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50 */
/*global ObjectJS:false */
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
        NativeUI = function NativeUI(object) {
            var i;
            for (i in OBJMIXINS) {
                if (OBJMIXINS.hasOwnProperty(i)) {
                    object[i] = OBJMIXINS[i];
                }
            }
        },
        NativeSelector = function NativeSelector(id, node) {
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
                Node = ((node || [])[0] || document).querySelectorAll(id);
            }
            if (!Node) {
                return null;
            }
            augment(Node);
            return Node;
        },
        checkDelay = function checkDelay(NodeList, closure) {
            var l,
                ret,
                node;
            if (!NodeList.length){
                NodeList = [NodeList];
            }
            l = NodeList.length;
            while (l--) {
                node = NodeList[l];
                if (node.tdelay) {
                    if (!node.ttimers) {
                        node.ttimers = [];
                    }
                    node.ttimers.push(function (n) {
                        setTimeout(function () {
                            closure();
                        }, n.tdelay);
                    }(node));
                    ret = true;
                }
            }
            return (ret) ? augment(NodeList) : closure();
        },
        NativeController = function NativeController(Controller) {
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
            Controller.createJSONP = function createJSONP(cbname) {
                var fn = (typeof cbname === "string") ? cbname : 'f' + (new Date().getTime()).toString(16),
                    JSONP = {};
                JSONP.open = function (options) {
                    var c,
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
            return checkDelay(NodeList, function () {
                if (!NodeList.item) {
                    NodeList = [NodeList];
                }
                for (n = 0; n < l; n++) {
                    ret.push(augment(NodeList[n].parentNode.removeChild(NodeList[n])));
                }
                return augment(ret);
            });
        },
        bind : function (str, func) {
            var NodeList = this,
                ret = [],
                l = NodeList.length,
                n;
            return checkDelay(NodeList, function () {
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
            });
        },
        addClass : function (classNames) {
            var Node = this;
            function p(o, c) {
                var e = o || '',
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
            return checkDelay(Node, function () {
                if (Node.length) {
                    var l = Node.length;
                    while (l-- && Node[l].setAttribute) {
                        Node[l].setAttribute('class', p(Node[l].getAttribute('class'), classNames));
                    }
                } else if (Node.setAttribute) {
                    Node.setAttribute('class', p(Node.getAttribute('class'), classNames));
                }
                return augment(Node);
            });
            // more than one class
        },
        removeClass : function (classNames) {
            var Node = this,
                node,
                ret,
                l = Node.length;
            if (!l) {
                Node = [Node];
                l = Node.length;
            }
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
            while (l--) {
                node = Node[l];
                ret = checkDelay(node, function (n) {
                    return function () {
                        m(n, classNames);
                    };
                }(node));
            }
            return Node;
        },
        setClass : function (classNames) {
            var Node = this,
                node,
                ret,
                l = Node.length;
            if (!l) {
                Node = [Node];
                l = Node.length;
            }
            while (l--) {
                node = Node[l];
                ret = checkDelay(node, function (n) {
                    return function () {
                        if (n.setAttribute) {
                            n.setAttribute('class', classNames.trim());
                        }
                    };
                }(node));
            }
            return Node;
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
            var Node = this;
            return checkDelay(Node, function () {
                var ret = (Node.length) ? Node[0] : Node;
                if (content) {
                    ret.innerHTML = content;
                }
                return (ret.innerHTML && ret.innerHTML.trim) ? ret.innerHTML.trim() : ret.innerHTML;
            });
        },
        randomDelay : function (number) {
            var Node = this,
                intn,
                l = Node.length;
            if (!l) {
                intn = [Node];
                l = intn.length;
            } else {
                intn = Node;
            }
            while (l--) {
                augment(intn[l]).delay(Math.random() * number);
            }
            return Node;
        },
        delay : function (number) {
            var Node = this,
                intn,
                l = Node.length;
            if (!l) {
                intn = [Node];
                l = intn.length;
            } else {
                intn = Node;
            }
            while (l--) {
                if (!intn[l].tdelay) {
                    intn[l].tdelay = parseInt(number, 10);
                } else {
                    intn[l].tdelay += parseInt(number, 10);
                }
            }
            return Node;
        }
    };
    mixins.UI = mixins.NativeUI = NativeUI;
    mixins.Selector = mixins.NativeSelector = NativeSelector;
    mixins.Controller = mixins.NativeController = NativeController;
}(ObjectJS.reqNameSpace('ObjectJS.mixins')));
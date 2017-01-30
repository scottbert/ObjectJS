
/**
 * @author Scott van Looy
 * @name { ObjectJS:[name]}
 */
import {augmentObject, err, log, warn} from './Shared';
import BaseUI from './BaseUI';
import BaseController from './BaseController';
import BaseView from './BaseView';

function ojs(options) {
    let currentView,
        views,
        Mixin = options.Mixin,
        Selector = Mixin.Selector;

    function ObjectJS(node) {
        return Selector(node);
    }

    /**
     * The base URL for library scripts - determined by the location of
     * object.min?.js
     * @return {string}
     */

    const BASE_URL = (function () {
        if (!document) {
            return null;
        }
        var s = document.getElementsByTagName('script');
        var m = s[s.length - 1];
        return m.src.replace(/[^\/]+?$/, '');
    }());

    /**
     * Load a script asynchronously.
     * @param  {string}   src  href of the script to load.
     * @param  {Function} cb   callback to fire upon loading.
     * @param  {Number}   load Scripts remaining to load.
     * @param  {Number}   len  Total scripts to load
     * @param  {Number}   num  Script index
     * @param  {Function}   err  Something to do on error.
     */
    function loadScript(src, cb, load, len, num, err) {

        function loaded() {
            var state = s.state;
            if ((!state || /loaded|complete/.test(state))) {
                load--;
                if (!load && len === num) {
                    if (cb && typeof cb === 'function' && !cb.called) {
                        cb.call(this);
                        cb.called = true;
                    }
                }
            }
        }

        function error() {
            if (err && typeof err === 'function' && !err.called) {
                err.call(this);
                err.called = true;
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.async = false;
        s.onload = s.onreadystatechange = loaded;
        s.onerror = error;
        ObjectJS('head').append(s);
    }

    /**
     * Requests a namespace. If the namespace does not exist, it will
     * be created
     * @param {String} req - request in the format of 'my.name.space'
     * @param {Object} test - test for a mamespace.
     * @return {Object|false} The namespace or false if test is true and the namespace doesn't exist
     */
    function reqNameSpace(req, test) {
        var t,
            x,
            tns,
            l;
        if (!req || typeof req !== 'string') {
            err('getNameSpace error - requires a string in the format "my.name.space"');
            return null;
        }
        if (!req.match('\\.')) {
            t = [req];
        } else {
            t = req.split('.');
        }
        tns = window;
        l = t.length;
        for (x = 0; x < l; x++) {
            if (tns[t[x]]) {
                tns = tns[t[x]];
            } else {
                if (test) {
                    return false;
                }
                tns = tns[t[x]] = {};
            }
        }
        return tns;
    }
    /**
     * requires method. Using the location of object.min?.js as the base, can
     * load other modules. Checks to see if they exist and if they don't, we grab
     * the module.
     * @param {Array} requires - array of strings representing a component's path.
     * 'myapp/main/Hello.js' would be written as 'myapp.main.Hello' and Hello.js
     * would contains an object at the same namespace
     * (myapp.main.Hello = (function(){}()))
     * @param {Function} [callback]. Optional callback to run when loading is complete.
     */
    function requires(requires, callback, oj) {
        var l = requires.length,
            src,
            load = 0,
            n,
            docallback = false,
            namespaceTest;
        oj = oj || 'ns';
        namespaceTest = function (namespace, test) {
            var ret = namespace,
                strArr = test.split('.'),
                l = strArr.length,
                p;
            // Find starting point. Either our own namespace or the window. If neither, return false.
            if (!ret[strArr[0]] && !window[strArr[0]]) {
                return undefined;
            }
            // If starting point is the window, set window to the return value.
            if (!ret[strArr[0]] && window[strArr[0]]) {
                ret = window;
            }
            for (p = 0; p < l; p++) {
                if (ret !== undefined) {
                    ret = ret[strArr[p]];
                }
            }
            return ret;
        };
        if (typeof requires === 'string') {
            requires = [requires];
            l = requires.length;
        }
        for (n = 0; n < l; n++) {
            docallback = false;
            src = null;
            if (namespaceTest(oj, requires[n]) === undefined) {
                src = BASE_URL + requires[n].replace(/\./gi, '/') + '.js';
                if (oj.finished) {
                    loadScript(src, callback, load, requires.length, n);
                } else {
                    docallback = true;
                    document.write('<script type="text/javascript" src="' + src + '"><\/script>');
                }
            } else {
                // We already have this item. Run callback.
                docallback = true;
            }
        }
        if (docallback) {
            if (callback) {
                callback();
            }
        }
    }


    /**
     * Initialise an object
     * @param  {String}   obj the name of the object to initialise
     * @param  {Object}   ns  the namespace it lives in
     * @param  {String} [fn]  A function to run on the newly initialised object.
     * @return {Object}       The new object
     */
    function initObj(obj, ns, fn) {
        if (!ns || !ns[obj]) {
            err('Attempted to init object', obj, 'in namespace', ns, 'failed.');
            return null;
        }
        if (typeof ns[obj] === 'function') {
            ns[obj] = new ns[obj]();
        }
        if (ns[obj][fn]) {
            ns[obj][fn]();
        }
        return ns[obj];
    }
    /**
     * Returns a reference to the current active view.
     * @return {Object} a reference to the current active view.
     */
    function getView() {
        return currentView;
    }
    /**
     * Calls a view. Used at the bottom of an HTML page to call the associated JS view with that page.
     * @param  {String} view The view name
     */
    function view(view) {
        initObj(view, views, 'enter');
        currentView = views[view];
    }

    /**
     * initialise the object
     * @private
     */
    function init() {
        Function.prototype.curry = Function.prototype.partial || function curry() {
            var fn = this, args = Array.prototype.slice.call(arguments);
            return function () {
                var myArgs = Array.prototype.slice.call(arguments),
                    combined = [];
                var
                    i,
                    ii,
                    l = args.length,
                    ll = myArgs.length;
                for (i = 0; i < l; i++) {
                    if (args[i] === undefined) {
                        for (ii = 0; ii < ll; ii++) {
                            combined.push(myArgs[ii]);
                        }
                    } else {
                        combined.push(args[i]);
                    }
                }
                return fn.apply(this, combined);
            };
        };
    }

    init();

    let baseUI = BaseUI(Mixin);
    let baseController = BaseController(Mixin);
    let baseView = BaseView(Mixin);

    ObjectJS.NOOP = function () {};
    ObjectJS.reqNameSpace = reqNameSpace;
    ObjectJS.requires = requires;
    ObjectJS.BASE_URL = BASE_URL;
    ObjectJS.augmentObject = augmentObject;
    ObjectJS.initObj = initObj;
    ObjectJS.getView = getView;
    ObjectJS.view = view;
    ObjectJS.loadScript = loadScript;
    ObjectJS.err = err;
    ObjectJS.log = log;
    ObjectJS.warn = warn;
    ObjectJS.createUI = baseUI.createUI;
    ObjectJS.setRootDomNode = baseUI.setRootDomNode;
    ObjectJS.createView = baseView.createView;
    ObjectJS.createController = baseController.createController;
    return ObjectJS;
}

export default ojs;

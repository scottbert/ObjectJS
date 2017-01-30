/**
 * Copyright (c) 2011-2012, Scott van Looy, ThreeSquared.
 * All Rights Reserved.
 * @author Scott van Looy
 */

function HashMap() {
    var o = {},
        len = 0,
        ksret = [],
        vret = [];
    /** PRIVATE METHODS **/
    function cempty() {
        ksret = [];
        vret = [];
    }
    function clear() {
        cempty();
        o = {};
    }
    function clone() {
        var ret = new HashMap();
        ret.putAll(o);
        return ret;
    }
    function containsKey(inkey) {
        return (o[inkey]) ? true : false;
    }
    function containsValue(inval) {
        var k;
        for (k in o) {
            if (o.hasOwnProperty(k)) {
                if (o[k] === inval) {
                    return true;
                }
                return false;
            }
        }
    }
    function get(inkey) {
        return o[inkey];
    }
    function entrySet() {
        throw ('not implemented');
    }
    function isEmpty() {
        return !len;
    }
    function keySet() {
        var k;
        if (!ksret.length) {
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    ksret.push(k);
                }
            }
        }
        return ksret;
    }
    function put(inkey, inval) {
        cempty();
        if (!o[inkey]) {
            len++;
        }
        o[inkey] = inval;
    }
    function putAll(inmap) {
        var k;
        cempty();
        for (k in inmap) {
            if (inmap.hasOwnProperty(k)) {
                if (!o[k]) {
                    len++;
                }
                o[k] = inmap[k];
            }
        }
    }
    function remove(inkey) {
        if (o[inkey]) {
            delete o[inkey];
            len--;
        }
        cempty();
    }
    function size() {
        return len;
    }
    function toString() {
        var ret = [],
            k;
        for (k in o) {
            if (o.hasOwnProperty(k)) {
                ret.push(k + '=' + o[k]);
            }
        }
        return ret.join();
    }
    function values() {
        var k;
        if (!vret.length) {
            for (k in o) {
                if (o.hasOwnProperty(k)) {
                    vret.push(o[k]);
                }
            }
        }
        return vret;
    }
    /** API METHODS **/
    return {
        clear,
        clone,
        containsKey,
        containsValue,
        entrySet,
        get,
        isEmpty,
        keySet,
        put,
        putAll,
        remove,
        size,
        toString,
        values
    };
}
export default HashMap;

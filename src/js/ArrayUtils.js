
/**
 * @author Scott van Looy
 */

/**
 * takes two arrays of strings and combines them, removing duplicates
 * @method combine
 * @param  {Array} arr1 first array to combine
 * @param  {Array} arr2 second array to combine
 * @return {Array}      deduped unsorted array of strings
 */

function combine(arr1, arr2) {
    var tarr = arr1.concat(arr2),
        l = tarr.length,
        o = {},
        ret = [],
        n,
        name;
    for (n = 0; n < l; n++) {
        o[tarr[n]] = true;
    }
    for (name in o) {
        if (o.hasOwnProperty(name)) {
            ret.push(name);
        }
    }
    return ret;
}
/**
 * returns true if we are an array.
 * @method isArray
 * @param  {Array}  o [description]
 * @return {Boolean}   [description]
 */

function isArray (o) {
    return Array.isArray(o);
}

export {
    combine,
    isArray
};

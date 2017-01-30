/**
 * If the string "debug" appears in the URL, we write to the console if there is one
 * whatever we feed into this function.
 */
function err() {
    if (window && window.console && window.location.href === 'debug') {
        window.console.error(arguments);
    }
    return true;
}
/**
 * If the string "debug" appears in the URL, we write to the console if there is one
 * whatever we feed into this function.
 */
function log() {
    if (window && window.console && window.location.href.indexOf('debug') !== -1) {
        window.console.log(arguments);
    }
    return true;
}
/**
 * If the string "debug" appears in the URL, we write to the console if there is one
 * whatever we feed into this function.
 */
function warn() {
    if (window && window.console && window.location.href.indexOf('debug') !== -1) {
        window.console.warn(arguments);
    }
    return true;
}

/**
 * Augment the object, adding a few shared methods to it.
 * @param  {Object} object the object to be augmented
 * @return {Object} the augmented object.
 */
function augmentObject(object) {
    if (typeof object === 'undefined') {
        err('tried to augment', object);
        return null;
    }
    if (!object.augmented) {
        /**
         * extend an object with another object.
         *
         * @param  {Function} item       child function
         * @param  {Function|Object} Inheritant parent function/object
         *
         * @return {Object}            Returns the object with its augmentation
         */
        object.extend = object.extend || function extend(Child, Parent) {
            if (typeof Child === 'undefined' || typeof Parent === 'undefined') {
                err('Tried to extend', Child, 'with', Parent);
                return null;
            }
            if (typeof Parent === 'function') {
                Child.prototype = new Parent();
                Child.constructor = Child;
            } else {
                Child.prototype = Parent;
                Child.constructor = Child;
            }
        };
        object.augmented = true;
    }
    return object;
}
export {
    augmentObject,
    err,
    log,
    warn
};

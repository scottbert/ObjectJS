/*global $*/
/**
 * @author scottvanlooy
 */


var
    OBJMIXINS,
    that;

function getAttr(str, attr) {
    return (str.split(new RegExp('\\b' + attr + '='))[1] || '').split('&')[0];
}
function $UI(object) {
    var i;
    for (i in OBJMIXINS) {
        if (OBJMIXINS.hasOwnProperty(i)) {
            object[i] = OBJMIXINS[i];
        }
    }
}
function $Controller(Controller) {
    Controller.createXHR = Controller.createJSONP = function (jsonp) {
        if (jsonp) {
            return {
                open : function (options) {
                    options.dataType = 'jsonp';
                    if (typeof jsonp === 'string') {
                        if (typeof window[jsonp] !== 'function') {
                            window[jsonp] = function (obj) {
                                options.success(obj);
                                delete window[jsonp];
                            };
                        }
                    }
                    $.ajax(options);
                }
            };
        }
        return {
            open: function (options) {
                $.ajax(options);
            }
        };
    };
}
OBJMIXINS = {
    init: true,
    superOpen: function (callback) {
        that = that || this;
        that.domNode.show();
        return (callback) ? callback() : null;
    },
    superClose: function (callback) {
        that = that || this;
        that.domNode.hide();
        return (callback) ? callback() : null;
    },
    on: function () {
        that = that || this;
        that.domNode.show();
    },
    off: function () {
        that = that || this;
        that.domNode.hide();
    }
};

export default {
    UI: $UI,
    Selector: $,
    Controller: $Controller,
    jQuery: true,
    getAttr: getAttr
};

/**
 * @author Scott van Looy
 */

import {augmentObject} from './Shared';

function baseUI(mixin) {

    let BaseUI = augmentObject({});

    function f(fn) {
        return (typeof fn === 'function');
    }

    /** API METHODS **/
    /**
     * Sets the root dom node that the library uses to find other dom nodes when generating UI components. Defaults to body.
     * @param {String|Object} domNode the selector for the domNode
     */
    BaseUI.setRootDomNode = function setRootDomNode(domNode) {
        BaseUI.root = mixin.Selector(domNode);
    };
    /**
     * Sets up a UI, caches its domnode and prepares it for use.
     * @param {String|Object} id - the dom ID, className or jQuery object of the root element for the UI.
     */
    BaseUI.setupUI = function setupUI(id) {
        var self = this;
        function setup() {
            self.domNode = (BaseUI.root) ? BaseUI.root.find(id) : mixin.Selector(id);
            self.contentNode = self.domNode.find('.content');
            self.titleNode = self.domNode.find('.title');
            self.templateNode = self.domNode.find('.template').remove();
            self.footerNode = self.domNode.find('.footer');
        }
        if (!self.init) {
            mixin.UI(self);
        }
        setup();
    };
    /**
     * Sets the active view on a UI object
     * @param {Object} view a reference to the view we wish to set on the UI object.
     */
    BaseUI.setView = function setView(view) {
        this.view = view;
    };
    /**
     * Gets a reference to the currently set view on a UI object
     * @return {Object} a reference to the currently set view
     */
    BaseUI.getView = function getView() {
        return this.view;
    };
    /**
     *
     * Opens a UI object. Adds a class of "open" to the UI's domNode. Either animate using CSS3
     * or override this to create a Javascript animation.
     * @param  {Object} obj A reference to the UI object
     * @return {Object}     a reference to the UI object (for chaining).
     */
    BaseUI.open = function open(obj) {
        obj = obj || this;
        obj.domNode.addClass('open');
        obj.isOpen = true;
        return obj;
    };
    /**
     * Closes a UI object. Removes the class "open" from the UI's domNode. Either animate using CSS3 or override
     * this to create a Javascript animation.
     * @param  {Function} [cb] Callback to run when the close is complete.
     * @return {Object}     a reference to the UI object (for chaining).
     */
    BaseUI.close = function close(cb) {
        this.domNode.removeClass('open');
        this.isOpen = false;
        if (cb && f(cb)) {
            cb();
        }
        return this;
    };
    /**
     * Returns the contentNode for a UI.
     * @return {Object} a .content node or the domNode of the UI in question.
     */
    BaseUI.getContentNode = function () {
        return this.contentNode;
    };
    /**
     * Add methods to the UI object you're creating. Automatically create super methods when the object you're
     * passing in contains thesame methods as its parent.
     * @param {Object} options Object containing the methods you wish to add to the host object.
     */
    BaseUI.addMethods = function (options) {
        var method,
            args;
        for (method in options) {
            if (options.hasOwnProperty(method) && typeof method === 'function') {
                if (!this[method]) {
                    this[method] = options[method];
                } else {
                    options['super' + method] = this[method];
                    this[method] = function () {
                        if (arguments.length === 1) {
                            args = arguments[0];
                        } else {
                            args = arguments;
                        }
                        options[method](args);
                        options['super' + method](args);
                    };
                }
            }
        }
    };
    /**
     * Takes an object and extends it with the BaseUI
     * @param {Object} object to extend;
     * @return {Object} extended object
     */
    BaseUI.createUI = BaseUI.extend.curry(undefined, BaseUI);
    return BaseUI;
}
export default baseUI;

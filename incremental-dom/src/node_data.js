/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/node_data.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.node_data');
var module = module || { id: 'src/node_data.ts' };
goog.require('tslib');
var tsickle_types_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
var tsickle_assertions_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.assertions");
var tsickle_util_3 = goog.requireType("google3.third_party.javascript.incremental_dom.src.util");
var tsickle_dom_util_4 = goog.requireType("google3.third_party.javascript.incremental_dom.src.dom_util");
var tsickle_global_5 = goog.requireType("google3.third_party.javascript.incremental_dom.src.global");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var assertions_1 = goog.require('google3.third_party.javascript.incremental_dom.src.assertions');
var util_1 = goog.require('google3.third_party.javascript.incremental_dom.src.util');
var dom_util_1 = goog.require('google3.third_party.javascript.incremental_dom.src.dom_util');
var global_1 = goog.require('google3.third_party.javascript.incremental_dom.src.global');
/**
 * Keeps track of information needed to perform diffs for a given DOM node.
 */
var /**
 * Keeps track of information needed to perform diffs for a given DOM node.
 */
NodeData = /** @class */ (function () {
    function NodeData(nameOrCtor, key, text) {
        /**
         * An array of attribute name/value pairs, used for quickly diffing the
         * incomming attributes to see if the DOM node's attributes need to be
         * updated.
         */
        this._attrsArr = null;
        /**
         * Whether or not the statics have been applied for the node yet.
         */
        this.staticsApplied = false;
        this.alwaysDiffAttributes = false;
        this.nameOrCtor = nameOrCtor;
        this.key = key;
        this.text = text;
    }
    /**
     * @public
     * @return {boolean}
     */
    NodeData.prototype.hasEmptyAttrsArr = /**
     * @public
     * @return {boolean}
     */
    function () {
        /** @type {(null|!Array<?>)} */
        var attrs = this._attrsArr;
        return !attrs || !attrs.length;
    };
    /**
     * @public
     * @param {number} length
     * @return {!Array<?>}
     */
    NodeData.prototype.getAttrsArr = /**
     * @public
     * @param {number} length
     * @return {!Array<?>}
     */
    function (length) {
        return this._attrsArr || (this._attrsArr = (0, util_1.createArray)(length));
    };
    return NodeData;
}());
exports.NodeData = NodeData;
/* istanbul ignore if */
if (false) {
    /**
     * An array of attribute name/value pairs, used for quickly diffing the
     * incomming attributes to see if the DOM node's attributes need to be
     * updated.
     * @type {(null|!Array<?>)}
     * @private
     */
    NodeData.prototype._attrsArr;
    /**
     * Whether or not the statics have been applied for the node yet.
     * @type {boolean}
     * @public
     */
    NodeData.prototype.staticsApplied;
    /**
     * The key used to identify this node, used to preserve DOM nodes when they
     * move within their parent.
     * @const {(undefined|null|string|number)}
     * @public
     */
    NodeData.prototype.key;
    /**
     * The previous text value, for Text nodes.
     * @type {(undefined|string)}
     * @public
     */
    NodeData.prototype.text;
    /**
     * The nodeName or contructor for the Node.
     * @const {(string|!tsickle_types_1.ElementConstructor)}
     * @public
     */
    NodeData.prototype.nameOrCtor;
    /**
     * @type {boolean}
     * @public
     */
    NodeData.prototype.alwaysDiffAttributes;
}
/**
 * Initializes a NodeData object for a Node.
 * @param {!Node} node The Node to initialized data for.
 * @param {(string|!tsickle_types_1.ElementConstructor)} nameOrCtor The NameOrCtorDef to use when diffing.
 * @param {(undefined|null|string|number)} key The Key for the Node.
 * @param {(undefined|string)=} text The data of a Text node, if importing a Text node.
 * @return {!NodeData} A NodeData object with the existing attributes initialized.
 */
function initData(node, nameOrCtor, key, text) {
    /** @type {!NodeData} */
    var data = new NodeData(nameOrCtor, key, text);
    node["__incrementalDOMData"] = data;
    return data;
}
exports.initData = initData;
/**
 * @param {!Node} node The node to check.
 * @return {boolean} True if the NodeData already exists, false otherwise.
 */
function isDataInitialized(node) {
    return Boolean(node["__incrementalDOMData"]);
}
exports.isDataInitialized = isDataInitialized;
/**
 * Records the element's attributes.
 * @param {!Element} node The Element that may have attributes
 * @param {!NodeData} data The Element's data
 * @return {void}
 */
function recordAttributes(node, data) {
    /** @type {!NamedNodeMap} */
    var attributes = node.attributes;
    /** @type {number} */
    var length = attributes.length;
    if (!length) {
        return;
    }
    /** @type {!Array<?>} */
    var attrsArr = data.getAttrsArr(length);
    // Use a cached length. The attributes array is really a live NamedNodeMap,
    // which exists as a DOM "Host Object" (probably as C++ code). This makes the
    // usual constant length iteration very difficult to optimize in JITs.
    for (var i = 0, j = 0; i < length; i += 1, j += 2) {
        /** @type {!Attr} */
        var attr = attributes[i];
        /** @type {string} */
        var name_1 = attr.name;
        /** @type {string} */
        var value = attr.value;
        attrsArr[j] = name_1;
        attrsArr[j + 1] = value;
    }
}
/**
 * Imports single node and its subtree, initializing caches, if it has not
 * already been imported.
 * @param {!Node} node The node to import.
 * @param {(undefined|null|string|number)=} fallbackKey A key to use if importing and no key was specified.
 *    Useful when not transmitting keys from serverside render and doing an
 *    immediate no-op diff.
 * @return {!NodeData} The NodeData for the node.
 */
function importSingleNode(node, fallbackKey) {
    if (node["__incrementalDOMData"]) {
        return node["__incrementalDOMData"];
    }
    /** @type {string} */
    var nodeName = (0, dom_util_1.isElement)(node) ? node.localName : node.nodeName;
    /** @type {(null|string)} */
    var keyAttrName = (0, global_1.getKeyAttributeName)();
    /** @type {(null|string)} */
    var keyAttr = (0, dom_util_1.isElement)(node) && keyAttrName != null
        ? node.getAttribute(keyAttrName)
        : null;
    /** @type {(undefined|null|string|number)} */
    var key = (0, dom_util_1.isElement)(node) ? keyAttr || fallbackKey : null;
    /** @type {!NodeData} */
    var data = initData(node, nodeName, key);
    if ((0, dom_util_1.isElement)(node)) {
        recordAttributes(node, data);
    }
    return data;
}
/**
 * Imports node and its subtree, initializing caches.
 * @param {!Node} node The Node to import.
 * @return {void}
 */
function importNode(node) {
    importSingleNode(node);
    for (var child = node.firstChild; child; child = child.nextSibling) {
        importNode(child);
    }
}
exports.importNode = importNode;
/**
 * Retrieves the NodeData object for a Node, creating it if necessary.
 * @param {!Node} node The node to get data for.
 * @param {(undefined|null|string|number)=} fallbackKey A key to use if importing and no key was specified.
 *    Useful when not transmitting keys from serverside render and doing an
 *    immediate no-op diff.
 * @return {!NodeData} The NodeData for the node.
 */
function getData(node, fallbackKey) {
    return importSingleNode(node, fallbackKey);
}
exports.getData = getData;
/**
 * Gets the key for a Node. note that the Node should have been imported
 * by now.
 * @param {!Node} node The node to check.
 * @return {(undefined|null|string|number)} The key used to create the node.
 */
function getKey(node) {
    (0, assertions_1.assert)(node["__incrementalDOMData"]);
    return getData(node).key;
}
exports.getKey = getKey;
/**
 * Clears all caches from a node and all of its children.
 * @param {!Node} node The Node to clear the cache for.
 * @return {void}
 */
function clearCache(node) {
    node["__incrementalDOMData"] = null;
    for (var child = node.firstChild; child; child = child.nextSibling) {
        clearCache(child);
    }
}
exports.clearCache = clearCache;

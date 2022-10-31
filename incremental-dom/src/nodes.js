/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/nodes.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('incremental_dom.src.nodes');
var module = module || { id: 'src/nodes.ts' };
goog.require('tslib');
var tsickle_node_data_1 = goog.requireType("incremental_dom.src.node_data");
var tsickle_types_2 = goog.requireType("incremental_dom.src.types");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var node_data_1 = goog.require('incremental_dom.src.node_data');
/**
 * Gets the namespace to create an element (of a given tag) in.
 * @param {string} tag The tag to get the namespace for.
 * @param {(null|!Node)} parent The current parent Node, if any.
 * @return {?} The namespace to use.
 */
function getNamespaceForTag(tag, parent) {
    if (tag === "svg") {
        return "http://www.w3.org/2000/svg";
    }
    if (tag === "math") {
        return "http://www.w3.org/1998/Math/MathML";
    }
    if (parent == null) {
        return null;
    }
    if ((0, node_data_1.getData)(parent).nameOrCtor === "foreignObject") {
        return null;
    }
    // Since TypeScript 4.4 namespaceURI is only defined for Attr and Element
    // nodes. Checking for Element nodes here seems reasonable but breaks SVG
    // rendering in Chrome in certain cases. The cast to any should be removed
    // once we know why this happens.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((/** @type {?} */ (parent))).namespaceURI;
}
/**
 * Creates an Element and initializes the NodeData.
 * @param {!Document} doc The document with which to create the Element.
 * @param {(null|!Node)} parent The parent of new Element.
 * @param {(string|!tsickle_types_2.ElementConstructor)} nameOrCtor The tag or constructor for the Element.
 * @param {(undefined|null|string|number)} key A key to identify the Element.
 * @return {!Element} The newly created Element.
 */
function createElement(doc, parent, nameOrCtor, key) {
    /** @type {?} */
    var el;
    if (typeof nameOrCtor === "function") {
        el = new nameOrCtor();
    }
    else {
        /** @type {?} */
        var namespace = getNamespaceForTag(nameOrCtor, parent);
        if (namespace) {
            el = doc.createElementNS(namespace, nameOrCtor);
        }
        else {
            el = doc.createElement(nameOrCtor);
        }
    }
    (0, node_data_1.initData)(el, nameOrCtor, key);
    return el;
}
exports.createElement = createElement;
/**
 * Creates a Text Node.
 * @param {!Document} doc The document with which to create the Element.
 * @return {!Text} The newly created Text.
 */
function createText(doc) {
    /** @type {!Text} */
    var node = doc.createTextNode("");
    (0, node_data_1.initData)(node, "#text", null);
    return node;
}
exports.createText = createText;

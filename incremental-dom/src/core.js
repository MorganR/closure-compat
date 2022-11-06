/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/core.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.core');
var module = module || { id: 'src/core.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
var tsickle_assertions_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.assertions");
var tsickle_context_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.context");
var tsickle_dom_util_3 = goog.requireType("google3.third_party.javascript.incremental_dom.src.dom_util");
var tsickle_global_4 = goog.requireType("google3.third_party.javascript.incremental_dom.src.global");
var tsickle_node_data_5 = goog.requireType("google3.third_party.javascript.incremental_dom.src.node_data");
var tsickle_nodes_6 = goog.requireType("google3.third_party.javascript.incremental_dom.src.nodes");
var tsickle_types_7 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var assertions_1 = goog.require('google3.third_party.javascript.incremental_dom.src.assertions');
var context_1 = goog.require('google3.third_party.javascript.incremental_dom.src.context');
var dom_util_1 = goog.require('google3.third_party.javascript.incremental_dom.src.dom_util');
var global_1 = goog.require('google3.third_party.javascript.incremental_dom.src.global');
var node_data_1 = goog.require('google3.third_party.javascript.incremental_dom.src.node_data');
var nodes_1 = goog.require('google3.third_party.javascript.incremental_dom.src.nodes');
/**
 * The default match function to use, if one was not specified when creating
 * the patcher.
 * @param {!Node} matchNode The node to match against, unused.
 * @param {(string|!tsickle_types_7.ElementConstructor)} nameOrCtor The name or constructor as declared.
 * @param {(string|!tsickle_types_7.ElementConstructor)} expectedNameOrCtor The name or constructor of the existing node.
 * @param {(undefined|null|string|number)} key The key as declared.
 * @param {(undefined|null|string|number)} expectedKey The key of the existing node.
 * @return {boolean} True if the node matches, false otherwise.
 */
function defaultMatchFn(matchNode, nameOrCtor, expectedNameOrCtor, key, expectedKey) {
    // Key check is done using double equals as we want to treat a null key the
    // same as undefined. This should be okay as the only values allowed are
    // strings, null and undefined so the == semantics are not too weird.
    return nameOrCtor == expectedNameOrCtor && key == expectedKey;
}
/** @type {(null|!tsickle_context_2.Context)} */
var context = null;
/** @type {(null|!Node)} */
var currentNode = null;
/** @type {(null|!Node)} */
var currentParent = null;
/** @type {(null|!Document)} */
var doc = null;
/** @type {!Array<!Node>} */
var focusPath = [];
/** @type {function(!Node, (string|!tsickle_types_7.ElementConstructor), (string|!tsickle_types_7.ElementConstructor), (undefined|null|string|number), (undefined|null|string|number)): boolean} */
var matchFn = defaultMatchFn;
/**
 * Used to build up call arguments. Each patch call gets a separate copy, so
 * this works with nested calls to patch.
 * @type {!Array<(undefined|null|*)>}
 */
var argsBuilder = [];
/**
 * Used to build up attrs for the an element.
 * @type {!Array<?>}
 */
var attrsBuilder = [];
/**
 * TODO(sparhami) We should just export argsBuilder directly when Closure
 * Compiler supports ES6 directly.
 * @return {!Array<?>} The Array used for building arguments.
 */
function getArgsBuilder() {
    return argsBuilder;
}
exports.getArgsBuilder = getArgsBuilder;
/**
 * TODO(sparhami) We should just export attrsBuilder directly when Closure
 * Compiler supports ES6 directly.
 * @return {!Array<?>} The Array used for building arguments.
 */
function getAttrsBuilder() {
    return attrsBuilder;
}
exports.getAttrsBuilder = getAttrsBuilder;
/**
 * Checks whether or not the current node matches the specified nameOrCtor and
 * key. This uses the specified match function when creating the patcher.
 * @param {!Node} matchNode A node to match the data to.
 * @param {(string|!tsickle_types_7.ElementConstructor)} nameOrCtor The name or constructor to check for.
 * @param {(undefined|null|string|number)} key The key used to identify the Node.
 * @return {boolean} True if the node matches, false otherwise.
 */
function matches(matchNode, nameOrCtor, key) {
    /** @type {!tsickle_node_data_5.NodeData} */
    var data = (0, node_data_1.getData)(matchNode, key);
    return matchFn(matchNode, nameOrCtor, data.nameOrCtor, key, data.key);
}
/**
 * Finds the matching node, starting at `node` and looking at the subsequent
 * siblings if a key is used.
 * @param {(null|!Node)} matchNode The node to start looking at.
 * @param {(string|!tsickle_types_7.ElementConstructor)} nameOrCtor The name or constructor for the Node.
 * @param {(undefined|null|string|number)} key The key used to identify the Node.
 * @return {(null|!Node)} The matching Node, if any exists.
 */
function getMatchingNode(matchNode, nameOrCtor, key) {
    if (!matchNode) {
        return null;
    }
    /** @type {(null|!Node)} */
    var cur = matchNode;
    do {
        if (matches(cur, nameOrCtor, key)) {
            return cur;
        }
    } while (key && (cur = cur.nextSibling));
    return null;
}
/**
 * Updates the internal structure of a DOM node in the case that an external
 * framework tries to modify a DOM element.
 * @param {!Element} el The DOM node to update.
 * @return {void}
 */
function alwaysDiffAttributes(el) {
    (0, node_data_1.getData)(el).alwaysDiffAttributes = true;
}
exports.alwaysDiffAttributes = alwaysDiffAttributes;
/**
 * Clears out any unvisited Nodes in a given range.
 * @param {(null|!Node)} maybeParentNode
 * @param {(null|!Node)} startNode The node to start clearing from, inclusive.
 * @param {(null|!Node)} endNode The node to clear until, exclusive.
 * @return {void}
 */
function clearUnvisitedDOM(maybeParentNode, startNode, endNode) {
    /** @type {!Node} */
    var parentNode = (/** @type {!Node} */ (maybeParentNode));
    /** @type {(null|!Node)} */
    var child = startNode;
    while (child !== endNode) {
        /** @type {(null|!ChildNode)} */
        var next = (/** @type {!Node} */ (child)).nextSibling;
        parentNode.removeChild((/** @type {!Node} */ (child)));
        (/** @type {!tsickle_context_2.Context} */ (context)).markDeleted((/** @type {!Node} */ (child)));
        child = next;
    }
}
/**
 * @return {(null|!Node)} The next Node to be patched.
 */
function getNextNode() {
    if (currentNode) {
        return currentNode.nextSibling;
    }
    else {
        return (/** @type {!Node} */ (currentParent)).firstChild;
    }
}
/**
 * Changes to the first child of the current node.
 * @return {void}
 */
function enterNode() {
    currentParent = currentNode;
    currentNode = null;
}
/**
 * Changes to the parent of the current node, removing any unvisited children.
 * @return {void}
 */
function exitNode() {
    clearUnvisitedDOM(currentParent, getNextNode(), null);
    currentNode = currentParent;
    currentParent = (/** @type {!Node} */ (currentParent)).parentNode;
}
/**
 * Changes to the next sibling of the current node.
 * @return {void}
 */
function nextNode() {
    currentNode = getNextNode();
}
exports.skipNode = nextNode;
/**
 * Creates a Node and marking it as created.
 * @param {(string|!tsickle_types_7.ElementConstructor)} nameOrCtor The name or constructor for the Node.
 * @param {(undefined|null|string|number)} key The key used to identify the Node.
 * @param {(undefined|string)=} nonce The nonce attribute for the element.
 * @return {!Node} The newly created node.
 */
function createNode(nameOrCtor, key, nonce) {
    /** @type {?} */
    var node;
    if (nameOrCtor === "#text") {
        node = (0, nodes_1.createText)((/** @type {!Document} */ (doc)));
    }
    else {
        node = (0, nodes_1.createElement)((/** @type {!Document} */ (doc)), (/** @type {!Node} */ (currentParent)), nameOrCtor, key);
        if (nonce) {
            node.setAttribute("nonce", nonce);
        }
    }
    (/** @type {!tsickle_context_2.Context} */ (context)).markCreated(node);
    return node;
}
/**
 * Aligns the virtual Node definition with the actual DOM, moving the
 * corresponding DOM node to the correct location or creating it if necessary.
 * @param {(string|!tsickle_types_7.ElementConstructor)} nameOrCtor The name or constructor for the Node.
 * @param {(undefined|null|string|number)} key The key used to identify the Node.
 * @param {(undefined|string)=} nonce The nonce attribute for the element.
 * @return {void}
 */
function alignWithDOM(nameOrCtor, key, nonce) {
    nextNode();
    /** @type {(null|!Node)} */
    var existingNode = getMatchingNode(currentNode, nameOrCtor, key);
    /** @type {!Node} */
    var node = existingNode || createNode(nameOrCtor, key, nonce);
    // If we are at the matching node, then we are done.
    if (node === currentNode) {
        return;
    }
    // Re-order the node into the right position, preserving focus if either
    // node or currentNode are focused by making sure that they are not detached
    // from the DOM.
    if (focusPath.indexOf(node) >= 0) {
        // Move everything else before the node.
        (0, dom_util_1.moveBefore)((/** @type {!Node} */ (currentParent)), node, currentNode);
    }
    else {
        (/** @type {!Node} */ (currentParent)).insertBefore(node, currentNode);
    }
    currentNode = node;
}
exports.alignWithDOM = alignWithDOM;
/**
 * Makes sure that the current node is an Element with a matching nameOrCtor and
 * key.
 *
 * @param {(string|!tsickle_types_7.ElementConstructor)} nameOrCtor The tag or constructor for the Element.
 * @param {(undefined|null|string|number)=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {(undefined|string)=} nonce The nonce attribute for the element.
 * @return {!HTMLElement} The corresponding Element.
 */
function open(nameOrCtor, key, nonce) {
    alignWithDOM(nameOrCtor, key, nonce);
    enterNode();
    return (/** @type {!HTMLElement} */ (currentParent));
}
exports.open = open;
/**
 * Closes the currently open Element, removing any unvisited children if
 * necessary.
 * @return {!Element} The Element that was just closed.
 */
function close() {
    if (global_1.DEBUG) {
        (0, assertions_1.setInSkip)(false);
    }
    exitNode();
    return (/** @type {!Element} */ (currentNode));
}
exports.close = close;
/**
 * Makes sure the current node is a Text node and creates a Text node if it is
 * not.
 * @return {!Text} The Text node that was aligned or created.
 */
function text() {
    alignWithDOM("#text", null);
    return (/** @type {!Text} */ (currentNode));
}
exports.text = text;
/**
 * @return {!Element} The current Element being patched.
 */
function currentElement() {
    if (global_1.DEBUG) {
        (0, assertions_1.assertInPatch)("currentElement");
        (0, assertions_1.assertNotInAttributes)("currentElement");
    }
    return (/** @type {!Element} */ (currentParent));
}
exports.currentElement = currentElement;
/**
 * @return {(null|!Element)} The current Element being patched, or null if no patch is in progress.
 */
function tryGetCurrentElement() {
    return (/** @type {(null|!Element)} */ (currentParent));
}
exports.tryGetCurrentElement = tryGetCurrentElement;
/**
 * @return {!Node} The Node that will be evaluated for the next instruction.
 */
function currentPointer() {
    if (global_1.DEBUG) {
        (0, assertions_1.assertInPatch)("currentPointer");
        (0, assertions_1.assertNotInAttributes)("currentPointer");
    }
    // TODO(tomnguyen): assert that this is not null
    return (/** @type {!Node} */ (getNextNode()));
}
exports.currentPointer = currentPointer;
/**
 * @return {(null|!tsickle_context_2.Context)}
 */
function currentContext() {
    return context;
}
exports.currentContext = currentContext;
/**
 * Skips the children in a subtree, allowing an Element to be closed without
 * clearing out the children.
 * @return {void}
 */
function skip() {
    if (global_1.DEBUG) {
        (0, assertions_1.assertNoChildrenDeclaredYet)("skip", currentNode);
        (0, assertions_1.setInSkip)(true);
    }
    currentNode = (/** @type {!Node} */ (currentParent)).lastChild;
}
exports.skip = skip;
/**
 * Returns a patcher function that sets up and restores a patch context,
 * running the run function with the provided data.
 * @template T, R
 * @param {function((!Element|!DocumentFragment), function((undefined|T)): void, (undefined|T)=): R} run The function that will run the patch.
 * @param {!tsickle_types_7.PatchConfig=} patchConfig The configuration to use for the patch.
 * @return {function((!Element|!DocumentFragment), function((undefined|T)): void, (undefined|T)=): R} The created patch function.
 */
function createPatcher(run, patchConfig) {
    if (patchConfig === void 0) { patchConfig = {}; }
    var _a = patchConfig.matches, matches = _a === void 0 ? defaultMatchFn : _a;
    /** @type {function((!Element|!DocumentFragment), function((undefined|T)): void, (undefined|T)=): R} */
    var f = (/**
     * @param {(!Element|!DocumentFragment)} node
     * @param {function((undefined|T)): void} fn
     * @param {(undefined|T)} data
     * @return {R}
     */
    function (node, fn, data) {
        /** @type {(null|!tsickle_context_2.Context)} */
        var prevContext = context;
        /** @type {(null|!Document)} */
        var prevDoc = doc;
        /** @type {!Array<!Node>} */
        var prevFocusPath = focusPath;
        /** @type {!Array<(undefined|null|*)>} */
        var prevArgsBuilder = argsBuilder;
        /** @type {!Array<?>} */
        var prevAttrsBuilder = attrsBuilder;
        /** @type {(null|!Node)} */
        var prevCurrentNode = currentNode;
        /** @type {(null|!Node)} */
        var prevCurrentParent = currentParent;
        /** @type {function(!Node, (string|!tsickle_types_7.ElementConstructor), (string|!tsickle_types_7.ElementConstructor), (undefined|null|string|number), (undefined|null|string|number)): boolean} */
        var prevMatchFn = matchFn;
        /** @type {boolean} */
        var previousInAttributes = false;
        /** @type {boolean} */
        var previousInSkip = false;
        doc = node.ownerDocument;
        context = new context_1.Context(node);
        matchFn = matches;
        argsBuilder = [];
        attrsBuilder = [];
        currentNode = null;
        currentParent = node.parentNode;
        focusPath = (0, dom_util_1.getFocusedPath)(node, currentParent);
        if (global_1.DEBUG) {
            previousInAttributes = (0, assertions_1.setInAttributes)(false);
            previousInSkip = (0, assertions_1.setInSkip)(false);
            (0, assertions_1.updatePatchContext)(context);
        }
        try {
            /** @type {R} */
            var retVal = run(node, fn, data);
            if (global_1.DEBUG) {
                (0, assertions_1.assertVirtualAttributesClosed)();
            }
            return retVal;
        }
        finally {
            context.notifyChanges();
            doc = prevDoc;
            context = prevContext;
            matchFn = prevMatchFn;
            argsBuilder = prevArgsBuilder;
            attrsBuilder = prevAttrsBuilder;
            currentNode = prevCurrentNode;
            currentParent = prevCurrentParent;
            focusPath = prevFocusPath;
            // Needs to be done after assertions because assertions rely on state
            // from these methods.
            if (global_1.DEBUG) {
                (0, assertions_1.setInAttributes)(previousInAttributes);
                (0, assertions_1.setInSkip)(previousInSkip);
                (0, assertions_1.updatePatchContext)(context);
            }
        }
    });
    return f;
}
/**
 * Creates a patcher that patches the document starting at node with a
 * provided function. This function may be called during an existing patch operation.
 * @template T
 * @param {(undefined|!tsickle_types_7.PatchConfig)=} patchConfig The config to use for the patch.
 * @return {function((!Element|!DocumentFragment), function((undefined|T)): void, (undefined|T)=): !Node} The created function for patching an Element's children.
 */
function createPatchInner(patchConfig) {
    return createPatcher((/**
     * @param {(!Element|!DocumentFragment)} node
     * @param {function((undefined|T)): void} fn
     * @param {(undefined|T)} data
     * @return {(!Element|!DocumentFragment)}
     */
    function (node, fn, data) {
        currentNode = node;
        enterNode();
        fn(data);
        exitNode();
        if (global_1.DEBUG) {
            (0, assertions_1.assertNoUnclosedTags)(currentNode, node);
        }
        return node;
    }), patchConfig);
}
exports.createPatchInner = createPatchInner;
/**
 * Creates a patcher that patches an Element with the the provided function.
 * Exactly one top level element call should be made corresponding to `node`.
 * @template T
 * @param {(undefined|!tsickle_types_7.PatchConfig)=} patchConfig The config to use for the patch.
 * @return {function((!Element|!DocumentFragment), function((undefined|T)): void, (undefined|T)=): (null|!Node)} The created function for patching an Element.
 */
function createPatchOuter(patchConfig) {
    return createPatcher((/**
     * @param {(!Element|!DocumentFragment)} node
     * @param {function((undefined|T)): void} fn
     * @param {(undefined|T)} data
     * @return {(null|!Node)}
     */
    function (node, fn, data) {
        /** @type {!Element} */
        var startNode = (/** @type {!Element} */ (((/** @type {?} */ ({ nextSibling: node })))));
        /** @type {(null|!Node)} */
        var expectedNextNode = null;
        /** @type {(null|!Node)} */
        var expectedPrevNode = null;
        if (global_1.DEBUG) {
            expectedNextNode = node.nextSibling;
            expectedPrevNode = node.previousSibling;
        }
        currentNode = startNode;
        fn(data);
        if (global_1.DEBUG) {
            if ((0, node_data_1.getData)(node).key) {
                (0, assertions_1.assertPatchOuterHasParentNode)(currentParent);
            }
            (0, assertions_1.assertPatchElementNoExtras)(startNode, currentNode, expectedNextNode, expectedPrevNode);
        }
        if (currentParent) {
            clearUnvisitedDOM(currentParent, getNextNode(), node.nextSibling);
        }
        return startNode === currentNode ? null : currentNode;
    }), patchConfig);
}
exports.createPatchOuter = createPatchOuter;
/** @type {function((!Element|!DocumentFragment), function((undefined|?)): void, (undefined|?)=): !Node} */
var patchInner = createPatchInner();
exports.patchInner = patchInner;
/** @type {function((!Element|!DocumentFragment), function((undefined|?)): void, (undefined|?)=): (null|!Node)} */
var patchOuter = createPatchOuter();
exports.patchOuter = patchOuter;

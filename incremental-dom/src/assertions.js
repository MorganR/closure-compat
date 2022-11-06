/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/assertions.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.assertions');
var module = module || { id: 'src/assertions.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
var tsickle_global_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.global");
var tsickle_types_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
//  Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var global_1 = goog.require('google3.third_party.javascript.incremental_dom.src.global');
/**
 * Keeps track whether or not we are in an attributes declaration (after
 * elementOpenStart, but before elementOpenEnd).
 * @type {boolean}
 */
var inAttributes = false;
/**
 * Keeps track whether or not we are in an element that should not have its
 * children cleared.
 * @type {boolean}
 */
var inSkip = false;
/**
 * Keeps track of whether or not we are in a patch.
 * @type {boolean}
 */
var inPatch = false;
/**
 * Asserts that a value exists and is not null or undefined. goog.asserts
 * is not used in order to avoid dependencies on external code.
 * @template T
 * @param {(undefined|null|T)} val The value to assert is truthy.
 * @return {T} The value.
 */
function assert(val) {
    if (global_1.DEBUG && !val) {
        throw new Error("Expected value to be defined");
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (/** @type {T} */ (val));
}
exports.assert = assert;
/**
 * Makes sure that there is a current patch context.
 * @param {string} functionName The name of the caller, for the error message.
 * @return {void}
 */
function assertInPatch(functionName) {
    if (!inPatch) {
        throw new Error("Cannot call " + functionName + "() unless in patch.");
    }
}
exports.assertInPatch = assertInPatch;
/**
 * Makes sure that a patch closes every node that it opened.
 * @param {(null|!Node)} openElement
 * @param {(!Node|!DocumentFragment)} root
 * @return {void}
 */
function assertNoUnclosedTags(openElement, root) {
    if (openElement === root) {
        return;
    }
    /** @type {(null|!Node)} */
    var currentElement = openElement;
    /** @type {!Array<string>} */
    var openTags = [];
    while (currentElement && currentElement !== root) {
        openTags.push(currentElement.nodeName.toLowerCase());
        currentElement = currentElement.parentNode;
    }
    throw new Error("One or more tags were not closed:\n" + openTags.join("\n"));
}
exports.assertNoUnclosedTags = assertNoUnclosedTags;
/**
 * Makes sure that node being outer patched has a parent node.
 * @param {(null|!Node)} parent
 * @return {void}
 */
function assertPatchOuterHasParentNode(parent) {
    if (!parent) {
        console.warn("patchOuter requires the node have a parent if there is a key.");
    }
}
exports.assertPatchOuterHasParentNode = assertPatchOuterHasParentNode;
/**
 * Makes sure that the caller is not where attributes are expected.
 * @param {string} functionName The name of the caller, for the error message.
 * @return {void}
 */
function assertNotInAttributes(functionName) {
    if (inAttributes) {
        throw new Error(functionName +
            "() can not be called between " +
            "elementOpenStart() and elementOpenEnd().");
    }
}
exports.assertNotInAttributes = assertNotInAttributes;
/**
 * Makes sure that the caller is not inside an element that has declared skip.
 * @param {string} functionName The name of the caller, for the error message.
 * @return {void}
 */
function assertNotInSkip(functionName) {
    if (inSkip) {
        throw new Error(functionName +
            "() may not be called inside an element " +
            "that has called skip().");
    }
}
exports.assertNotInSkip = assertNotInSkip;
/**
 * Makes sure that the caller is where attributes are expected.
 * @param {string} functionName The name of the caller, for the error message.
 * @return {void}
 */
function assertInAttributes(functionName) {
    if (!inAttributes) {
        throw new Error(functionName +
            "() can only be called after calling " +
            "elementOpenStart().");
    }
}
exports.assertInAttributes = assertInAttributes;
/**
 * Makes sure the patch closes virtual attributes call
 * @return {void}
 */
function assertVirtualAttributesClosed() {
    if (inAttributes) {
        throw new Error("elementOpenEnd() must be called after calling " + "elementOpenStart().");
    }
}
exports.assertVirtualAttributesClosed = assertVirtualAttributesClosed;
/**
 * Makes sure that tags are correctly nested.
 * @param {(string|!tsickle_types_2.ElementConstructor)} currentNameOrCtor
 * @param {(string|!tsickle_types_2.ElementConstructor)} nameOrCtor
 * @return {void}
 */
function assertCloseMatchesOpenTag(currentNameOrCtor, nameOrCtor) {
    if (currentNameOrCtor !== nameOrCtor) {
        throw new Error('Received a call to close "' +
            nameOrCtor +
            '" but "' +
            currentNameOrCtor +
            '" was open.');
    }
}
exports.assertCloseMatchesOpenTag = assertCloseMatchesOpenTag;
/**
 * Makes sure that no children elements have been declared yet in the current
 * element.
 * @param {string} functionName The name of the caller, for the error message.
 * @param {(null|!Node)} previousNode
 * @return {void}
 */
function assertNoChildrenDeclaredYet(functionName, previousNode) {
    if (previousNode !== null) {
        throw new Error(functionName +
            "() must come before any child " +
            "declarations inside the current element.");
    }
}
exports.assertNoChildrenDeclaredYet = assertNoChildrenDeclaredYet;
/**
 * Checks that a call to patchOuter actually patched the element.
 * @param {(null|!Node)} maybeStartNode The value for the currentNode when the patch
 *     started.
 * @param {(null|!Node)} maybeCurrentNode The currentNode when the patch finished.
 * @param {(null|!Node)} expectedNextNode The Node that is expected to follow the
 *    currentNode after the patch;
 * @param {(null|!Node)} expectedPrevNode The Node that is expected to preceed the
 *    currentNode after the patch.
 * @return {void}
 */
function assertPatchElementNoExtras(maybeStartNode, maybeCurrentNode, expectedNextNode, expectedPrevNode) {
    /** @type {!Node} */
    var startNode = assert(maybeStartNode);
    /** @type {!Node} */
    var currentNode = assert(maybeCurrentNode);
    /** @type {boolean} */
    var wasUpdated = currentNode.nextSibling === expectedNextNode &&
        currentNode.previousSibling === expectedPrevNode;
    /** @type {boolean} */
    var wasChanged = currentNode.nextSibling === startNode.nextSibling &&
        currentNode.previousSibling === expectedPrevNode;
    /** @type {boolean} */
    var wasRemoved = currentNode === startNode;
    if (!wasUpdated && !wasChanged && !wasRemoved) {
        throw new Error("There must be exactly one top level call corresponding " +
            "to the patched element.");
    }
}
exports.assertPatchElementNoExtras = assertPatchElementNoExtras;
/**
 * @param {(null|*)} newContext The current patch context.
 * @return {void}
 */
function updatePatchContext(newContext) {
    inPatch = newContext != null;
}
exports.updatePatchContext = updatePatchContext;
/**
 * Updates the state of being in an attribute declaration.
 * @param {boolean} value Whether or not the patch is in an attribute declaration.
 * @return {boolean} the previous value.
 */
function setInAttributes(value) {
    /** @type {boolean} */
    var previous = inAttributes;
    inAttributes = value;
    return previous;
}
exports.setInAttributes = setInAttributes;
/**
 * Updates the state of being in a skip element.
 * @param {boolean} value Whether or not the patch is skipping the children of a
 *    parent node.
 * @return {boolean} the previous value.
 */
function setInSkip(value) {
    /** @type {boolean} */
    var previous = inSkip;
    inSkip = value;
    return previous;
}
exports.setInSkip = setInSkip;

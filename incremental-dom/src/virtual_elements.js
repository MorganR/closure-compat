/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/virtual_elements.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.virtual_elements');
var module = module || { id: 'src/virtual_elements.ts' };
goog.require('tslib');
var tsickle_assertions_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.assertions");
var tsickle_attributes_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.attributes");
var tsickle_core_3 = goog.requireType("google3.third_party.javascript.incremental_dom.src.core");
var tsickle_global_4 = goog.requireType("google3.third_party.javascript.incremental_dom.src.global");
var tsickle_node_data_5 = goog.requireType("google3.third_party.javascript.incremental_dom.src.node_data");
var tsickle_types_6 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
var tsickle_util_7 = goog.requireType("google3.third_party.javascript.incremental_dom.src.util");
var tsickle_diff_8 = goog.requireType("google3.third_party.javascript.incremental_dom.src.diff");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var assertions_1 = goog.require('google3.third_party.javascript.incremental_dom.src.assertions');
var attributes_1 = goog.require('google3.third_party.javascript.incremental_dom.src.attributes');
var core_1 = goog.require('google3.third_party.javascript.incremental_dom.src.core');
var global_1 = goog.require('google3.third_party.javascript.incremental_dom.src.global');
var node_data_1 = goog.require('google3.third_party.javascript.incremental_dom.src.node_data');
var util_1 = goog.require('google3.third_party.javascript.incremental_dom.src.util');
var diff_1 = goog.require('google3.third_party.javascript.incremental_dom.src.diff');
/**
 * The offset in the virtual element declaration where the attributes are
 * specified.
 * @type {number}
 */
var ATTRIBUTES_OFFSET = 3;
/**
 * Used to keep track of the previous values when a 2-way diff is necessary.
 * This object is reused.
 * TODO(sparhamI) Scope this to a patch so you can call patch from an attribute
 * update.
 * @type {?}
 */
var prevAttrsMap = (0, util_1.createMap)();
/**
 * @param {!Element} element The Element to diff the attrs for.
 * @param {!tsickle_node_data_5.NodeData} data The NodeData associated with the Element.
 * @param {!tsickle_types_6.AttrMutatorConfig} attrs The attribute map of mutators
 * @return {void}
 */
function diffAttrs(element, data, attrs) {
    /** @type {!Array<?>} */
    var attrsBuilder = (0, core_1.getAttrsBuilder)();
    /** @type {!Array<?>} */
    var prevAttrsArr = data.getAttrsArr(attrsBuilder.length);
    (0, diff_1.calculateDiff)(prevAttrsArr, attrsBuilder, element, attributes_1.updateAttribute, attrs, data.alwaysDiffAttributes);
    (0, util_1.truncateArray)(attrsBuilder, 0);
}
/**
 * Applies the statics. When importing an Element, any existing attributes that
 * match a static are converted into a static attribute.
 * @param {!Element} node The Element to apply statics for.
 * @param {!tsickle_node_data_5.NodeData} data The NodeData associated with the Element.
 * @param {(undefined|null|!Array<*>)} statics The statics array.
 * @param {!tsickle_types_6.AttrMutatorConfig} attrs The attribute map of mutators.
 * @return {void}
 */
function diffStatics(node, data, statics, attrs) {
    if (data.staticsApplied) {
        return;
    }
    data.staticsApplied = true;
    if (!statics || !statics.length) {
        return;
    }
    if (data.hasEmptyAttrsArr()) {
        for (var i = 0; i < statics.length; i += 2) {
            (0, attributes_1.updateAttribute)(node, (/** @type {string} */ (statics[i])), statics[i + 1], attrs);
        }
        return;
    }
    for (var i = 0; i < statics.length; i += 2) {
        prevAttrsMap[(/** @type {string} */ (statics[i]))] = i + 1;
    }
    /** @type {!Array<?>} */
    var attrsArr = data.getAttrsArr(0);
    /** @type {number} */
    var j = 0;
    for (var i = 0; i < attrsArr.length; i += 2) {
        /** @type {?} */
        var name_1 = attrsArr[i];
        /** @type {?} */
        var value = attrsArr[i + 1];
        /** @type {?} */
        var staticsIndex = prevAttrsMap[name_1];
        if (staticsIndex) {
            // For any attrs that are static and have the same value, make sure we do
            // not set them again.
            if (statics[staticsIndex] === value) {
                delete prevAttrsMap[name_1];
            }
            continue;
        }
        // For any attrs that are dynamic, move them up to the right place.
        attrsArr[j] = name_1;
        attrsArr[j + 1] = value;
        j += 2;
    }
    // Anything after `j` was either moved up already or static.
    (0, util_1.truncateArray)(attrsArr, j);
    for (var name_2 in prevAttrsMap) {
        (0, attributes_1.updateAttribute)(node, name_2, statics[prevAttrsMap[name_2]], attrs);
        delete prevAttrsMap[name_2];
    }
}
/**
 * Declares a virtual Element at the current location in the document. This
 * corresponds to an opening tag and a elementClose tag is required. This is
 * like elementOpen, but the attributes are defined using the attr function
 * rather than being passed as arguments. Must be folllowed by 0 or more calls
 * to attr, then a call to elementOpenEnd.
 * @param {(string|!tsickle_types_6.ElementConstructor)} nameOrCtor The Element's tag or constructor.
 * @param {(undefined|null|string|number)=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {(undefined|null|!Array<*>)=} statics An array of attribute name/value pairs of the static
 *     attributes for the Element. Attributes will only be set once when the
 *     Element is created.
 * @return {void}
 */
function elementOpenStart(nameOrCtor, key, statics) {
    /** @type {!Array<?>} */
    var argsBuilder = (0, core_1.getArgsBuilder)();
    if (global_1.DEBUG) {
        (0, assertions_1.assertNotInAttributes)("elementOpenStart");
        (0, assertions_1.setInAttributes)(true);
    }
    argsBuilder[0] = nameOrCtor;
    argsBuilder[1] = key;
    argsBuilder[2] = statics;
}
exports.elementOpenStart = elementOpenStart;
/**
 * Allows you to define a key after an elementOpenStart. This is useful in
 * templates that define key after an element has been opened ie
 * `<div key('foo')></div>`.
 * @param {string} key The key to use for the next call.
 * @return {void}
 */
function key(key) {
    /** @type {!Array<?>} */
    var argsBuilder = (0, core_1.getArgsBuilder)();
    if (global_1.DEBUG) {
        (0, assertions_1.assertInAttributes)("key");
        (0, assertions_1.assert)(argsBuilder);
    }
    argsBuilder[1] = key;
}
exports.key = key;
/**
 * Buffers an attribute, which will get applied during the next call to
 * `elementOpen`, `elementOpenEnd` or `applyAttrs`.
 * @param {string} name The of the attribute to buffer.
 * @param {?} value The value of the attribute to buffer.
 * @return {void}
 */
function attr(name, value) {
    /** @type {!Array<?>} */
    var attrsBuilder = (0, core_1.getAttrsBuilder)();
    if (global_1.DEBUG) {
        (0, assertions_1.assertInPatch)("attr");
    }
    attrsBuilder.push(name);
    attrsBuilder.push(value);
}
exports.attr = attr;
/**
 * @return {string} The value of the nonce attribute.
 */
function getNonce() {
    /** @type {!Array<?>} */
    var argsBuilder = (0, core_1.getArgsBuilder)();
    /** @type {(undefined|null|!Array<*>)} */
    var statics = (/** @type {(undefined|null|!Array<*>)} */ (argsBuilder[2]));
    if (statics) {
        for (var i = 0; i < statics.length; i += 2) {
            if (statics[i] === "nonce") {
                return (/** @type {string} */ (statics[i + 1]));
            }
        }
    }
    return "";
}
/**
 * Closes an open tag started with elementOpenStart.
 * @return {!HTMLElement} The corresponding Element.
 */
function elementOpenEnd() {
    /** @type {!Array<?>} */
    var argsBuilder = (0, core_1.getArgsBuilder)();
    if (global_1.DEBUG) {
        (0, assertions_1.assertInAttributes)("elementOpenEnd");
        (0, assertions_1.setInAttributes)(false);
    }
    /** @type {!HTMLElement} */
    var node = (0, core_1.open)((/** @type {(string|!tsickle_types_6.ElementConstructor)} */ (argsBuilder[0])), (/** @type {(undefined|null|string|number)} */ (argsBuilder[1])), getNonce());
    /** @type {!tsickle_node_data_5.NodeData} */
    var data = (0, node_data_1.getData)(node);
    diffStatics(node, data, (/** @type {(undefined|null|!Array<*>)} */ (argsBuilder[2])), attributes_1.attributes);
    diffAttrs(node, data, attributes_1.attributes);
    (0, util_1.truncateArray)(argsBuilder, 0);
    return node;
}
exports.elementOpenEnd = elementOpenEnd;
/**
 * @param {(string|!tsickle_types_6.ElementConstructor)} nameOrCtor The Element's tag or constructor.
 * @param {(undefined|null|string|number)=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {(undefined|null|!Array<*>)=} statics An array of attribute name/value pairs of the static
 *     attributes for the Element. Attributes will only be set once when the
 *     Element is created.
 * @param {...?} varArgs
 * @return {!HTMLElement} The corresponding Element.
 */
function elementOpen(nameOrCtor, key, 
// Ideally we could tag statics and varArgs as an array where every odd
// element is a string and every even element is any, but this is hard.
statics) {
    var varArgs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        varArgs[_i - 3] = arguments[_i];
    }
    if (global_1.DEBUG) {
        (0, assertions_1.assertNotInAttributes)("elementOpen");
        (0, assertions_1.assertNotInSkip)("elementOpen");
    }
    elementOpenStart(nameOrCtor, key, statics);
    for (var i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
        attr(arguments[i], arguments[i + 1]);
    }
    return elementOpenEnd();
}
exports.elementOpen = elementOpen;
/**
 * Applies the currently buffered attrs to the currently open element. This
 * clears the buffered attributes.
 * @param {!tsickle_types_6.AttrMutatorConfig=} attrs The attributes.
 * @return {void}
 */
function applyAttrs(attrs) {
    if (attrs === void 0) { attrs = attributes_1.attributes; }
    /** @type {!Element} */
    var node = (0, core_1.currentElement)();
    /** @type {!tsickle_node_data_5.NodeData} */
    var data = (0, node_data_1.getData)(node);
    diffAttrs(node, data, attrs);
}
exports.applyAttrs = applyAttrs;
/**
 * Applies the current static attributes to the currently open element. Note:
 * statics should be applied before calling `applyAtrs`.
 * @param {(undefined|null|!Array<*>)} statics The statics to apply to the current element.
 * @param {!tsickle_types_6.AttrMutatorConfig=} attrs The attributes.
 * @return {void}
 */
function applyStatics(statics, attrs) {
    if (attrs === void 0) { attrs = attributes_1.attributes; }
    /** @type {!Element} */
    var node = (0, core_1.currentElement)();
    /** @type {!tsickle_node_data_5.NodeData} */
    var data = (0, node_data_1.getData)(node);
    diffStatics(node, data, statics, attrs);
}
exports.applyStatics = applyStatics;
/**
 * Closes an open virtual Element.
 *
 * @param {(string|!tsickle_types_6.ElementConstructor)} nameOrCtor The Element's tag or constructor.
 * @return {!Element} The corresponding Element.
 */
function elementClose(nameOrCtor) {
    if (global_1.DEBUG) {
        (0, assertions_1.assertNotInAttributes)("elementClose");
    }
    /** @type {!Element} */
    var node = (0, core_1.close)();
    if (global_1.DEBUG) {
        (0, assertions_1.assertCloseMatchesOpenTag)((0, node_data_1.getData)(node).nameOrCtor, nameOrCtor);
    }
    return node;
}
exports.elementClose = elementClose;
/**
 * Declares a virtual Element at the current location in the document that has
 * no children.
 * @param {(string|!tsickle_types_6.ElementConstructor)} nameOrCtor The Element's tag or constructor.
 * @param {(undefined|null|string|number)=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {(undefined|null|!Array<*>)=} statics An array of attribute name/value pairs of the static
 *     attributes for the Element. Attributes will only be set once when the
 *     Element is created.
 * @param {...?} varArgs Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
function elementVoid(nameOrCtor, key, 
// Ideally we could tag statics and varArgs as an array where every odd
// element is a string and every even element is any, but this is hard.
statics) {
    var varArgs = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        varArgs[_i - 3] = arguments[_i];
    }
    elementOpen.apply(null, (/** @type {?} */ (arguments)));
    return elementClose(nameOrCtor);
}
exports.elementVoid = elementVoid;
/**
 * Declares a virtual Text at this point in the document.
 *
 * @param {(string|number|boolean)} value The value of the Text.
 * @param {...function(*): string} varArgs
 *     Functions to format the value which are called only when the value has
 *     changed.
 * @return {!Text} The corresponding text node.
 */
function text(value) {
    var varArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
    }
    if (global_1.DEBUG) {
        (0, assertions_1.assertNotInAttributes)("text");
        (0, assertions_1.assertNotInSkip)("text");
    }
    /** @type {!Text} */
    var node = (0, core_1.text)();
    /** @type {!tsickle_node_data_5.NodeData} */
    var data = (0, node_data_1.getData)(node);
    if (data.text !== value) {
        data.text = (/** @type {string} */ (value));
        /** @type {(string|number|boolean)} */
        var formatted = value;
        for (var i = 1; i < arguments.length; i += 1) {
            /*
                   * Call the formatter function directly to prevent leaking arguments.
                   * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
                   */
            /** @type {?} */
            var fn = arguments[i];
            formatted = fn(formatted);
        }
        // Setting node.data resets the cursor in IE/Edge.
        if (node.data !== formatted) {
            node.data = (/** @type {string} */ (formatted));
        }
    }
    return node;
}
exports.text = text;

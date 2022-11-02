/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/attributes.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.attributes');
var module = module || { id: 'src/attributes.ts' };
goog.require('tslib');
var tsickle_types_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
var tsickle_assertions_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.assertions");
var tsickle_util_3 = goog.requireType("google3.third_party.javascript.incremental_dom.src.util");
var tsickle_symbols_4 = goog.requireType("google3.third_party.javascript.incremental_dom.src.symbols");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var assertions_1 = goog.require('google3.third_party.javascript.incremental_dom.src.assertions');
var util_1 = goog.require('google3.third_party.javascript.incremental_dom.src.util');
var symbols_1 = goog.require('google3.third_party.javascript.incremental_dom.src.symbols');
/**
 * @param {string} name The name of the attribute. For example "tabindex" or
 *    "xlink:href".
 * @return {(null|string)} The namespace to use for the attribute, or null if there is
 * no namespace.
 */
function getNamespace(name) {
    if (name.lastIndexOf("xml:", 0) === 0) {
        return "http://www.w3.org/XML/1998/namespace";
    }
    if (name.lastIndexOf("xlink:", 0) === 0) {
        return "http://www.w3.org/1999/xlink";
    }
    return null;
}
/**
 * Applies an attribute or property to a given Element. If the value is null
 * or undefined, it is removed from the Element. Otherwise, the value is set
 * as an attribute.
 * @param {!Element} el The element to apply the attribute to.
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value.
 * @return {void}
 */
function applyAttr(el, name, value) {
    if (value == null) {
        el.removeAttribute(name);
    }
    else {
        /** @type {(null|string)} */
        var attrNS = getNamespace(name);
        if (attrNS) {
            el.setAttributeNS(attrNS, name, (/** @type {string} */ (value)));
        }
        else {
            el.setAttribute(name, (/** @type {string} */ (value)));
        }
    }
}
exports.applyAttr = applyAttr;
/**
 * Applies a property to a given Element.
 * @param {!Element} el The element to apply the property to.
 * @param {string} name The property's name.
 * @param {*} value The property's value.
 * @return {void}
 */
function applyProp(el, name, value) {
    ((/** @type {?} */ (el)))[name] = value;
}
exports.applyProp = applyProp;
/**
 * Applies a value to a style declaration. Supports CSS custom properties by
 * setting properties containing a dash using CSSStyleDeclaration.setProperty.
 * @param {!CSSStyleDeclaration} style A style declaration.
 * @param {string} prop The property to apply. This can be either camelcase or dash
 *    separated. For example: "backgroundColor" and "background-color" are both
 *    supported.
 * @param {string} value The value of the property.
 * @return {void}
 */
function setStyleValue(style, prop, value) {
    if (prop.indexOf("-") >= 0) {
        style.setProperty(prop, value);
    }
    else {
        ((/** @type {?} */ (style)))[prop] = value;
    }
}
/**
 * Applies a style to an Element. No vendor prefix expansion is done for
 * property names/values.
 * @param {!Element} el The Element to apply the style for.
 * @param {string} name The attribute's name.
 * @param {(string|!Object<string,string>)} style The style to set. Either a string of css or an object
 *     containing property-value pairs.
 * @return {void}
 */
function applyStyle(el, name, style) {
    // MathML elements inherit from Element, which does not have style. We cannot
    // do `instanceof HTMLElement` / `instanceof SVGElement`, since el can belong
    // to a different document, so just check that it has a style.
    (0, assertions_1.assert)("style" in el);
    /** @type {!CSSStyleDeclaration} */
    var elStyle = ((/** @type {(!HTMLElement|!SVGElement)} */ (el))).style;
    if (typeof style === "string") {
        elStyle.cssText = style;
    }
    else {
        elStyle.cssText = "";
        for (var prop in style) {
            if ((0, util_1.has)(style, prop)) {
                setStyleValue(elStyle, prop, style[prop]);
            }
        }
    }
}
/**
 * Updates a single attribute on an Element.
 * @param {!Element} el The Element to apply the attribute to.
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is an object or
 *     function it is set on the Element, otherwise, it is set as an HTML
 *     attribute.
 * @return {void}
 */
function applyAttributeTyped(el, name, value) {
    /** @type {string} */
    var type = typeof value;
    if (type === "object" || type === "function") {
        applyProp(el, name, value);
    }
    else {
        applyAttr(el, name, value);
    }
}
/**
 * @return {!tsickle_types_1.AttrMutatorConfig}
 */
function createAttributeMap() {
    /** @type {!tsickle_types_1.AttrMutatorConfig} */
    var attributes = (/** @type {!tsickle_types_1.AttrMutatorConfig} */ ((0, util_1.createMap)()));
    // Special generic mutator that's called for any attribute that does not
    // have a specific mutator.
    attributes[symbols_1.symbols.default] = applyAttributeTyped;
    attributes["style"] = applyStyle;
    return attributes;
}
exports.createAttributeMap = createAttributeMap;
/**
 * A publicly mutable object to provide custom mutators for attributes.
 * NB: The result of createMap() has to be recast since closure compiler
 * will just assume attributes is "any" otherwise and throws away
 * the type annotation set by tsickle.
 * @type {!tsickle_types_1.AttrMutatorConfig}
 */
var attributes = createAttributeMap();
exports.attributes = attributes;
/**
 * Calls the appropriate attribute mutator for this attribute.
 * @param {!Element} el The Element to apply the attribute to.
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is an object or
 *     function it is set on the Element, otherwise, it is set as an HTML
 *     attribute.
 * @param {!tsickle_types_1.AttrMutatorConfig} attrs The attribute map of mutators.
 * @return {void}
 */
function updateAttribute(el, name, value, attrs) {
    /** @type {function(!Element, string, ?): void} */
    var mutator = attrs[name] || attrs[symbols_1.symbols.default];
    mutator(el, name, value);
}
exports.updateAttribute = updateAttribute;

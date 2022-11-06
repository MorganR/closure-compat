/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/global.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.global');
var module = module || { id: 'src/global.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
var tsickle_debug_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.debug");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
/**
 * The name of the HTML attribute that holds the element key
 * (e.g. `<div key="foo">`). The attribute value, if it exists, is then used
 * as the default key when importing an element.
 * If null, no attribute value is used as the default key.
 * @type {(null|string)}
 */
var keyAttributeName = "key";
/**
 * @return {(null|string)}
 */
function getKeyAttributeName() {
    return keyAttributeName;
}
exports.getKeyAttributeName = getKeyAttributeName;
/**
 * @param {(null|string)} name
 * @return {void}
 */
function setKeyAttributeName(name) {
    keyAttributeName = name;
}
exports.setKeyAttributeName = setKeyAttributeName;
var debug_1 = goog.require('google3.third_party.javascript.incremental_dom.src.debug');
exports.DEBUG = debug_1.DEBUG;

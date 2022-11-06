/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/util.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
goog.module('google3.third_party.javascript.incremental_dom.src.util');
var module = module || { id: 'src/util.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * A cached reference to the hasOwnProperty function.
 * @type {function((string|number|symbol)): boolean}
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * A constructor function that will create blank objects.
 * @return {void}
 */
function Blank() { }
Blank.prototype = Object.create(null);
/**
 * Used to prevent property collisions between our "map" and its prototype.
 * @param {!Object} map The map to check.
 * @param {string} property The property to check.
 * @return {boolean} Whether map has property.
 */
function has(map, property) {
    return hasOwnProperty.call(map, property);
}
exports.has = has;
/**
 * Creates an map object without a prototype.
 * @return {?} An Object that can be used as a map.
 */
function createMap() {
    return new ((/** @type {?} */ (Blank)))();
}
exports.createMap = createMap;
/**
 * Truncates an array, removing items up until length.
 * @param {!Array<(undefined|null|*)>} arr The array to truncate.
 * @param {number} length The new length of the array.
 * @return {void}
 */
function truncateArray(arr, length) {
    while (arr.length > length) {
        arr.pop();
    }
}
exports.truncateArray = truncateArray;
/**
 * Creates an array for a desired initial size. Note that the array will still
 * be empty.
 * @template T
 * @param {number} initialAllocationSize The initial size to allocate.
 * @return {!Array<T>} An empty array, with an initial allocation for the desired size.
 */
function createArray(initialAllocationSize) {
    /** @type {!Array<?>} */
    var arr = new Array(initialAllocationSize);
    truncateArray(arr, 0);
    return arr;
}
exports.createArray = createArray;

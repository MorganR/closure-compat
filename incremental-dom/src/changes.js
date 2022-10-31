/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/changes.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('incremental_dom.src.changes');
var module = module || { id: 'src/changes.ts' };
goog.require('tslib');
var tsickle_util_1 = goog.requireType("incremental_dom.src.util");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var util_1 = goog.require('incremental_dom.src.util');
/** @type {!Array<?>} */
var buffer = [];
/** @type {number} */
var bufferStart = 0;
/**
 * TODO(tomnguyen): This is a bit silly and really needs to be better typed.
 * @template A, B, C, D
 * @param {function(A, B, C, D): void} fn A function to call.
 * @param {A} a The first argument to the function.
 * @param {B} b The second argument to the function.
 * @param {C} c The third argument to the function.
 * @param {D} d The fourth argument to the function
 * @return {void}
 */
function queueChange(fn, a, b, c, d) {
    buffer.push(fn);
    buffer.push(a);
    buffer.push(b);
    buffer.push(c);
    buffer.push(d);
}
exports.queueChange = queueChange;
/**
 * Flushes the changes buffer, calling the functions for each change.
 * @return {void}
 */
function flush() {
    // A change may cause this function to be called re-entrantly. Keep track of
    // the portion of the buffer we are consuming. Updates the start pointer so
    // that the next call knows where to start from.
    /** @type {number} */
    var start = bufferStart;
    /** @type {number} */
    var end = buffer.length;
    bufferStart = end;
    for (var i = start; i < end; i += 5) {
        /** @type {function(?, ?, ?, ?): undefined} */
        var fn = (/** @type {function(?, ?, ?, ?): undefined} */ (buffer[i]));
        fn(buffer[i + 1], buffer[i + 2], buffer[i + 3], buffer[i + 4]);
    }
    bufferStart = start;
    (0, util_1.truncateArray)(buffer, start);
}
exports.flush = flush;

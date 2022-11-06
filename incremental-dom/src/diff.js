/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/diff.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.diff');
var module = module || { id: 'src/diff.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
var tsickle_types_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
var tsickle_util_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.util");
var tsickle_changes_3 = goog.requireType("google3.third_party.javascript.incremental_dom.src.changes");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var util_1 = goog.require('google3.third_party.javascript.incremental_dom.src.util');
var changes_1 = goog.require('google3.third_party.javascript.incremental_dom.src.changes');
/**
 * Used to keep track of the previous values when a 2-way diff is necessary.
 * This object is cleared out and reused.
 * @type {?}
 */
var prevValuesMap = (0, util_1.createMap)();
/**
 * Calculates the diff between previous and next values, calling the update
 * function when an item has changed value. If an item from the previous values
 * is not present in the the next values, the update function is called with a
 * value of `undefined`.
 * @template T
 * @param {!Array<string>} prev The previous values, alternating name, value pairs.
 * @param {!Array<string>} next The next values, alternating name, value pairs.
 * @param {T} updateCtx The context for the updateFn.
 * @param {function(T, string, (undefined|*), !tsickle_types_1.AttrMutatorConfig): void} updateFn A function to call when a value has changed.
 * @param {!tsickle_types_1.AttrMutatorConfig} attrs Attribute map for mutators
 * @param {boolean=} alwaysDiffAttributes Whether to diff attributes unconditionally
 * @return {void}
 */
function calculateDiff(prev, next, updateCtx, updateFn, attrs, alwaysDiffAttributes) {
    if (alwaysDiffAttributes === void 0) { alwaysDiffAttributes = false; }
    /** @type {boolean} */
    var isNew = !prev.length || alwaysDiffAttributes;
    /** @type {number} */
    var i = 0;
    for (; i < next.length; i += 2) {
        /** @type {string} */
        var name_1 = next[i];
        if (isNew) {
            prev[i] = name_1;
        }
        else if (prev[i] !== name_1) {
            break;
        }
        /** @type {string} */
        var value = next[i + 1];
        if (isNew || prev[i + 1] !== value) {
            prev[i + 1] = value;
            (0, changes_1.queueChange)(updateFn, updateCtx, name_1, value, attrs);
        }
    }
    // Items did not line up exactly as before, need to make sure old items are
    // removed. This should be a rare case.
    if (i < next.length || i < prev.length) {
        /** @type {number} */
        var startIndex = i;
        for (i = startIndex; i < prev.length; i += 2) {
            prevValuesMap[prev[i]] = prev[i + 1];
        }
        for (i = startIndex; i < next.length; i += 2) {
            /** @type {string} */
            var name_2 = (/** @type {string} */ (next[i]));
            /** @type {string} */
            var value = next[i + 1];
            if (prevValuesMap[name_2] !== value) {
                (0, changes_1.queueChange)(updateFn, updateCtx, name_2, value, attrs);
            }
            prev[i] = name_2;
            prev[i + 1] = value;
            delete prevValuesMap[name_2];
        }
        (0, util_1.truncateArray)(prev, next.length);
        for (var name_3 in prevValuesMap) {
            (0, changes_1.queueChange)(updateFn, updateCtx, name_3, undefined, attrs);
            delete prevValuesMap[name_3];
        }
    }
    (0, changes_1.flush)();
}
exports.calculateDiff = calculateDiff;

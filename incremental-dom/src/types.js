/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/types.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
goog.module('google3.third_party.javascript.incremental_dom.src.types');
var module = module || { id: 'src/types.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
/**
 * @record
 */
function ElementConstructor() { }
exports.ElementConstructor = ElementConstructor;
/** @typedef {function(!Element, string, ?): void} */
exports.AttrMutator;
/**
 * @record
 */
function AttrMutatorConfig() { }
exports.AttrMutatorConfig = AttrMutatorConfig;
/** @typedef {(string|!ElementConstructor)} */
exports.NameOrCtorDef;
/** @typedef {(undefined|null|string|number)} */
exports.Key;
/** @typedef {(undefined|null|!Array<*>)} */
exports.Statics;
/** @typedef {function((!Element|!DocumentFragment), function((undefined|?)): void, (undefined|?)=): ?} */
exports.PatchFunction;
/** @typedef {function(!Node, (string|!ElementConstructor), (string|!ElementConstructor), (undefined|null|string|number), (undefined|null|string|number)): boolean} */
exports.MatchFnDef;
/**
 * @record
 */
function PatchConfig() { }
exports.PatchConfig = PatchConfig;
/* istanbul ignore if */
if (false) {
    /**
     * @type {(undefined|function(!Node, (string|!ElementConstructor), (string|!ElementConstructor), (undefined|null|string|number), (undefined|null|string|number)): boolean)}
     * @public
     */
    PatchConfig.prototype.matches;
}

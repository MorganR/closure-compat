/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/index.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.index');
var module = module || { id: 'index.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
var tsickle_attributes_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.attributes");
var tsickle_core_2 = goog.requireType("google3.third_party.javascript.incremental_dom.src.core");
var tsickle_global_3 = goog.requireType("google3.third_party.javascript.incremental_dom.src.global");
var tsickle_node_data_4 = goog.requireType("google3.third_party.javascript.incremental_dom.src.node_data");
var tsickle_notifications_5 = goog.requireType("google3.third_party.javascript.incremental_dom.src.notifications");
var tsickle_symbols_6 = goog.requireType("google3.third_party.javascript.incremental_dom.src.symbols");
var tsickle_virtual_elements_7 = goog.requireType("google3.third_party.javascript.incremental_dom.src.virtual_elements");
var tsickle_types_8 = goog.requireType("google3.third_party.javascript.incremental_dom.src.types");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var attributes_1 = goog.require('google3.third_party.javascript.incremental_dom.src.attributes');
exports.applyAttr = attributes_1.applyAttr;
exports.applyProp = attributes_1.applyProp;
exports.attributes = attributes_1.attributes;
exports.createAttributeMap = attributes_1.createAttributeMap;
var core_1 = goog.require('google3.third_party.javascript.incremental_dom.src.core');
exports.alignWithDOM = core_1.alignWithDOM;
exports.alwaysDiffAttributes = core_1.alwaysDiffAttributes;
exports.close = core_1.close;
exports.createPatchInner = core_1.createPatchInner;
exports.createPatchOuter = core_1.createPatchOuter;
exports.currentElement = core_1.currentElement;
exports.currentContext = core_1.currentContext;
exports.currentPointer = core_1.currentPointer;
exports.open = core_1.open;
exports.patch = core_1.patchInner;
exports.patchInner = core_1.patchInner;
exports.patchOuter = core_1.patchOuter;
exports.skip = core_1.skip;
exports.skipNode = core_1.skipNode;
exports.tryGetCurrentElement = core_1.tryGetCurrentElement;
var global_1 = goog.require('google3.third_party.javascript.incremental_dom.src.global');
exports.setKeyAttributeName = global_1.setKeyAttributeName;
var node_data_1 = goog.require('google3.third_party.javascript.incremental_dom.src.node_data');
exports.clearCache = node_data_1.clearCache;
exports.getKey = node_data_1.getKey;
exports.importNode = node_data_1.importNode;
exports.isDataInitialized = node_data_1.isDataInitialized;
var notifications_1 = goog.require('google3.third_party.javascript.incremental_dom.src.notifications');
exports.notifications = notifications_1.notifications;
var symbols_1 = goog.require('google3.third_party.javascript.incremental_dom.src.symbols');
exports.symbols = symbols_1.symbols;
var virtual_elements_1 = goog.require('google3.third_party.javascript.incremental_dom.src.virtual_elements');
exports.applyAttrs = virtual_elements_1.applyAttrs;
exports.applyStatics = virtual_elements_1.applyStatics;
exports.attr = virtual_elements_1.attr;
exports.elementClose = virtual_elements_1.elementClose;
exports.elementOpen = virtual_elements_1.elementOpen;
exports.elementOpenEnd = virtual_elements_1.elementOpenEnd;
exports.elementOpenStart = virtual_elements_1.elementOpenStart;
exports.elementVoid = virtual_elements_1.elementVoid;
exports.key = virtual_elements_1.key;
exports.text = virtual_elements_1.text;
var types_1 = goog.require('google3.third_party.javascript.incremental_dom.src.types');
/** @typedef {!tsickle_types_8.ElementConstructor} */
exports.ElementConstructor; // re-export typedef
/** @typedef {!tsickle_types_8.AttrMutator} */
exports.AttrMutator; // re-export typedef
/** @typedef {!tsickle_types_8.AttrMutatorConfig} */
exports.AttrMutatorConfig; // re-export typedef
/** @typedef {!tsickle_types_8.NameOrCtorDef} */
exports.NameOrCtorDef; // re-export typedef
/** @typedef {!tsickle_types_8.Key} */
exports.Key; // re-export typedef
/** @typedef {!tsickle_types_8.Statics} */
exports.Statics; // re-export typedef
/** @typedef {!tsickle_types_8.PatchFunction} */
exports.PatchFunction; // re-export typedef
/** @typedef {!tsickle_types_8.MatchFnDef} */
exports.MatchFnDef; // re-export typedef
/** @typedef {!tsickle_types_8.PatchConfig} */
exports.PatchConfig; // re-export typedef

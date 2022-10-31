/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/notifications.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
goog.module('incremental_dom.src.notifications');
var module = module || { id: 'src/notifications.ts' };
goog.require('tslib');
/** @typedef {function(!Array<!Node>): void} */
exports.NodeFunction;
/**
 * @record
 */
function Notifications() { }
exports.Notifications = Notifications;
/* istanbul ignore if */
if (false) {
    /**
     * Called after patch has completed with any Nodes that have been created
     * and added to the DOM.
     * @type {(null|function(!Array<!Node>): void)}
     * @public
     */
    Notifications.prototype.nodesCreated;
    /**
     * Called after patch has completed with any Nodes that have been removed
     * from the DOM.
     * Note it's an application's responsibility to handle any childNodes.
     * @type {(null|function(!Array<!Node>): void)}
     * @public
     */
    Notifications.prototype.nodesDeleted;
}
/** @type {!Notifications} */
exports.notifications = {
    nodesCreated: null,
    nodesDeleted: null
};

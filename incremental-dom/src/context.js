/**
 * @fileoverview added by tsickle
 * Generated from: /home/morgan/code/incremental-dom/src/context.ts
 * @suppress {checkTypes,const,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode}
 */
goog.module('google3.third_party.javascript.incremental_dom.src.context');
var module = module || { id: 'src/context.ts' };
goog.require('google3.third_party.javascript.tslib.tslib');
var tsickle_notifications_1 = goog.requireType("google3.third_party.javascript.incremental_dom.src.notifications");
//  Copyright 2018 The Incremental DOM Authors. All Rights Reserved.
/** @license SPDX-License-Identifier: Apache-2.0 */
var notifications_1 = goog.require('google3.third_party.javascript.incremental_dom.src.notifications');
/**
 * A context object keeps track of the state of a patch.
 */
var /**
 * A context object keeps track of the state of a patch.
 */
Context = /** @class */ (function () {
    function Context(node) {
        this.created = [];
        this.deleted = [];
        this.node = node;
    }
    /**
     * @public
     * @param {!Node} node
     * @return {void}
     */
    Context.prototype.markCreated = /**
     * @public
     * @param {!Node} node
     * @return {void}
     */
    function (node) {
        this.created.push(node);
    };
    /**
     * @public
     * @param {!Node} node
     * @return {void}
     */
    Context.prototype.markDeleted = /**
     * @public
     * @param {!Node} node
     * @return {void}
     */
    function (node) {
        this.deleted.push(node);
    };
    /**
     * Notifies about nodes that were created during the patch operation.
     */
    /**
     * Notifies about nodes that were created during the patch operation.
     * @public
     * @return {void}
     */
    Context.prototype.notifyChanges = /**
     * Notifies about nodes that were created during the patch operation.
     * @public
     * @return {void}
     */
    function () {
        if (notifications_1.notifications.nodesCreated && this.created.length > 0) {
            notifications_1.notifications.nodesCreated(this.created);
        }
        if (notifications_1.notifications.nodesDeleted && this.deleted.length > 0) {
            notifications_1.notifications.nodesDeleted(this.deleted);
        }
    };
    return Context;
}());
exports.Context = Context;
/* istanbul ignore if */
if (false) {
    /**
     * @type {!Array<!Node>}
     * @private
     */
    Context.prototype.created;
    /**
     * @type {!Array<!Node>}
     * @private
     */
    Context.prototype.deleted;
    /**
     * @const {(!Element|!DocumentFragment)}
     * @public
     */
    Context.prototype.node;
}

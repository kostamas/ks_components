"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KsStore = (function () {
    function KsStore() {
        var _this = this;
        this.subscriptions = [];
        this.unSubscribe = function (cb, id) {
            for (var i = 0; i < _this.subscriptions.length; i++) {
                if (id && _this.subscriptions[i].id === id) {
                    _this.removeSubscription(i);
                    break;
                }
                else if (_this.subscriptions[i].cb === cb) {
                    _this.removeSubscription(i);
                    break;
                }
            }
        };
        this.unSubscribeAll = function () {
            _this.subscriptions.forEach(function (subscriptionData) {
                subscriptionData.subscription.unsubscribe();
            });
            _this.subscriptions = [];
        };
    }
    KsStore.prototype.addSubscription = function (subscription, cb, id) {
        this.subscriptions.push({ subscription: subscription, cb: cb, id: id });
    };
    KsStore.prototype.removeSubscription = function (index) {
        this.subscriptions[index].subscription.unsubscribe();
        this.subscriptions.splice(index, 1);
    };
    return KsStore;
}());
exports.KsStore = KsStore;

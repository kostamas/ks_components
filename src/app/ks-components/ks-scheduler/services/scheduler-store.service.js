"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
require("rxjs/add/operator/delay");
var Subject_1 = require("rxjs/Subject");
var ks_store_service_1 = require("../../../core/ks-store.service");
var SchedulerStoreService = (function (_super) {
    __extends(SchedulerStoreService, _super);
    function SchedulerStoreService() {
        var _this = _super.call(this) || this;
        _this.availability$ = new Subject_1.Subject();
        _this.schedules$ = new Subject_1.Subject();
        _this.timeSlotClick$ = new Subject_1.Subject();
        _this.updateTimeSlots$ = new Subject_1.Subject();
        return _this;
    }
    SchedulerStoreService.prototype.notifyAvailability = function (storeType) {
        this.availability$.next(storeType);
    };
    SchedulerStoreService.prototype.onAvailability = function (cb, id) {
        this.addSubscription(this.availability$.subscribe(cb), cb, id);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.notifySchedules = function (storeType) {
        return this.schedules$.next(storeType);
    };
    SchedulerStoreService.prototype.onSchedules = function (cb) {
        this.addSubscription(this.schedules$.subscribe(cb), cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.notifyTimeSlot = function (timeSlotStoreType, metaData, timeSlotData) {
        this.timeSlotClick$.next({ timeSlotStoreType: timeSlotStoreType, metaData: metaData, timeSlotData: timeSlotData });
    };
    SchedulerStoreService.prototype.onTimeSlot = function (cb) {
        this.addSubscription(this.timeSlotClick$.subscribe(cb), cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.notifyUpdateTimeSlot = function (data) {
        this.updateTimeSlots$.next(data);
    };
    SchedulerStoreService.prototype.onUpdateTimeSlot = function (cb) {
        this.addSubscription(this.updateTimeSlots$.subscribe(cb), cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.ngOnDestroy = function () {
        this.unSubscribeAll();
        this.subscriptions = [];
    };
    SchedulerStoreService = __decorate([
        core_1.Injectable()
    ], SchedulerStoreService);
    return SchedulerStoreService;
}(ks_store_service_1.KsStore));
exports.SchedulerStoreService = SchedulerStoreService;
/*************************************** constants *******************************/
exports.SCHEDULER_STORE_TYPE = {
    OUT: 1,
    IN: 2
};
exports.TIME_SLOT_STORE_TYPE = {
    SCHEDULE: 1,
    DELETE: 2,
    CUSTOM: 3
};

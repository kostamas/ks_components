"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var timeSlot_constant_1 = require("../constants/timeSlot.constant");
var scheduler_store_service_1 = require("../services/scheduler-store.service");
var TimeSlotComponent = (function () {
    function TimeSlotComponent(schedulerStoreService, componentFactoryResolver) {
        this.schedulerStoreService = schedulerStoreService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.TIME_SLOT_VIEWS = timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS;
        this.TIME_SLOTS_TYPES = timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES;
    }
    TimeSlotComponent.prototype.availableSlotClick = function () {
        this.schedulerStoreService.notifyTimeSlot(scheduler_store_service_1.TIME_SLOT_STORE_TYPE.SCHEDULE, this.timeSlotData.metaData, this.timeSlotData.data);
    };
    TimeSlotComponent.prototype.deleteItem = function () {
        var timeSlotData = this.timeSlotData;
        if (this.timeSlotData.metaData.timeSlotType === this.TIME_SLOTS_TYPES.CUSTOM) {
            timeSlotData.componentRef = this.customTimeSlotCompoRef;
        }
        this.schedulerStoreService.notifyTimeSlot(scheduler_store_service_1.TIME_SLOT_STORE_TYPE.DELETE, this.timeSlotData.metaData, timeSlotData);
    };
    TimeSlotComponent.prototype.ngDoCheck = function () {
        if (this.timeSlotData.metaData.timeSlotType === timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
        }
        if (this.timeSlotData.metaData.timeSlotType === timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
            if (!this.customTimeSlotCompoRef) {
                this.compileComponent();
            }
        }
        else {
            if (!!this.customTimeSlotCompoRef) {
                this.customTimeSlotCompoRef = undefined;
                this.customTimeSlot.remove();
            }
        }
    };
    TimeSlotComponent.prototype.compileComponent = function () {
        var _this = this;
        var factory = this.componentFactoryResolver.resolveComponentFactory(this.timeSlotData.data.component);
        this.customTimeSlotCompoRef = this.customTimeSlot.createComponent(factory);
        this.customTimeSlotCompoRef.instance.date = new Date(this.timeSlotData.metaData.date);
        var inputName;
        if (Array.isArray(this.timeSlotData.data.inputs)) {
            this.timeSlotData.data.inputs.forEach(function (input) {
                inputName = Object.keys(input)[0];
                _this.customTimeSlotCompoRef.instance[inputName] = input[inputName];
            });
        }
        this.customTimeSlotCompoRef.changeDetectorRef.detectChanges();
    };
    __decorate([
        core_1.Input()
    ], TimeSlotComponent.prototype, "timeSlotData", void 0);
    __decorate([
        core_1.ViewChild('customTimeSlot', { read: core_1.ViewContainerRef })
    ], TimeSlotComponent.prototype, "customTimeSlot", void 0);
    TimeSlotComponent = __decorate([
        core_1.Component({
            selector: 'app-time-slot',
            templateUrl: './time-slot.component.html',
            styleUrls: ['./time-slot.component.scss']
        })
    ], TimeSlotComponent);
    return TimeSlotComponent;
}());
exports.TimeSlotComponent = TimeSlotComponent;

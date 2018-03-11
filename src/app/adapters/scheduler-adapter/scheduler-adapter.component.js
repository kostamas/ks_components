"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scheduler_store_service_1 = require("../../ks-components/ks-scheduler/services/scheduler-store.service");
var Observable_1 = require("rxjs/Observable");
var simple_time_slot_component_1 = require("./customTimeSlots/simple-time-slot/simple-time-slot.component");
var timeSlot_constant_1 = require("../../ks-components/ks-scheduler/constants/timeSlot.constant");
var advanced_component_component_1 = require("./customTimeSlots/advanced-component/advanced-component.component");
var regularTimeSlot = timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.REGULAR;
var customTimeSlot = timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM;
var SchedulerAdapterComponent = (function () {
    function SchedulerAdapterComponent(schedulerStoreService, schedulingMockData, schedulerService) {
        var _this = this;
        this.schedulerStoreService = schedulerStoreService;
        this.schedulingMockData = schedulingMockData;
        this.schedulerService = schedulerService;
        this.itemsToSchedule = [
            { title: 'Item 1', data: 'Item 1', timeSlotType: regularTimeSlot },
            {
                title: 'Dentist',
                timeSlotType: customTimeSlot,
                component: simple_time_slot_component_1.SimpleTimeSlotComponent,
                inputs: [{ title: 'Dentist' }, { backgroundColor: '#D44444' }]
            },
            {
                title: 'Course',
                timeSlotType: customTimeSlot,
                component: simple_time_slot_component_1.SimpleTimeSlotComponent,
                inputs: [{ title: 'CS Course' }, { backgroundColor: 'yellow' }, { color: 'black' }]
            },
            {
                title: 'Event (1)',
                timeSlotType: customTimeSlot,
                component: advanced_component_component_1.AdvancedComponentComponent,
                inputs: [{ title: 'Event 1' }, { eventId: 'event1' }]
            },
            { title: 'Item 2', data: 'Item 2', timeSlotType: regularTimeSlot, classToAdd: 'custom-class-1' },
            {
                title: 'Wedding (NYC)',
                timeSlotType: customTimeSlot,
                component: simple_time_slot_component_1.SimpleTimeSlotComponent,
                inputs: [{ title: 'Wedding' }, { backgroundColor: '#12bb05' }]
            },
            {
                title: 'Event (2)',
                timeSlotType: customTimeSlot,
                component: advanced_component_component_1.AdvancedComponentComponent,
                inputs: [{ title: 'Event 2' }, { eventId: 'event2' }]
            },
            { title: 'Item 3', data: 'Item 3', timeSlotType: regularTimeSlot },
            {
                title: 'Work (morning)',
                timeSlotType: customTimeSlot,
                component: simple_time_slot_component_1.SimpleTimeSlotComponent,
                inputs: [{ title: 'Work' }]
            },
            { title: 'Item 6', data: 'Item 6', timeSlotType: regularTimeSlot, classToAdd: 'custom-class-2' },
            {
                title: 'Work (night)',
                timeSlotType: customTimeSlot,
                component: simple_time_slot_component_1.SimpleTimeSlotComponent,
                inputs: [{ title: 'Work' }, { backgroundColor: '#9239BB' }]
            }
        ];
        this.onItemClick = function (itemIndex) {
            if (_this.selectedItemIndex !== itemIndex) {
                _this.schedulerStoreService.notifyAvailability(scheduler_store_service_1.SCHEDULER_STORE_TYPE.OUT);
                var availabilityHandler_1 = function (availability) {
                    if (availability === scheduler_store_service_1.SCHEDULER_STORE_TYPE.IN) {
                        _this.selectedItemIndex = itemIndex;
                    }
                    _this.schedulerStoreService.unSubscribe(availabilityHandler_1);
                };
                _this.schedulerStoreService.onAvailability(availabilityHandler_1);
            }
            else {
                _this.showSchedules();
            }
        };
        this.getAvailability = function (startDate, endDate) {
            return Observable_1.Observable.of(_this.schedulingMockData.availability)
                .delay(Math.floor(Math.random() * 700));
        };
        this.getSchedules = function (startDate, endDate) {
            return Observable_1.Observable.of(_this.schedulingMockData.schedules)
                .delay(Math.floor(Math.random() * 700));
        };
        this.scheduleItem = function (_a) {
            var metaData = _a.metaData, data = _a.data;
            var selectedItem = _this.itemsToSchedule[_this.selectedItemIndex];
            _this.itemsToSchedule.splice(_this.selectedItemIndex, 1);
            _this.selectedItemIndex = -1;
            var insertedItem;
            _this.updateDB(metaData.date, { isAvailable: false, textToShow: selectedItem.title }, 'availability');
            if (selectedItem.timeSlotType === timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.REGULAR) {
                insertedItem = _this.updateDB(metaData.date, selectedItem.data, 'schedules');
            }
            else {
                var timeSlotData = selectedItem;
                insertedItem = _this.updateDB(metaData.date, timeSlotData, 'schedules');
            }
            _this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
        };
        this.deleteItem = function (_a) {
            var metaData = _a.metaData, timeSlotData = _a.timeSlotData;
            var itemToSchedule;
            if (metaData.timeSlotType === timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
                itemToSchedule = timeSlotData.data;
            }
            else {
                itemToSchedule = { title: timeSlotData.data, data: timeSlotData.data, timeSlotType: regularTimeSlot };
            }
            _this.itemsToSchedule.push(itemToSchedule);
            var insertedItem = _this.updateDB(metaData.date, { isAvailable: true }, 'availability');
            _this.updateDB(metaData.date, '', 'schedules');
            _this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
        };
        this.showSchedules = function () {
            _this.selectedItemIndex = -1;
            _this.schedulerStoreService.notifySchedules(scheduler_store_service_1.SCHEDULER_STORE_TYPE.OUT);
        };
    }
    SchedulerAdapterComponent.prototype.ngOnInit = function () {
        this.schedulerConfig = {
            getAvailability: this.getAvailability,
            getSchedules: this.getSchedules,
            scheduleItem: this.scheduleItem,
            deleteItem: this.deleteItem
        };
    };
    SchedulerAdapterComponent.prototype.updateDB = function (date, data, collection) {
        var dateDetails = this.schedulerService.getDateDetails(date);
        if (!this.schedulingMockData[collection][dateDetails.year][dateDetails.month]) {
            this.schedulingMockData[collection][dateDetails.year][dateDetails.month] = {};
        }
        if (!this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth]) {
            this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth] = {};
            for (var i = 0; i < 24; i++) {
                this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth][i] = {};
            }
        }
        this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth][dateDetails.hours].data = data;
        return _a = {},
            _a[dateDetails.year] = (_b = {}, _b[dateDetails.month] = (_c = {}, _c[dateDetails.dayOfMonth] = (_d = {}, _d[dateDetails.hours] = { data: data }, _d), _c), _b),
            _a;
        var _a, _b, _c, _d;
    };
    SchedulerAdapterComponent = __decorate([
        core_1.Component({
            selector: 'app-scheduler-adapter',
            templateUrl: './scheduler-adapter.component.html',
            styleUrls: ['./scheduler-adapter.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [scheduler_store_service_1.SchedulerStoreService]
        })
    ], SchedulerAdapterComponent);
    return SchedulerAdapterComponent;
}());
exports.SchedulerAdapterComponent = SchedulerAdapterComponent;

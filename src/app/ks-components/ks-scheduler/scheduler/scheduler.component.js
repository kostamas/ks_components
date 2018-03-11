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
var scheduler_constant_1 = require("../constants/scheduler.constant");
var common_1 = require("@angular/common");
var scheduler_store_service_1 = require("../services/scheduler-store.service");
var _ = require("lodash");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/combineLatest");
var SchedulerComponent = (function () {
    function SchedulerComponent(schedulerService, schedulerStoreService) {
        var _this = this;
        this.schedulerService = schedulerService;
        this.schedulerStoreService = schedulerStoreService;
        this.DYNAMIC_DEFAULT_VIEWS = timeSlot_constant_1.TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS;
        this.currentOperationId = scheduler_constant_1.OperationTypes.SCHEDULES;
        this.showSpinner = false;
        this.startHour = 8;
        this.headerDates = [];
        this.hours = [];
        this.timeSlotData = {};
        this.dynamicDefaultView = { timeSlotClass: '' };
        this.dynamicDefaultViewsMap = (_a = {},
            _a[timeSlot_constant_1.TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY] = 'empty-slot',
            _a[timeSlot_constant_1.TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE] = 'unavailable-slot',
            _a);
        this.schedulerRows = new Array(scheduler_constant_1.SchedulerConstant.HOURS_IN_DAYS);
        this.schedulerColumns = new Array(scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
        this.schedulerWeeks = ['week_slide_0', 'week_slide_1', 'week_slide_2'];
        this.weeksStyles = {
            week_slide_0: { left: '-900px', transition: '1sec' },
            week_slide_1: { left: '0px', transition: '1sec' },
            week_slide_2: { left: '900px', transition: '1sec' }
        };
        this.availabilityHandler = function (startDate, endDate, startWeekSlide, availabilityStoreType) {
            _this.currentOperationId = scheduler_constant_1.OperationTypes.AVAILABILITY;
            _this.dynamicDefaultView.timeSlotClass = _this.dynamicDefaultViewsMap[timeSlot_constant_1.TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
            if (availabilityStoreType === scheduler_store_service_1.SCHEDULER_STORE_TYPE.OUT) {
                _this.showSpinner = true;
                _this.schedulerConfig.getAvailability(startDate, endDate)
                    .take(1)
                    .switchMap(function (data) {
                    if (typeof startWeekSlide === 'function') {
                        startWeekSlide = startWeekSlide.apply(_this);
                    }
                    return _this.updateTimeSlotsWithData(data, startDate, endDate, startWeekSlide, scheduler_constant_1.OperationTypes.AVAILABILITY);
                })
                    .subscribe(function () {
                    _this.schedulerStoreService.notifyAvailability(scheduler_store_service_1.SCHEDULER_STORE_TYPE.IN);
                    _this.showSpinner = false;
                });
            }
        };
        this.schedulesHandler = function (startDate, endDate, startWeekSlide) {
            _this.showSpinner = true;
            _this.currentOperationId = scheduler_constant_1.OperationTypes.SCHEDULES;
            _this.dynamicDefaultView.timeSlotClass = _this.dynamicDefaultViewsMap[timeSlot_constant_1.TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY];
            _this.schedulerConfig.getSchedules(startDate, endDate)
                .take(1)
                .subscribe(function (schedules) {
                if (typeof startWeekSlide === 'function') {
                    startWeekSlide = startWeekSlide.apply(_this);
                }
                _this.updateTimeSlotsWithData(schedules, startDate, endDate, startWeekSlide, scheduler_constant_1.OperationTypes.SCHEDULES);
            });
        };
        this.updateTimeSlotsWithData = function (data, startData, endDate, weekSlide, operationType) {
            var runningDate = new Date(startData);
            var dateDetails, timeSlotData, i, hour;
            while (runningDate <= endDate) {
                for (i = 0; i < scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK; i++) {
                    for (hour = 0; hour < scheduler_constant_1.SchedulerConstant.HOURS_IN_DAYS; hour++) {
                        dateDetails = _this.schedulerService.getDateDetails(runningDate);
                        timeSlotData = _this.timeSlotData[_this.schedulerWeeks[weekSlide]][i][hour];
                        timeSlotData.data = _this.extractData(data, dateDetails.year, dateDetails.month, dateDetails.dayOfMonth, hour);
                        timeSlotData.metaData = _this.metaDataGetterByTimeSlot(timeSlotData, operationType);
                        timeSlotData.metaData.date = new Date(dateDetails.year, dateDetails.month, dateDetails.dayOfMonth, hour);
                        timeSlotData.dynamicDefaultView = _this.dynamicDefaultView;
                    }
                    runningDate.setDate(runningDate.getDate() + 1);
                }
                weekSlide = (weekSlide + 1) % 3;
            }
            _this.showSpinner = false;
            return Observable_1.Observable.of({});
        };
        this.timeSlotHandler = function (_a) {
            var timeSlotStoreType = _a.timeSlotStoreType, metaData = _a.metaData, timeSlotData = _a.timeSlotData;
            switch (timeSlotStoreType) {
                case scheduler_store_service_1.TIME_SLOT_STORE_TYPE.SCHEDULE:
                    _this.schedulerConfig.scheduleItem({ metaData: metaData, timeSlotData: timeSlotData });
                    break;
                case scheduler_store_service_1.TIME_SLOT_STORE_TYPE.DELETE:
                    _this.schedulerConfig.deleteItem({ metaData: metaData, timeSlotData: timeSlotData });
            }
        };
        var _a;
    }
    SchedulerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSpinner = true;
        for (var i = 0, hour = 0; i < scheduler_constant_1.SchedulerConstant.HOURS_IN_DAYS; i++) {
            hour = (i + this.startHour) % scheduler_constant_1.SchedulerConstant.HOURS_IN_DAYS;
            this.hours.push(hour);
        }
        this.headerDates = [];
        for (var i = 0; i < scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK; i++) {
            this.headerDates.push((_a = {}, _a[i] = '', _a));
        }
        this.currentDate = new Date();
        this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay());
        this.mdDate = this.currentDate;
        this.current_week_slide = 1;
        this.updateHeaderDates(this.currentDate);
        this.initTimeSlots();
        this.schedulerStoreService.onAvailability(function (availabilityStoreType) {
            var startAndEndDates = _this.getStartAndEndDates(-1 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 2 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
            _this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, _this.getRegularStartWeekSlide, availabilityStoreType);
        });
        this.schedulerStoreService.onSchedules(function () {
            var startAndEndDates = _this.getStartAndEndDates(-1 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 2 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
            _this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, _this.getRegularStartWeekSlide);
        });
        this.schedulerStoreService.onTimeSlot(this.timeSlotHandler.bind(this));
        this.schedulerStoreService.onUpdateTimeSlot(this.scheduleHandler.bind(this));
        var startAndEndDates = this.getStartAndEndDates(-1 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 2 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
        var startWeekSlide = this.current_week_slide - 1;
        this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide);
        var _a;
    };
    SchedulerComponent.prototype.updateDynamicDefaultView = function (defaultViewType) {
        this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[defaultViewType];
    };
    SchedulerComponent.prototype.updateHeaderDates = function (dateObj) {
        var runningDate = new Date(dateObj);
        var currentDay = runningDate.getDay();
        runningDate.setDate(runningDate.getDate() - currentDay);
        for (var i = 0; i < scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK; i++) {
            this.headerDates[i] = new Date(runningDate.getTime());
            runningDate.setDate(runningDate.getDate() + 1);
        }
    };
    SchedulerComponent.prototype.changeActiveWeek = function (weekDirection) {
        var _this = this;
        this.showSpinner = true;
        var newActiveWeek = (this.current_week_slide - weekDirection) % this.schedulerWeeks.length;
        this.current_week_slide = newActiveWeek < 0 ? this.schedulerWeeks.length - 1 : newActiveWeek;
        this.currentDate.setDate(this.currentDate.getDate() - weekDirection * 7);
        this.currentDate = new Date(this.currentDate);
        this.updateHeaderDates(this.currentDate);
        var left_style_pixels = '';
        Object.keys(this.weeksStyles).forEach(function (week_slide) {
            left_style_pixels = _this.weeksStyles[week_slide].left;
            left_style_pixels = +left_style_pixels.replace('px', '');
            if (left_style_pixels + weekDirection * 900 > (_this.schedulerWeeks.length - 2) * 900) {
                _this.weeksStyles[week_slide].transition = 'none';
                _this.weeksStyles[week_slide].left = '-900px';
            }
            else if (left_style_pixels + weekDirection * 900 < -900) {
                _this.weeksStyles[week_slide].transition = 'none';
                _this.weeksStyles[week_slide].left = (_this.schedulerWeeks.length - 2) * 900 + 'px';
            }
            else {
                _this.weeksStyles[week_slide].transition = '0.6s left ease';
                _this.weeksStyles[week_slide].left = weekDirection * 900 + left_style_pixels + 'px';
            }
        });
        var relevantWeek = new Date(this.currentDate);
        relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());
        this.mdDate = relevantWeek;
        var startAndEndDates, startWeekSlide;
        if (weekDirection < 0) {
            startAndEndDates = this.getStartAndEndDates(scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 2 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
            startWeekSlide = (this.current_week_slide + 1) % 3;
        }
        else {
            startWeekSlide = this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
            startAndEndDates = this.getStartAndEndDates((-1) * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 0);
        }
        switch (this.currentOperationId) {
            case scheduler_constant_1.OperationTypes.SCHEDULES:
                this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide);
                break;
            case scheduler_constant_1.OperationTypes.AVAILABILITY:
                this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide, scheduler_store_service_1.SCHEDULER_STORE_TYPE.OUT);
                break;
        }
    };
    SchedulerComponent.prototype.initTimeSlots = function () {
        var _this = this;
        this.timeSlotData = { week_slide_0: {}, week_slide_1: {}, week_slide_2: {} };
        this.emptyDay = {};
        for (var i = 0; i < scheduler_constant_1.SchedulerConstant.HOURS_IN_DAYS; i++) {
            this.emptyDay[i] = {
                data: '',
                dynamicDefaultView: this.dynamicDefaultView,
                metaData: {
                    view: timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY
                }
            };
        }
        Object.keys(this.timeSlotData).forEach(function (weekSlide) {
            for (var i = 0; i < scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK; i++) {
                _this.timeSlotData[weekSlide][i] = _.cloneDeep(_this.emptyDay);
            }
        });
    };
    SchedulerComponent.prototype.changeWeekSlidesByDate = function (date) {
        this.currentDate = new Date(date);
        this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay());
        this.updateHeaderDates(this.currentDate);
        var startAndEndDates = this.getStartAndEndDates(-1 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 2 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
        switch (this.currentOperationId) {
            case scheduler_constant_1.OperationTypes.SCHEDULES:
                this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide);
                break;
            case scheduler_constant_1.OperationTypes.AVAILABILITY:
                this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide, scheduler_store_service_1.SCHEDULER_STORE_TYPE.OUT);
                break;
        }
    };
    SchedulerComponent.prototype.metaDataGetterByTimeSlot = function (timeSlotData, operationType) {
        var metaData = {};
        if (timeSlotData.data && timeSlotData.data.timeSlotType === timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
            metaData.timeSlotType = timeSlot_constant_1.TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM;
        }
        switch (operationType) {
            case scheduler_constant_1.OperationTypes.AVAILABILITY:
                if (timeSlotData.data.isAvailable === true) {
                    metaData.view = timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW;
                }
                else {
                    metaData.view = timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS.UNAVAILABLE_TIME_SLOT_VIEW;
                }
                break;
            case scheduler_constant_1.OperationTypes.SCHEDULES:
                if (!!timeSlotData.data) {
                    metaData.view = timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS.SCHEDULE;
                }
                else {
                    metaData.view = timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
                }
                break;
            default:
                metaData.view = timeSlot_constant_1.TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
        }
        return metaData;
    };
    SchedulerComponent.prototype.extractData = function (data, year, month, dayInMonth, hour) {
        if (this.schedulerService.isDateExistByParams(data, year, month, dayInMonth, hour)) {
            return data[year][month][dayInMonth][hour].data;
        }
        else {
            return null;
        }
    };
    SchedulerComponent.prototype.getRegularStartWeekSlide = function () {
        return this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
    };
    SchedulerComponent.prototype.scheduleHandler = function () {
        this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
        var startAndEndDates = this.getStartAndEndDates((-1) * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK, 2 * scheduler_constant_1.SchedulerConstant.DAYS_IN_WEEK);
        this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide);
    };
    SchedulerComponent.prototype.getStartAndEndDates = function (startOffset, endOffset) {
        var startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + startOffset - this.currentDate.getDay()));
        var endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + endOffset - this.currentDate.getDay()));
        return { startDate: startDate, endDate: endDate };
    };
    SchedulerComponent.prototype.ngOnDestroy = function () {
        this.schedulerStoreService.unSubscribeAll();
    };
    __decorate([
        core_1.Input()
    ], SchedulerComponent.prototype, "schedulerConfig", void 0);
    SchedulerComponent = __decorate([
        core_1.Component({
            selector: 'app-scheduler',
            templateUrl: './scheduler.component.html',
            styleUrls: ['./scheduler.component.scss'],
            providers: [common_1.DatePipe],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], SchedulerComponent);
    return SchedulerComponent;
}());
exports.SchedulerComponent = SchedulerComponent;

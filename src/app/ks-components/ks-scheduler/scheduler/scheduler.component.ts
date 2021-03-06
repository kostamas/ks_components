import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {OperationTypes, SchedulerConstant} from '../constants/scheduler.constant';
import {SchedulerService} from '../services/scheduler.service';
import {DatePipe} from '@angular/common';
import {SCHEDULER_STORE_TYPE, SchedulerStoreService, TIME_SLOT_STORE_TYPE} from '../services/scheduler-store.service';
import * as _ from 'lodash';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})

export class SchedulerComponent implements OnInit, OnDestroy {
  public DYNAMIC_DEFAULT_VIEWS = TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS;
  private currentOperationId = OperationTypes.SCHEDULES;
  public showSpinner = false;
  public startHour = 8;
  public headerDates = [];
  public hours = [];
  public timeSlotData = {};
  public emptyDay;
  public current_week_slide;
  public currentDate;
  public mdDate;

  public dynamicDefaultView = {timeSlotClass: ''};
  public dynamicDefaultViewsMap = {
    [TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY]: 'empty-slot',
    [TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE]: 'unavailable-slot'
  };

  public schedulerRows = new Array(SchedulerConstant.HOURS_IN_DAYS);
  public schedulerColumns = new Array(SchedulerConstant.DAYS_IN_WEEK);
  public schedulerWeeks = ['week_slide_0', 'week_slide_1', 'week_slide_2'];
  public weeksStyles = {
    week_slide_0: {left: '-900px', transition: '1sec'},
    week_slide_1: {left: '0px', transition: '1sec'},
    week_slide_2: {left: '900px', transition: '1sec'}
  };

  @Input() schedulerConfig;

  constructor(private schedulerService: SchedulerService, private schedulerStoreService: SchedulerStoreService) {
  }

  ngOnInit() {
    this.showSpinner = true;

    for (let i = 0, hour = 0; i < SchedulerConstant.HOURS_IN_DAYS; i++) {
      hour = (i + this.startHour) % SchedulerConstant.HOURS_IN_DAYS;
      this.hours.push(hour);
    }

    this.headerDates = [];
    for (let i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
      this.headerDates.push({[i]: ''});
    }

    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay());
    this.mdDate = this.currentDate;

    this.current_week_slide = 1;

    this.updateHeaderDates(this.currentDate);

    this.initTimeSlots();

    this.schedulerStoreService.onAvailability((availabilityStoreType: number) => {
      let startAndEndDates = this.getStartAndEndDates(-1 * SchedulerConstant.DAYS_IN_WEEK, 2 * SchedulerConstant.DAYS_IN_WEEK);
      this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide, availabilityStoreType)
    });

    this.schedulerStoreService.onSchedules(() => {
      let startAndEndDates = this.getStartAndEndDates(-1 * SchedulerConstant.DAYS_IN_WEEK, 2 * SchedulerConstant.DAYS_IN_WEEK);
      this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide)
    });

    this.schedulerStoreService.onTimeSlot(this.timeSlotHandler.bind(this));

    this.schedulerStoreService.onUpdateTimeSlot(this.scheduleHandler.bind(this));

    let startAndEndDates = this.getStartAndEndDates(-1 * SchedulerConstant.DAYS_IN_WEEK, 2 * SchedulerConstant.DAYS_IN_WEEK);
    const startWeekSlide = this.current_week_slide - 1;
    this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide);
  }

  public updateDynamicDefaultView(defaultViewType): void {
    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[defaultViewType];
  }

  private updateHeaderDates(dateObj) {
    const runningDate = new Date(dateObj);
    const currentDay = runningDate.getDay();
    runningDate.setDate(runningDate.getDate() - currentDay);

    for (let i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
      this.headerDates[i] = new Date(runningDate.getTime());
      runningDate.setDate(runningDate.getDate() + 1);
    }
  }

  public changeActiveWeek(weekDirection) {
    this.showSpinner = true;

    const newActiveWeek = (this.current_week_slide - weekDirection) % this.schedulerWeeks.length;
    this.current_week_slide = newActiveWeek < 0 ? this.schedulerWeeks.length - 1 : newActiveWeek;
    this.currentDate.setDate(this.currentDate.getDate() - weekDirection * 7);
    this.currentDate = new Date(this.currentDate);

    this.updateHeaderDates(this.currentDate);

    let left_style_pixels: any = '';
    Object.keys(this.weeksStyles).forEach((week_slide: string) => {
      left_style_pixels = this.weeksStyles[week_slide].left;
      left_style_pixels = +left_style_pixels.replace('px', '');

      if (left_style_pixels + weekDirection * 900 > (this.schedulerWeeks.length - 2) * 900) {
        this.weeksStyles[week_slide].transition = 'none';
        this.weeksStyles[week_slide].left = '-900px';
      } else if (left_style_pixels + weekDirection * 900 < -900) {
        this.weeksStyles[week_slide].transition = 'none';
        this.weeksStyles[week_slide].left = (this.schedulerWeeks.length - 2) * 900 + 'px';
      } else {
        this.weeksStyles[week_slide].transition = '0.6s left ease';
        this.weeksStyles[week_slide].left = weekDirection * 900 + left_style_pixels + 'px';
      }
    });

    const relevantWeek: Date = new Date(this.currentDate);
    relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());
    this.mdDate = relevantWeek;

    let startAndEndDates, startWeekSlide;

    if (weekDirection < 0) { // next week
      startAndEndDates = this.getStartAndEndDates(SchedulerConstant.DAYS_IN_WEEK, 2 * SchedulerConstant.DAYS_IN_WEEK);
      startWeekSlide = (this.current_week_slide + 1) % 3;
    } else {
      startWeekSlide = this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
      startAndEndDates = this.getStartAndEndDates((-1) * SchedulerConstant.DAYS_IN_WEEK, 0);
    }

    switch (this.currentOperationId) {
      case OperationTypes.SCHEDULES:
        this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide);
        break;

      case OperationTypes.AVAILABILITY:
        this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide, SCHEDULER_STORE_TYPE.OUT);
        break;
    }
  }

  public initTimeSlots() {
    this.timeSlotData = {week_slide_0: {}, week_slide_1: {}, week_slide_2: {}};
    this.emptyDay = {};
    for (let i = 0; i < SchedulerConstant.HOURS_IN_DAYS; i++) {
      this.emptyDay[i] = {
        data: '',
        dynamicDefaultView: this.dynamicDefaultView,
        metaData: {
          view: TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY
        }
      };
    }
    Object.keys(this.timeSlotData).forEach((weekSlide) => {
      for (let i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
        this.timeSlotData[weekSlide][i] = _.cloneDeep(this.emptyDay);
      }
    });
  }

  public changeWeekSlidesByDate(date) {
    this.currentDate = new Date(date);
    this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay());
    this.updateHeaderDates(this.currentDate);

    const startAndEndDates = this.getStartAndEndDates(-1 * SchedulerConstant.DAYS_IN_WEEK, 2 * SchedulerConstant.DAYS_IN_WEEK);
    switch (this.currentOperationId) {
      case OperationTypes.SCHEDULES:
        this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide);
        break;
      case OperationTypes.AVAILABILITY:
        this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide, SCHEDULER_STORE_TYPE.OUT);
        break;
    }
  }

  private availabilityHandler = (startDate, endDate, startWeekSlide, availabilityStoreType: number) => {
    this.currentOperationId = OperationTypes.AVAILABILITY;
    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
    if (availabilityStoreType === SCHEDULER_STORE_TYPE.OUT) {
      this.showSpinner = true;
      this.schedulerConfig.getAvailability(startDate, endDate)
        .take(1)
        .switchMap(data => {
          if (typeof startWeekSlide === 'function') {
            startWeekSlide = startWeekSlide.apply(this);
          }
          return this.updateTimeSlotsWithData(data, startDate, endDate, startWeekSlide, OperationTypes.AVAILABILITY);
        })
        .subscribe(() => {
          this.schedulerStoreService.notifyAvailability(SCHEDULER_STORE_TYPE.IN);
          this.showSpinner = false;
        });
    }
  };

  private schedulesHandler = (startDate, endDate, startWeekSlide) => {
    this.showSpinner = true;
    this.currentOperationId = OperationTypes.SCHEDULES;
    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY];

    this.schedulerConfig.getSchedules(startDate, endDate)
      .take(1)
      .subscribe((schedules) => {
      if (typeof startWeekSlide === 'function') {
        startWeekSlide = startWeekSlide.apply(this);
      }
      this.updateTimeSlotsWithData(schedules, startDate, endDate, startWeekSlide, OperationTypes.SCHEDULES);
    });
  };

  private updateTimeSlotsWithData = (data, startData, endDate, weekSlide, operationType) => {
    const runningDate: Date = new Date(startData);
    let dateDetails, timeSlotData,i, hour;

    while (runningDate <= endDate) {
      for (i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
        for (hour = 0; hour < SchedulerConstant.HOURS_IN_DAYS; hour++) {
          dateDetails = this.schedulerService.getDateDetails(runningDate);

          timeSlotData = this.timeSlotData[this.schedulerWeeks[weekSlide]][i][hour];
          timeSlotData.data = this.extractData(data, dateDetails.year, dateDetails.month, dateDetails.dayOfMonth, hour);
          timeSlotData.metaData = this.metaDataGetterByTimeSlot(timeSlotData, operationType);
          timeSlotData.metaData.date = new Date(dateDetails.year, dateDetails.month, dateDetails.dayOfMonth, hour);
          timeSlotData.dynamicDefaultView = this.dynamicDefaultView;
        }
        runningDate.setDate(runningDate.getDate() + 1);
      }
      weekSlide = (weekSlide + 1) % 3;
    }
    this.showSpinner = false;
    return Observable.of({});
  };

  private metaDataGetterByTimeSlot(timeSlotData, operationType) {
    let metaData: any = {};

    if (timeSlotData.data && timeSlotData.data.timeSlotType === TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
      metaData.timeSlotType = TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM
    }

    switch (operationType) {
      case OperationTypes.AVAILABILITY:
        if (timeSlotData.data.isAvailable === true) {
          metaData.view = TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW;
        } else {
          metaData.view = TimeSlotConstant.TIME_SLOT_VIEWS.UNAVAILABLE_TIME_SLOT_VIEW;
        }
        break;
      case OperationTypes.SCHEDULES:
        if (!!timeSlotData.data) {
          metaData.view = TimeSlotConstant.TIME_SLOT_VIEWS.SCHEDULE;
        } else {
          metaData.view = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
        }
        break;
      default:
        metaData.view = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
    }
    return metaData;
  }


  private extractData(data, year, month, dayInMonth, hour) {
    if (this.schedulerService.isDateExistByParams(data, year, month, dayInMonth, hour)) {
      return data[year][month][dayInMonth][hour].data;
    } else {
      return null;
    }
  }

  public timeSlotHandler = ({timeSlotStoreType, metaData, timeSlotData}) => {
    switch (timeSlotStoreType) {
      case TIME_SLOT_STORE_TYPE.SCHEDULE:
        this.schedulerConfig.scheduleItem({metaData, timeSlotData});
        break;
      case TIME_SLOT_STORE_TYPE.DELETE:
        this.schedulerConfig.deleteItem({metaData, timeSlotData});
    }
  };

  private getRegularStartWeekSlide() {
    return this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
  }

  private scheduleHandler() {
    this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
    const startAndEndDates = this.getStartAndEndDates((-1) * SchedulerConstant.DAYS_IN_WEEK, 2 * SchedulerConstant.DAYS_IN_WEEK);
    this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide);
  }

  private getStartAndEndDates(startOffset: number, endOffset: number) {
    const startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + startOffset - this.currentDate.getDay()));
    const endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + endOffset - this.currentDate.getDay()));
    return {startDate, endDate};
  }

  ngOnDestroy() {
    this.schedulerStoreService.unSubscribeAll();
  }
}

export interface ISchedulerConfig {
  getAvailability: (startDate: Date, endDate: Date) => Observable<any>;
  getSchedules: (startDate: Date, endDate: Date) => Observable<any>;
  scheduleItem: (data: any) => any;
  deleteItem: (data, any) => any;
}

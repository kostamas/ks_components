import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {OperationTypes, SchedulerConstant} from '../constants/scheduler.constant';
import {SchedulerService} from '../services/scheduler.service';
import {DatePipe} from '@angular/common';
import {SCHEDULER_STORE_TYPE, SchedulerStoreService} from "../services/scheduler-store.service";
import * as _ from 'lodash';
import {SchedulingMockData} from "../../../adapters/calendar-adapter/schedulingMockData";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})

export class CalendarComponent implements OnChanges, OnInit {
  public headerDates = [];
  public hours = [];
  public timeSlotData = {}; // all slots ks-components get this object as an input.
  public showSpinner = false;
  public DYNAMIC_DEFAULT_VIEWS = TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS;
  public dynamicDefaultView = {timeSlotClass: ''};
  public dynamicDefaultViewsMap = {
    [TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY]: 'empty-slot',
    [TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE]: 'unavailable-slot'
  };

  public calendarRows = new Array(SchedulerConstant.HOURS_IN_DAYS);
  public calendarColumns = new Array(SchedulerConstant.DAYS_IN_WEEK);
  public calendarWeeks = ['week_slide_0', 'week_slide_1', 'week_slide_2'];
  public weeksStyles = {
    week_slide_0: {left: '-900px', transition: '1sec'},
    week_slide_1: {left: '0px', transition: '1sec'},
    week_slide_2: {left: '900px', transition: '1sec'}
  };
  public emptyDay;

  public current_week_slide;

  public startHour = 9;
  public currentDate;
  private currentOperationId = OperationTypes.SCHEDULES;
  @Input() schedulerConfig;

  constructor(private schedulerService: SchedulerService, private schedulerStoreService: SchedulerStoreService,
              private schedulingMockData: SchedulingMockData) {
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

    this.current_week_slide = 1;

    this.updateHeaderDates(this.currentDate);

    this.initTimeSlots();

    const relevantWeek: Date = new Date(this.currentDate);

    this.schedulerConfig.getSchedules().subscribe((schedules) => {
      const startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() - 7 - this.currentDate.getDay()));
      const endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + 14 - this.currentDate.getDay()));
      const startWeekSlide = this.current_week_slide - 1;
      this.updateTimeSlotsWithData(schedules, startDate, endDate, startWeekSlide, OperationTypes.SCHEDULES);
      this.showSpinner = false;
    });

    this.schedulerStoreService.onAvailability((availabilityStoreType: number) => {
      const startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() - 7 - this.currentDate.getDay()));
      const endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + 14 - this.currentDate.getDay()));
      this.availabilityHandler(startDate, endDate, this.getStartWeekSlide, availabilityStoreType).subscribe();  //todo - remove subscribe
    });

    this.schedulerStoreService.onSchedules(() => {
      const startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() - 7 - this.currentDate.getDay()));
      const endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + 14 - this.currentDate.getDay()));
      this.schedulesHandler(startDate, endDate, this.getStartWeekSlide);
    });

    this.schedulerStoreService.onTimeSlot(this.timeSlotHandler.bind(this));

    this.schedulerStoreService.onUpdateTimeSlot(this.updateTimeSlots.bind(this));

    const startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() - 7 - this.currentDate.getDay()));
    const endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + 14 - this.currentDate.getDay()));
    const startWeekSlide = this.current_week_slide - 1;

    this.schedulesHandler(startDate, endDate, startWeekSlide);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public resetCalendar(): void {
    this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
    this.clearSlotsByGivenViews([TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW]);
  }

  public clearTimeSlot(date): void {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const dayInMonth = dateObj.getDate();
    const hour = dateObj.getHours();
    if (this.schedulerService.isDateExistByParams(this.timeSlotData, year, month, dayInMonth, hour)) {
      this.timeSlotData[year][month][dayInMonth][hour].view = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
      this.timeSlotData[year][month][dayInMonth][hour].data = {};
    }
  }

  public clearSlotsByGivenViews(viewsToClear: number[]) {
    this.schedulerService.runOnDateObject(this.timeSlotData, (year, month, dayInMonth, hour) => {
      if (viewsToClear.indexOf(this.timeSlotData[year][month][dayInMonth][hour].view) !== -1) {
        this.timeSlotData[year][month][dayInMonth][hour].view = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
        this.timeSlotData[year][month][dayInMonth][hour].data = {};
      }
      this.timeSlotData[year][month][dayInMonth][hour].classToAdd = '';
    });
  }

  public addClassToTimeSlots(classToAdd, datesToIgnore?: number[]) {
    let slotDate;
    this.schedulerService.runOnDateObject(this.timeSlotData, (year, month, dayInMonth, hour) => {
      slotDate = new Date(+year, +month, +dayInMonth, +hour).getTime();
      if (this.canAddClass(slotDate, datesToIgnore)) {
        this.timeSlotData[year][month][dayInMonth][hour].classToAdd = classToAdd;
      }
    });
  }

  public updateDynamicDefaultView(defaultViewType): void {
    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[defaultViewType];
  }

  private canAddClass(slotDate, datesToIgnore) {
    return !datesToIgnore || datesToIgnore.indexOf(slotDate) === -1;
  }

  private updateHeaderDates(dateObj) {
    const runningDate = new Date(dateObj);
    const currentDay = runningDate.getDay();
    runningDate.setDate(runningDate.getDate() - currentDay); // get this week sunday

    for (let i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
      this.headerDates[i] = new Date(runningDate.getTime());
      runningDate.setDate(runningDate.getDate() + 1);
    }
  }

  private lock = false;

  public changeActiveWeek(weekDirection) {
    if (this.lock) {
      return
    }

    this.lock = true;
    this.showSpinner = true;

    const newActiveWeek = (this.current_week_slide - weekDirection) % this.calendarWeeks.length;
    this.current_week_slide = newActiveWeek < 0 ? this.calendarWeeks.length - 1 : newActiveWeek;
    this.currentDate.setDate(this.currentDate.getDate() - weekDirection * 7);
    this.currentDate = new Date(this.currentDate);

    this.updateHeaderDates(this.currentDate);

    let left_style_pixels: any = '';
    Object.keys(this.weeksStyles).forEach((week_slide: string) => {
      left_style_pixels = this.weeksStyles[week_slide].left;
      left_style_pixels = +left_style_pixels.replace('px', '');


      if (left_style_pixels + weekDirection * 900 > (this.calendarWeeks.length - 2) * 900) {
        this.weeksStyles[week_slide].transition = 'none';
        this.weeksStyles[week_slide].left = '-900px';
      } else if (left_style_pixels + weekDirection * 900 < -900) {
        this.weeksStyles[week_slide].transition = 'none';
        this.weeksStyles[week_slide].left = (this.calendarWeeks.length - 2) * 900 + 'px';
      } else {
        this.weeksStyles[week_slide].transition = '0.6s left ease';
        this.weeksStyles[week_slide].left = weekDirection * 900 + left_style_pixels + 'px';
      }
    });

    const relevantWeek: Date = new Date(this.currentDate);
    relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());

    let startDate;
    let endDate;
    let startWeekSlide;
    if (weekDirection < 0) { // next week
      startWeekSlide = (this.current_week_slide + 1) % 3;
      startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + 7 - this.currentDate.getDay()));
      endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + 14 - this.currentDate.getDay()));
    } else {
      startWeekSlide = this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3; // make as fn (duplication)
      startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() - 7 - this.currentDate.getDay()));
      endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() - this.currentDate.getDay()));
    }

    switch (this.currentOperationId) {
      case OperationTypes.SCHEDULES:
        this.schedulesHandler(startDate, endDate, startWeekSlide).subscribe(() => {
          this.lock = false;
        });
        break;

      case OperationTypes.AVAILABILITY:
        this.availabilityHandler(startDate, endDate, startWeekSlide, SCHEDULER_STORE_TYPE.GET).subscribe(() => {
          this.lock = false;
        });
        break;
    }
  }

  public initTimeSlots() {
    this.timeSlotData = {
      week_slide_0: {},
      week_slide_1: {},
      week_slide_2: {}
    };

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

  private availabilityHandler = (startDate, endDate, startWeekSlide, availabilityStoreType: number) => {
    this.currentOperationId = OperationTypes.AVAILABILITY;

    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
    if (availabilityStoreType === SCHEDULER_STORE_TYPE.GET) {
      this.showSpinner = true;
      return this.schedulerConfig.getAvailability(this.currentDate)
        .switchMap(data => {
          if (typeof startWeekSlide === 'function') {
            startWeekSlide = startWeekSlide.apply(this);
          }
          return this.updateTimeSlotsWithData(data, startDate, endDate, startWeekSlide, OperationTypes.AVAILABILITY).map(() => {
            this.schedulerStoreService.notifyAvailability(SCHEDULER_STORE_TYPE.SET);
            this.showSpinner = false;
          })
        });
    } else {
      return Observable.of({});
    }
  };

  private schedulesHandler = (startDate, endDate, startWeekSlide) => {
    this.showSpinner = true;
    this.currentOperationId = OperationTypes.SCHEDULES;
    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY];

    return this.schedulerConfig.getSchedules().switchMap((schedules) => {
      if (typeof startWeekSlide === 'function') {
        startWeekSlide = startWeekSlide.apply(this);
      }
      return this.updateTimeSlotsWithData(schedules, startDate, endDate, startWeekSlide, OperationTypes.SCHEDULES)
        .map(() => {
          this.showSpinner = false;
        });
    });
  };

  private updateTimeSlotsWithData = (data, startData, endDate, weekSlide, operationType) => {
    const runningDate: Date = new Date(startData);

    let year, month, dayInMonth;
    let timeSlotData;

    while (runningDate <= endDate) {
      for (let i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
        for (let j = 0; j < SchedulerConstant.HOURS_IN_DAYS; j++) {
          year = runningDate.getFullYear();
          month = runningDate.getMonth();
          dayInMonth = runningDate.getDate();

          timeSlotData = this.timeSlotData[this.calendarWeeks[weekSlide]][i][j];
          timeSlotData.data = this.extractData(data, year, month, dayInMonth, j);
          timeSlotData.metaData = this.metaDataGetterByTimeSlot(timeSlotData, operationType);
          timeSlotData.metaData.date = new Date(year, month, dayInMonth, +j);
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
    switch (operationType) {
      case OperationTypes.AVAILABILITY:
        if (timeSlotData.data.isAvailable === true) {
          return {view: TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW};
        } else {
          return {view: TimeSlotConstant.TIME_SLOT_VIEWS.UNAVAILABLE_TIME_SLOT_VIEW};
        }

      case OperationTypes.SCHEDULES:
        if (!!timeSlotData.data) {
          return {view: TimeSlotConstant.TIME_SLOT_VIEWS.SCHEDULE};
        } else {
          return {view: TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY};
        }
      default:
        return {view: TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY};
    }
  }

  private extractData(data, year, month, dayInMonth, hour) {
    if (this.schedulerService.isDateExistByParams(data, year, month, dayInMonth, hour)) {
      return data[year][month][dayInMonth][hour].data;
    } else {
      return '';
    }
  }

  public timeSlotHandler = (timeSlotData) => {
    debugger;
    let {timeSlotType, date, data} = timeSlotData;
    this.schedulerConfig.schedule.call(this, {timeSlotType, date, data});
  };

  private getStartWeekSlide() {
    return this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
  }

  private updateTimeSlots(timeSlotsData) {
    const weekSlide = this.calendarWeeks[this.current_week_slide];
    let _day, _hour, _date;
    debugger;
    this.schedulerService.runOnDateObject(timeSlotsData, (year, month, dayInMonth, hour) => {
      _date = new Date(year, month, dayInMonth, hour);
      _day = _date.getDay();
      _hour = _date.getHours();
      this.timeSlotData[weekSlide][_day][_hour].data = timeSlotsData[year][month][dayInMonth][hour].data;
      this.timeSlotData[weekSlide][_day][_hour].metaData = this.metaDataGetterByTimeSlot(this.timeSlotData[weekSlide][_day][_hour].data, OperationTypes.AVAILABILITY); // todo - availability is hard coded
      this.timeSlotData[weekSlide][_day][_hour].metaData.date = new Date(year, month, dayInMonth, hour);
      this.timeSlotData[weekSlide][_day][_hour].dynamicDefaultView = this.dynamicDefaultView;
    });
    this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
    this.currentOperationId = OperationTypes.SCHEDULES;
  }
}

export interface ISchedulerConfig {
  getAvailability: () => Observable<any>;
  getSchedules: () => Observable<any>;
  schedule: (data: any) => any;
}

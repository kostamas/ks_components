import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {OperationTypes, SchedulerConstant} from '../constants/scheduler.constant';
import {SchedulerService} from '../services/scheduler.service';
import {DatePipe} from '@angular/common';
import {SchedulingMockData} from '../../../adapters/calendar-adapter/schedulingMockData';
import {SCHEDULER_STORE_TYPE, SchedulerStoreService} from "../services/scheduler-store.service";
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe, SchedulingMockData],
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

  public current_week_slide = 1;

  public startHour = 9;
  public currentDate;
  private currentOperationId = OperationTypes.SCHEDULES;
  @Input() schedulerConfig;

  constructor(private schedulerService: SchedulerService, private schedulingMockData: SchedulingMockData,
              private schedulerStoreService: SchedulerStoreService) {
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

    this.updateHeaderDates(this.currentDate);

    this.initTimeSlots();

    const relevantWeek: Date = new Date(this.currentDate);
    relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());


    this.schedulerConfig.getSchedules().subscribe((schedules) => {
      this.updateTimeSlotsWithData(schedules, OperationTypes.SCHEDULES);
      this.showSpinner = false;
    });

    this.schedulerStoreService.onAvailability(this.availabilityHandler);

    this.schedulerStoreService.onSchedules(this.schedulesHandler);

    this.schedulerStoreService.onTimeSlot(this.timeSlotHandler);

    this.schedulesHandler();
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

  private updateTimeSlots(week_slide, datesData) {
    this.timeSlotData[week_slide] = datesData;
  }

  public changeActiveWeek(weekDirection) {
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
        this.weeksStyles[week_slide].transition = '0.7s';
        this.weeksStyles[week_slide].left = weekDirection * 900 + left_style_pixels + 'px';
      }
    });

    const relevantWeek: Date = new Date(this.currentDate);
    relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());

    switch (this.currentOperationId) {
      case OperationTypes.SCHEDULES:
        this.schedulesHandler();
        break;

      case OperationTypes.AVAILABILITY:
        this.availabilityHandler(SCHEDULER_STORE_TYPE.GET);
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


  private availabilityHandler = (availabilityStoreType: number) => {
    this.currentOperationId = OperationTypes.AVAILABILITY;

    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
    if (availabilityStoreType === SCHEDULER_STORE_TYPE.GET) {
      this.showSpinner = true;
      this.schedulerConfig.getAvailability(this.currentDate)
        .subscribe(data => {
          this.updateTimeSlotsWithData(data, OperationTypes.AVAILABILITY);
          this.schedulerStoreService.notifyAvailability(SCHEDULER_STORE_TYPE.SET);
          this.showSpinner = false;
        });
    }
  };

  private schedulesHandler = () => {
    this.showSpinner = true;
    this.currentOperationId = OperationTypes.SCHEDULES;
    this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY];

    this.schedulerConfig.getSchedules().subscribe((schedules) => {
      this.updateTimeSlotsWithData(schedules, OperationTypes.SCHEDULES);
      this.showSpinner = false;
    });
  };

  private updateTimeSlotsWithData = (data, operationType) => {
    const runningDate: Date = new Date(this.currentDate);
    runningDate.setDate(runningDate.getDate() - runningDate.getDay());
    let year, month, dayInMonth;
    let timeSlotData;
    let isEmpty;

    for (let i = 0; i < SchedulerConstant.DAYS_IN_WEEK; i++) {
      year = runningDate.getFullYear();
      month = runningDate.getMonth();
      dayInMonth = runningDate.getDate();
      if (operationType !== OperationTypes.AVAILABILITY) {
        if (data[year] && data[year][month] && data[year][month][dayInMonth]) {
          this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i] = data[year][month][dayInMonth];
        } else {
          this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i] = _.cloneDeep(this.emptyDay);
        }
      }

      runningDate.setDate(runningDate.getDate() + 1);
      Object.keys(this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i]).forEach(hour => {
        if (operationType === OperationTypes.AVAILABILITY && data[year] && data[year][month] && data[year][month][dayInMonth]) {
          isEmpty = data[year][month][dayInMonth][hour].data;
          if (isEmpty) {
            this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i][hour].data = true;
          }
        }

        timeSlotData = this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i][hour];
        this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i][hour].metaData = this.metaDataGetterByTimeSlot(timeSlotData, operationType);
        this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i][hour].metaData.date = new Date(year, month, dayInMonth, +hour);
        this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i][hour].dynamicDefaultView = this.dynamicDefaultView;
      });
      this.showSpinner = false;
    }
  };

  private metaDataGetterByTimeSlot(timeSlotData, operationType) {
    switch (operationType) {
      case OperationTypes.AVAILABILITY:
        if (timeSlotData.data === true) {
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

  public timeSlotHandler = ({timeSlotType: number, date: Date, data: any}) => {
    this.schedulerConfig.schedule({timeSlotType: number, date: Date, data: any}).subscribe(() => {
      this.schedulesHandler();
    });
  }
}

export interface ISchedulerConfig {
  getAvailability: () => Observable<any>;
  getSchedules: () => Observable<any>;
  schedule: (data: any) => Observable<any>;
}

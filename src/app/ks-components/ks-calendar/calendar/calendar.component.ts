import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {CalendarConstant} from '../constants/calendar.constant';
import {CalendarService} from '../services/calendarservice';
import {DatePipe} from '@angular/common';
import {SchedulingMockData} from "../../../adapters/calendar-adapter/schedulingMockData";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe, SchedulingMockData]
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

  public calendarRows = new Array(CalendarConstant.HOURS_IN_DAYS);
  public calendarColumns = new Array(CalendarConstant.DAYS_IN_WEEK);
  public calendarWeeks = ['week_slide_0', 'week_slide_1', 'week_slide_2'];
  public weeksStyles = {
    week_slide_0: {left: '-900px', transition: '1sec'},
    week_slide_1: {left: '0px', transition: '1sec'},
    week_slide_2: {left: '900px', transition: '1sec'}
  };

  public current_week_slide = 1;
  public startHour = 9;
  public currentDate;

  constructor(private calendarService: CalendarService, schedulingMockData: SchedulingMockData) {
  }

  ngOnInit() {
    for (let i = 0, hour = 0; i < CalendarConstant.HOURS_IN_DAYS; i++) {
      hour = (i + this.startHour) % CalendarConstant.HOURS_IN_DAYS;
      this.hours.push(hour);
    }

    this.headerDates = [];
    for (let i = 0; i < CalendarConstant.DAYS_IN_WEEK; i++) {
      this.headerDates.push({[i]: ''});
    }

    this.currentDate = new Date();

    this.updateHeaderDates(this.currentDate, 1);
    this.initTimeSlots();
    let relevantWeek: Date = new Date(this.currentDate);
    relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());
    this.getDataByDateAndUpdateTimeSlots(relevantWeek);
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public resetCalendar(): void {
    this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
    this.clearSlotsByGivenViews([TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW]);
  }

  public showAvailableDates(availabilityDates, data): void {
    const EMPTY_VIEW = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
    const AVAILABLE_VIEW = TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW;

    this.calendarService.runOnDateObject(availabilityDates, (year, month, dayInMonth, hour) => {
      if (!this.calendarService.isCalendarContainDateParams(this.timeSlotData, year, month, dayInMonth, hour)) {
        console.log('ksCalendar:showAvailableDates - trying to show a date outside the ks-calendar');
        const timeSlotDate = new Date(year, month, dayInMonth, hour);
        console.log(`Please: Move to the correct week. TimeSlot date: ${timeSlotDate}`);
        this.showSpinner = false;
        return;
      }
      const currentView = this.timeSlotData[year][month][dayInMonth][hour].view;
      const canMarkAsAvailable = currentView === EMPTY_VIEW || currentView === AVAILABLE_VIEW;
      const isSlotAvailable = this.calendarService.isCalendarContainDateParams(availabilityDates, year, month, dayInMonth, hour);

      if (isSlotAvailable && canMarkAsAvailable) {
        const date = this.calendarService.convertToUTCMilisec(year, month, dayInMonth, hour);
        this.timeSlotData[year][month][dayInMonth][hour].data = {};
        this.timeSlotData[year][month][dayInMonth][hour].data.date = date;
        this.timeSlotData[year][month][dayInMonth][hour].view = AVAILABLE_VIEW;
      }
      // change the default timeSlot style
      this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[this.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
      this.showSpinner = false;
    });
  }

  public clearTimeSlot(date): void {
    const dateObj = new Date(date); // todo - use user's timezone
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const dayInMonth = dateObj.getDate();
    const hour = dateObj.getHours();
    if (this.calendarService.isCalendarContainDateParams(this.timeSlotData, year, month, dayInMonth, hour)) {
      this.timeSlotData[year][month][dayInMonth][hour].view = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
      this.timeSlotData[year][month][dayInMonth][hour].data = {};
    }
  }

  public clearSlotsByGivenViews(viewsToClear: number[]) {
    this.calendarService.runOnDateObject(this.timeSlotData, (year, month, dayInMonth, hour) => {
      if (viewsToClear.indexOf(this.timeSlotData[year][month][dayInMonth][hour].view) !== -1) {
        this.timeSlotData[year][month][dayInMonth][hour].view = TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY;
        this.timeSlotData[year][month][dayInMonth][hour].data = {};
      }
      this.timeSlotData[year][month][dayInMonth][hour].classToAdd = '';
    });
  }

  public addClassToTimeSlots(classToAdd, datesToIgnore?: number[]) {
    let slotDate;
    this.calendarService.runOnDateObject(this.timeSlotData, (year, month, dayInMonth, hour) => {
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

  private updateHeaderDates(dateObj, weekDirection) {
    const runningDate = new Date(dateObj);
    const currentDay = runningDate.getDay();
    runningDate.setDate(runningDate.getDate() - currentDay); // get this week sunday

    for (let i = 0; i < CalendarConstant.DAYS_IN_WEEK; i++) {
      this.headerDates[i] = new Date(runningDate.getTime());
      runningDate.setDate(runningDate.getDate() + 1 * weekDirection);
    }
  }

  private updateTimeSlots(week_slide, datesData) {
    this.timeSlotData[week_slide] = datesData;
  }

  public changeActiveWeek(weekDirection) {
    let newActiveWeek = (this.current_week_slide - weekDirection) % this.calendarWeeks.length;
    this.current_week_slide = newActiveWeek < 0 ? this.calendarWeeks.length - 1 : newActiveWeek;
    this.currentDate.setDate(this.currentDate.getDate() - weekDirection * 7);
    this.currentDate = new Date(this.currentDate);

    this.updateHeaderDates(this.currentDate, weekDirection);

    let left_style_pixels: any = '';
    Object.keys(this.weeksStyles).forEach((week_slide: string) => {
      left_style_pixels = this.weeksStyles[week_slide].left;
      left_style_pixels = +left_style_pixels.replace('px', '');

      if (left_style_pixels + weekDirection * 900 > (this.calendarWeeks.length - 2) * 900) {
        this.weeksStyles[week_slide].left = '-900px';
        this.weeksStyles[week_slide].transition = 'none';
      } else if (left_style_pixels + weekDirection * 900 < -900) {
        this.weeksStyles[week_slide].left = (this.calendarWeeks.length - 2) * 900 + 'px';
        this.weeksStyles[week_slide].transition = 'none';
      } else {
        this.weeksStyles[week_slide].transition = '0.7s';
        this.weeksStyles[week_slide].left = weekDirection * 900 + left_style_pixels + 'px';
      }
    });

    let relevantWeek: Date = new Date(this.currentDate);
    relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());
    this.getDataByDateAndUpdateTimeSlots(relevantWeek);
  }

  public initTimeSlots() {
    this.timeSlotData = {
      week_slide_0: {},
      week_slide_1: {},
      week_slide_2: {}
    };

    Object.keys(this.timeSlotData).forEach((weekSlide) => {
      for (let i = 0; i < CalendarConstant.DAYS_IN_WEEK; i++) {
        this.timeSlotData[weekSlide][i] = {};
        for (let j = 0; j < CalendarConstant.HOURS_IN_DAYS; j++) {
          this.timeSlotData[weekSlide][i][j] = {data: '', dynamicDefaultView: this.dynamicDefaultView};
        }
      }
    });
  }

  public getDataByDateAndUpdateTimeSlots(startDate: Date) {
    return SchedulingMockData.getDataByDate(startDate)
      .subscribe((data) => {
        let runningDate: Date = new Date(startDate);

        for (let i = 0; i < CalendarConstant.DAYS_IN_WEEK; i++) {
          this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i] = data[runningDate.getFullYear()][runningDate.getMonth()][runningDate.getDate()];
          runningDate.setDate(runningDate.getDate() + 1);
          Object.keys(this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i]).forEach(day => {
            this.timeSlotData[this.calendarWeeks[this.current_week_slide]][i][day].dynamicDefaultView = this.dynamicDefaultView;
          });
        }
      });
  }
}

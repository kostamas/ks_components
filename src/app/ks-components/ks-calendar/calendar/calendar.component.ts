import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {CalendarConstant} from '../constants/calendar.constant';
import {CalendarService} from '../services/calendarservice';
import {SchedulingConstant} from '../constants/scheduling.constant';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnChanges, OnInit {
  public headerDates = {};
  public activeWeek = 0;
  public hours = [];
  public timeSlotData = {}; // all slots ks-components get this object as an input.
  public showCancelButton = false;
  public showSpinner = false;
  public SCHEDULING_VIEWS = SchedulingConstant.SCHEDULING_VIEWS;
  public DYNAMIC_DEFAULT_VIEWS = TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS;
  public dynamicDefaultView = {timeSlotClass: ''};
  public dynamicDefaultViewsMap = {
    [TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY]: 'empty-slot',
    [TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE]: 'unavailable-slot'
  };

  public onLessonScheduled: BehaviorSubject<any>;
  public onInitialScheduleLessonRemoved: BehaviorSubject<any>;
  public onReset: BehaviorSubject<any>;

  public calendarRows = new Array(24);
  public calendarColumns = new Array(21);

  @Input() timeSlotView = TimeSlotConstant.TIME_SLOT_VIEWS.LESSON_VIEW; // todo - change to znk ks-calendar view
  @Input() startHour = 9; // todo - take from config.
  @Input() lessons: any[];
  @Input() schedulingView;
  @Input() plan;

  @Output() pendingLessonEvent: EventEmitter<any> = new EventEmitter();

  constructor(private translate: TranslateService, private calendarService: CalendarService, private datePipe: DatePipe) {
    this.onLessonScheduled = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.onInitialScheduleLessonRemoved = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.onReset = <BehaviorSubject<any>>new BehaviorSubject(null);
  }

  ngOnInit() {
    // this.initCalendar(this.activeWeek);
    this.initCalendar();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  public resetCalendar(): void {
    this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
    this.clearSlotsByGivenViews([TimeSlotConstant.TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW]);
    this.showCancelButton = false;
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
        this.timeSlotData[year][month][dayInMonth][hour].data.lesson = Object.assign({}, data);
        this.timeSlotData[year][month][dayInMonth][hour].data.date = date;
        this.timeSlotData[year][month][dayInMonth][hour].view = AVAILABLE_VIEW;
      }
      // change the default timeSlot style
      this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[this.DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
      this.showCancelButton = true;
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

  // initialize header dates, side hours and the timeSlotData
  // private initCalendar(weekNum) {
  //   let i, year, month, dayInMonth, hour = 0;
  //   const runningDate = new Date();
  //   const currentDay = runningDate.getDay();
  //   runningDate.setDate(runningDate.getDate() - currentDay + (weekNum * 7));
  //   if (!this.headerDates[String(weekNum)]) {
  //     this.headerDates[String(weekNum)] = [];
  //   }
  //
  //   for (i = 0; i < CalendarConstant.DAYS_IN_WEEK; i++) {
  //     year = runningDate.getFullYear();
  //     month = runningDate.getMonth();
  //     dayInMonth = runningDate.getDate();
  //
  //     this.headerDates[String(weekNum)].push(new Date(runningDate.getTime()));
  //     this.initTimeSlotData(year, month, dayInMonth);
  //
  //     runningDate.setDate(runningDate.getDate() + 1);
  //     hour = 0;
  //   }
  //
  //   if (this.hours && this.hours.length === 0) {
  //     for (i = 0; i < CalendarConstant.HOURS_IN_DAYS; i++) {
  //       hour = (i + this.startHour) % CalendarConstant.HOURS_IN_DAYS;
  //       this.hours.push(hour);
  //     }
  //   }
  // }

  private initCalendar(){

  }

  private initTimeSlotData(year, month, dayInMonth) {
    if (!this.timeSlotData[year]) {
      this.timeSlotData[year] = {};
    }
    if (!this.timeSlotData[year][month]) {
      this.timeSlotData[year][month] = {};
    }
    if (!this.timeSlotData[year][month][dayInMonth]) {
      this.timeSlotData[year][month][dayInMonth] = {};
    }
    for (let i = 0; i < CalendarConstant.HOURS_IN_DAYS; i++) {
      const hour = (i + this.startHour) % 24;
      if (!this.timeSlotData[year][month][dayInMonth][hour]) {
        this.timeSlotData[year][month][dayInMonth][hour] = {
          dynamicDefaultView: this.dynamicDefaultView,
          view: TimeSlotConstant.TIME_SLOT_VIEWS.EMPTY
        };
      }
    }
  }

  // private changeActiveWeek(weekDirection) {
  //   const newActiveWeek = this.activeWeek + weekDirection; // todo - very slow, improve performance.
  //   if (!this.headerDates[String(newActiveWeek)]) {
  //     this.initCalendar();
  //   }
  //   this.activeWeek = newActiveWeek;
  // }
}

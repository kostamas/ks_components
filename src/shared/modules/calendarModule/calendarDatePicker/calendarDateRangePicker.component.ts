import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import * as moment from 'moment';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {CalendarDatePickerService} from './calendarDatePicker.service';

@Component({
  selector: 'app-calendar-date-range-picker',
  templateUrl: './calendarDateRangePicker.html',
  styleUrls: ['./calendarDateRangePicker.scss']
})
export class CalendarDateRangePickerComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  public NUM_OF_CELLS: number = 40;
  public daysToSelect: any;
  public moment: any = moment;
  public selectedDay: any;
  public daysWrapperPosition: any;
  public unSubscribe$: any = new Subject();
  public canSelect: boolean;

  @Input() date: any;
  @Input() disableRangeSelection: any;
  @Input() externalSelection$: any;

  @ViewChild('daysToSelectRef') daysToSelectRef: any;

  constructor(private calendarDatePickerService: CalendarDatePickerService) {
  }

  ngOnInit(): void {
    this.initDaysToSelect();
    if (!this.disableRangeSelection) {
      this.initSelectRangeHandler();
    }
    if (this.externalSelection$) {
      this.initExternalSelectionHandler();
    }
    this.initSelectDateHandler();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.date && !changes.date.firstChange) {
      this.initDaysToSelect();
    }
  }

  ngAfterViewInit(): void {
    this.daysWrapperPosition = this.daysToSelectRef.nativeElement.getClientRects()[0];
  }

  initSelectRangeHandler(): void {
    fromEvent(this.daysToSelectRef.nativeElement, 'click')  // todo - duplication with multiDatePicker
      .pipe(
        takeUntil(this.unSubscribe$),
        tap(this.tapHandler),
        switchMap(this.switchToMouseMove))
      .subscribe(this.mark.bind(this));
  }

  tapHandler = (event: any) => {
    this.canSelect = !this.canSelect;
    if (this.canSelect) {
      this.unMark();
      const {clientX, clientY} = event;
      this.mark({clientX, clientY});
    }
  };

  switchToMouseMove = () => {
    return fromEvent(this.daysToSelectRef.nativeElement, 'mousemove')
      .pipe(takeUntil(fromEvent(this.daysToSelectRef.nativeElement, 'click')));
  };

  initSelectDateHandler(): void {
    this.calendarDatePickerService.selectDate$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(() => setTimeout(() => {
          const date = moment(this.date);

          const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
          const canUpdateDaysStyle = firstDate && lastDate
            && (firstDate.year() < date.year() || (firstDate.year() === date.year() && firstDate.month() <= date.month()))
            && (lastDate.year() > date.year() || (lastDate.year() === date.year() && lastDate.month() >= date.month()));

          this.resetDaysToSelectStyle();
          if (canUpdateDaysStyle) {
            this.updateDaysStyle();
          }
        })
      );
  }

  initExternalSelectionHandler(): void {
    this.externalSelection$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((data: any) => data.clear ? this.unMark() : this.mark(data));
  }

  mark({clientX, clientY}): void {
    const {width, height, left, top} = this.daysWrapperPosition;
    if (clientX > left + width || clientX < left || clientY > top + height || clientY < top) {
      return;
    }

    const daysInWeek = 7;
    const cellSize = width / daysInWeek;
    const column = Math.floor((clientX - left) / cellSize);
    const row = Math.floor((clientY - top) / cellSize);
    const index = row * daysInWeek + column;

    if (!this.daysToSelect[index]) {
      return;
    }

    const {dateMonth, dateYear, todayYear, todayMonth, today} = this.getDatesData();

    const selectedDate = moment([dateYear, dateMonth, this.daysToSelect[index].dayNumber]);
    const isPast = (dateYear < todayYear || (dateYear === todayYear && dateMonth < todayMonth)) || today.diff(selectedDate, 'days') > 0;

    if (!isPast && this.daysToSelect[index] && this.daysToSelect[index] !== this.selectedDay) {
      this.selectedDay = this.daysToSelect[index];
      const date = moment(this.date);
      const selectedDate = moment([date.year(), date.month(), this.daysToSelect[index].dayNumber]);
      this.calendarDatePickerService.selectDate$.next(selectedDate);
    }
  };

  unMark(): void {
    this.resetDaysToSelectStyle();
    this.calendarDatePickerService.selectedRange = {date1: null, date2: null};
    this.selectedDay = null;
  }

  initDaysToSelect(): void {
    const {dateMonth, dateYear, todayYear, todayMonth, todayDayNumber} = this.getDatesData();
    const firstDay = new Date(dateYear, dateMonth, 1).getDay();
    const numOfDays = new Date(dateYear, dateMonth + 1, 0).getDate();
    const dateRunner = moment([dateYear, dateMonth]);

    this.daysToSelect = [];
    for (let i = 0, day = 1; i < this.NUM_OF_CELLS; i++) {
      const isEmpty = i < firstDay || i >= numOfDays + firstDay;
      this.daysToSelect.push({
        isEmpty: isEmpty,
        dayNumber: isEmpty ? -1 : day,
        isSelected: false,
        today: todayMonth === dateMonth && todayDayNumber === day,
        past: todayYear > dateYear || (todayYear === dateYear && todayMonth > dateMonth)
          || (todayYear === dateYear && todayMonth === dateMonth && todayDayNumber > day)
      });

      if (!isEmpty) {
        day++;
      }
      dateRunner.add(1, 'day');
    }
  }

  updateDaysStyle(): void {
    const {dateMonth, dateYear, todayYear, todayMonth, todayDayNumber} = this.getDatesData();

    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const firstDayMonth = firstDate.month();
    const lastDayMonth = lastDate.month();
    const firstDay = firstDayMonth === dateMonth ? firstDate.date() : 0;
    const lastDay = lastDayMonth === dateMonth ? lastDate.date() : 31;
    const dateRunner = moment([dateYear, dateMonth]);

    for (let i = 0; i < this.daysToSelect.length; i++) {
      if (this.daysToSelect[i].dayNumber >= firstDay && this.daysToSelect[i].dayNumber <= lastDay) {
        this.daysToSelect[i].isSelected = true;
        this.daysToSelect[i].firstDay = dateMonth === firstDayMonth && this.daysToSelect[i].dayNumber === firstDay;
        this.daysToSelect[i].lastDay = dateMonth === lastDayMonth && this.daysToSelect[i].dayNumber === lastDay;
      }
      this.daysToSelect[i].today = todayMonth === dateMonth && todayDayNumber === this.daysToSelect[i].dayNumber;
      dateRunner.add(1, 'day');
    }

    for (let i = 0; i < this.NUM_OF_CELLS; i++) {
      if (!this.daysToSelect[i].isEmpty) {
        this.daysToSelect[i].past = todayYear > dateYear || (todayYear === dateYear && todayMonth > dateMonth)
          || (todayYear === dateYear && todayMonth === dateMonth && todayDayNumber > this.daysToSelect[i].dayNumber)
      }
    }

    this.daysToSelect.forEach((day, index) => day.classToAdd += this.getBorderClass(day.dayNumber, index));
  }

  getBorderClass(dayNumber: number, index: number): string {
    const {daysToSelect} = this;
    if (!this.daysToSelect[index].isSelected) {
      return ' ';
    }

    let borderClass = '';
    const numOfLastRow = Math.ceil(daysToSelect.filter((day, _index) => _index < 7 || day.dayNumber > -1).length / 7) - 1;
    if (index % 7 === 0 || (index % 7 !== 0 && daysToSelect[index - 1] && !daysToSelect[index - 1].isSelected)) {
      borderClass += 'border-left ';
    }
    if (Math.floor(index / 7) === 0 || (index / 7 !== 0 && daysToSelect[index - 7] && !daysToSelect[index - 7].isSelected)) {
      borderClass += 'border-top ';
    }
    if (index % 7 === 6 || (index % 7 !== 6 && daysToSelect[index + 1] && !daysToSelect[index + 1].isSelected)) {
      borderClass += 'border-right ';
    }
    if (index >= (7 * numOfLastRow) || (index < (7 * numOfLastRow) && (!daysToSelect[index + 7] || !daysToSelect[index + 7].isSelected))) {
      borderClass += 'border-bottom ';
    }

    return borderClass;
  }

  getDatesData() {
    const date = moment(this.date);
    const today = moment();
    const dateMonth = date.month();
    const dateYear = date.year();
    const todayYear = today.year();
    const todayMonth = today.month();
    const todayDayNumber = today.date();
    return {today, dateMonth, dateYear, todayYear, todayMonth, todayDayNumber};
  }

  getDayClass(day: any): string {
    let classToAdd = day.classToAdd ? day.classToAdd : ' ';
    classToAdd += day.isSelected ? ' selected' : '';
    classToAdd += day.firstDay ? ' first-day' : '';
    classToAdd += day.lastDay ? ' last-day' : '';
    classToAdd += day.today ? ' today' : '';
    classToAdd += day.past ? ' past' : '';
    return classToAdd;
  }

  resetDaysToSelectStyle(): void {
    this.daysToSelect.forEach(day => {
      day.isSelected = false;
      day.classToAdd = ' ';
      day.firstDay = false;
      day.lastDay = false;
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
  }
}

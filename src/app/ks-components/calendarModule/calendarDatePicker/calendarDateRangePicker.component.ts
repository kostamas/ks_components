import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
  public canSelect: boolean;  // todo - find better solution

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
        switchMap(this.switchMapHandler))
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

  switchMapHandler = () => {
    return fromEvent(this.daysToSelectRef.nativeElement, 'mousemove')
      .pipe(takeUntil(fromEvent(this.daysToSelectRef.nativeElement, 'click')));
  };

  initSelectDateHandler(): void {
    this.calendarDatePickerService.selectDate$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(() => setTimeout(() => {
          const {firsDate, lastDate} = this.calendarDatePickerService.selectedRange;
          const date = moment(this.date);

          const canUpdateDaysStyle = firsDate && lastDate
            && (firsDate.year() < date.year() || (firsDate.year() === date.year() && firsDate.month() <= date.month()))
            && (lastDate.year() > date.year() || (lastDate.year() === date.year() && lastDate.month() >= date.month()));

          this.resetDaysToSelectStyle();
          if (canUpdateDaysStyle) {
            this.updateDaysStyle();
          }
        })
      );
  }

  initExternalSelectionHandler(): void {
    this.externalSelection$.subscribe((data: any) => {
      if (data.clear) {
        this.unMark();
      } else {
        this.mark(data);
      }
    });
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

    if (this.daysToSelect[index] && this.daysToSelect[index] !== this.selectedDay) {
      this.selectedDay = this.daysToSelect[index];
      const date = moment(this.date);
      const selectedDate = moment([date.year(), date.month(), this.daysToSelect[index].dayNumber]);
      this.calendarDatePickerService.selectDate$.next(selectedDate);
    }
  };

  unMark(): void {
    this.resetDaysToSelectStyle();
    this.calendarDatePickerService.selectedRange = {firsDate: null, lastDate: null};
    this.selectedDay = null;
  }

  initDaysToSelect(): void {
    const date = moment(this.date);
    const firstDay = new Date(date.year(), date.month(), 1).getDay();
    const numOfDays = new Date(date.year(), date.month() + 1, 0).getDate();
    const today = moment();
    const dateRunner = moment([date.year(), date.month()]);

    this.daysToSelect = [];
    for (let i = 0, day = 1; i < this.NUM_OF_CELLS; i++) {
      const isEmpty = i < firstDay || i >= numOfDays + firstDay;
      this.daysToSelect.push({
        isEmpty: isEmpty,
        dayNumber: isEmpty ? -1 : day++,
        isSelected: false,
        today: Math.ceil(today.diff(dateRunner) / 86400000) === 0
      });
      dateRunner.add(1, 'day');
    }
  }

  updateDaysStyle(): void {
    const date = moment(this.date);
    const {selectedRange} = this.calendarDatePickerService;

    const firstDayMonth = selectedRange.firsDate.month();
    const lastDayMonth = selectedRange.lastDate.month();
    const firstDay = firstDayMonth === date.month() ? selectedRange.firsDate.date() : 0;
    const lastDay = lastDayMonth === date.month() ? selectedRange.lastDate.date() : 31;
    const today = moment();
    const dateRunner = moment([date.year(), date.month()]);

    for (let i = 0; i < this.daysToSelect.length; i++) {
      if (this.daysToSelect[i].dayNumber >= firstDay && this.daysToSelect[i].dayNumber <= lastDay) {
        this.daysToSelect[i].isSelected = true;
        this.daysToSelect[i].firstDay = date.month() === firstDayMonth && this.daysToSelect[i].dayNumber === firstDay;
        this.daysToSelect[i].lastDay = date.month() === lastDayMonth && this.daysToSelect[i].dayNumber === lastDay;
      }
      this.daysToSelect[i].today = Math.ceil(today.diff(dateRunner) / 86400000) === 0;
      dateRunner.add(1, 'day');
    }

    this.daysToSelect.forEach((day, index) => day.classToAdd += this.getBorderClass(day.dayNumber, index));
  }

  getBorderClass(dayNumber: number, index: number): string {
    const {daysToSelect} = this;
    if (!this.daysToSelect[index].isSelected) {
      return ' ';
    }

    let borderClass = '';
    const numOfRows = Math.ceil(daysToSelect.length / 7);
    if (index % 7 === 0 || (index % 7 !== 0 && daysToSelect[index - 1] && !daysToSelect[index - 1].isSelected)) {
      borderClass += 'border-left ';
    }
    if (Math.floor(index / 7) === 0 || (index / 7 !== 0 && daysToSelect[index - 7] && !daysToSelect[index - 7].isSelected)) {
      borderClass += 'border-top ';
    }
    if (index % 7 === 6 || (index % 7 !== 6 && daysToSelect[index + 1] && !daysToSelect[index + 1].isSelected)) {
      borderClass += 'border-right ';
    }
    if (index >= 7 * (numOfRows - 2) || (index < 7 * (numOfRows - 2) && daysToSelect[index + 7] && !daysToSelect[index + 7].isSelected)) {
      borderClass += 'border-bottom ';
    }

    return borderClass;
  }

  getDayClass(day: any): string {
    let classToAdd = day.classToAdd ? day.classToAdd : ' ';
    classToAdd += day.isSelected ? ' selected' : '';
    classToAdd += day.firstDay ? ' first-day' : '';
    classToAdd += day.lastDay ? ' last-day' : '';
    classToAdd += day.today ? ' today' : '';
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

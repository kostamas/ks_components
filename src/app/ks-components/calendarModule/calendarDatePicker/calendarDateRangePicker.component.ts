import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import * as moment from 'moment';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {CalendarDatePickerService} from './calendarDatePicker.service';

@Component({
  selector: 'app-calendar-date-range-picker',
  templateUrl: './calendarDateRangePicker.html',
  styleUrls: ['./calendarDateRangePicker.scss']
})
export class CalendarDateRangePickerComponent implements OnInit, OnDestroy, AfterViewInit {
  public NUM_OF_CELLS: number = 40;
  public daysToSelect: any;
  public moment: any = moment;
  public selectedDay: any;
  public daysWrapperPosition: any;

  @Input() date: any;
  @Input() disableRangeSelection: any;
  @Input() externalSelection$: any;     // todo - find better name

  @ViewChild('daysToSelectRef') daysToSelectRef: any;

  constructor(private calendarDatePickerService: CalendarDatePickerService) {
  }

  ngOnInit(): void {
    this.initDaysToSelect();

    if (!this.disableRangeSelection) {
      this.initSelectRangeHandler();
    }

    this.calendarDatePickerService.selectDate$.subscribe(() => {
      setTimeout(() => {
        const {selectedRange} = this.calendarDatePickerService;
        const {date} = this;

        this.daysToSelect.forEach(day => day.isSelected = false);

        const canUpdateDaysStyle = selectedRange.firsDate && selectedRange.lastDate
          && selectedRange.firsDate.month() <= moment(date).month()
          && selectedRange.lastDate.month() >= moment(date).month();

        if (canUpdateDaysStyle) {
          this.updateDaysStyle();
        }
      });
    });

    if (this.externalSelection$) {
      this.externalSelection$.subscribe((data: any) => {
        if (data.clear) {
          this.unMark();
        } else {
          this.mark(data);
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.daysWrapperPosition = this.daysToSelectRef.nativeElement.getClientRects()[0];
  }

  initSelectRangeHandler(): void {
    fromEvent(this.daysToSelectRef.nativeElement, 'mousedown')
      .pipe(
        tap(() => this.unMark()),
        switchMap(() => {
          return fromEvent(this.daysToSelectRef.nativeElement, 'mousemove')
            .pipe(takeUntil(fromEvent(this.daysToSelectRef.nativeElement, 'click')));
        }))
      .subscribe(this.mark.bind(this));
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
    this.daysToSelect.forEach(day => day.isSelected = false);
    this.calendarDatePickerService.selectedRange = {firsDate: null, lastDate: null};
  }

  initDaysToSelect(): void {
    const date = new Date(this.date);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    this.daysToSelect = [];
    for (let i = 0, day = 1; i < this.NUM_OF_CELLS; i++) {
      const isEmpty = i < firstDay || i >= numOfDays + firstDay;
      this.daysToSelect.push({isEmpty: isEmpty, dayNumber: isEmpty ? -1 : day++, isSelected: false});
    }
  }

  updateDaysStyle(): void {
    const {date} = this;
    const {selectedRange} = this.calendarDatePickerService;

    let firstDay = selectedRange.firsDate.month() === moment(date).month() ? selectedRange.firsDate.date() : 0;
    const lastDay = selectedRange.lastDate.month() === moment(date).month() ? selectedRange.lastDate.date() : 31;

    for (let i = 0; i < this.daysToSelect.length; i++) {
      if (this.daysToSelect[i].dayNumber >= firstDay && this.daysToSelect[i].dayNumber <= lastDay) {
        this.daysToSelect[i].isSelected = true;
        firstDay++;
      }
    }
  }

  ngOnDestroy(): void {

  }
}

import {
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,
} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import * as momentNs from 'moment';

const moment = momentNs;
import {filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {CalendarDatePickerService} from '../../../services/calendarDatePicker.service';
import {JsUtils} from '../../../utils/jsUtils';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';
import {ICalendarClickPosition, ICalendarDay, IFromTo} from '../../../types/calendar';
import {DATE_FORMAT} from '../../../constants/shared.constant';

@Component({
  selector: 'app-calendar-date-range-picker',
  templateUrl: './calendarDateRangePicker.html',
  styleUrls: ['./calendarDateRangePicker.scss']
})
export class CalendarDateRangePickerComponent implements OnInit, OnDestroy, OnChanges {
  public NUM_OF_CELLS: number = 40;
  public daysToSelect: ICalendarDay[];
  public moment: any = moment;
  public selectedDay: ICalendarDay;
  public unSubscribe$: Subject<any> = new Subject();
  public canSelect: boolean;
  public SVG_ICONS: ISvgIcons = SVG_ICONS;

  @Input() date: string;
  @Input() dateFormat: string;
  @Input() disableRangeSelection: boolean;
  @Input() allowPastDates: boolean = false;
  @Input() externalSelection$: Subject<ICalendarClickPosition>;
  @Input() rangeSize: number = 31;
  @Input() isSingleSelection: boolean;
  @Input() disableMonthControl: boolean;
  @Input() disabledRanges: IFromTo | IFromTo[] = [];
  @Input() detectChangesManually: boolean;

  @Output() selectedRange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('daysToSelectRef') daysToSelectRef: ElementRef;

  constructor(private calendarDatePickerService: CalendarDatePickerService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initSelectDateHandler();

    if (!this.disableRangeSelection) {
      this.initSelectRangeHandler();
    }
    if (this.externalSelection$) {
      this.initExternalSelectionHandler();
    }
    if (!this.date) {
      this.date = moment().format(this.dateFormat ? this.dateFormat : DATE_FORMAT);
    }
    if (this.isSingleSelection) {
      this.rangeSize = 1;
    }

    this.initDaysToSelect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.date && !changes.date.firstChange) {
      this.initDaysToSelect();
    }
  }

  initSelectRangeHandler(): void {
    if (this.isSingleSelection) {
      fromEvent(this.daysToSelectRef.nativeElement, 'click')
        .pipe(
          takeUntil(this.unSubscribe$),
        )
        .subscribe(this.mark.bind(this));
    } else {
      fromEvent(this.daysToSelectRef.nativeElement, 'click')  // todo - duplication with multiDatePicker
        .pipe(
          takeUntil(this.unSubscribe$),
          tap(this.tapHandler),
          switchMap(this.switchToMouseMove))
        .subscribe(this.mark.bind(this));
    }
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
      .pipe(
        takeUntil(this.unSubscribe$),
        filter(date => JsUtils.isDefineAndNotNull(date))
      )
      .subscribe(selectedDate => setTimeout(() => {
        if (selectedDate) {
          if (this.isSingleSelection) {
            this.date = selectedDate.format(this.dateFormat ? this.dateFormat : DATE_FORMAT);
            this.singleSelectionHandler(selectedDate);
          } else {
            this.selectRangeHandler();
          }
        }
      }));
  }

  initExternalSelectionHandler(): void {
    this.externalSelection$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((data: any) => data.clear ? this.unMark() : this.mark(data));
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
        today: todayMonth === dateMonth && todayDayNumber === day && todayYear === dateYear && !isEmpty,
        past: !this.allowPastDates && (todayYear > dateYear || (todayYear === dateYear && todayMonth > dateMonth)
          || (todayYear === dateYear && todayMonth === dateMonth && todayDayNumber > day)),
        isDisabled: this.calcDisabledRange(moment([dateYear, dateMonth, day]))
      });
      if (!isEmpty) {
        day++;
      }
      dateRunner.add(1, 'day');
    }
  }

  selectRangeHandler(): void {
    const date = moment(this.date, this.dateFormat ? this.dateFormat : DATE_FORMAT);
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const canUpdateDaysStyle = firstDate && lastDate
      && (firstDate.year() < date.year() || (firstDate.year() === date.year() && firstDate.month() <= date.month()))
      && (lastDate.year() > date.year() || (lastDate.year() === date.year() && lastDate.month() >= date.month()));

    this.resetDaysToSelectStyle();
    if (canUpdateDaysStyle) {
      this.updateDaysStyle();
    }
  }

  updateCalendarDates(direction: number): void {
    this.date = moment(this.date, this.dateFormat ? this.dateFormat : DATE_FORMAT).add(direction, 'month').format(this.dateFormat ? this.dateFormat : DATE_FORMAT);
    this.initDaysToSelect();
  }

  singleSelectionHandler(selectedDate: any): void {
    this.resetDaysToSelectStyle();
    this.updateDaysStyle(selectedDate);
  }

  mark({clientX, clientY}): void {
    const {width, height, left, top} = this.daysToSelectRef.nativeElement.getClientRects()[0];
    if (clientX > left + width || clientX < left || clientY > top + height || clientY < top) {
      return;
    }

    const daysInWeek = 7;
    const cellSize = width / daysInWeek;
    const column = Math.floor((clientX - left) / cellSize);
    const row = Math.floor((clientY - top) / cellSize);
    const index = row * daysInWeek + column;

    if (!this.daysToSelect[index] || this.daysToSelect[index].isEmpty) {
      return;
    }

    const {dateMonth, dateYear, todayYear, todayMonth, today} = this.getDatesData();
    const selectedDate = moment([dateYear, dateMonth, this.daysToSelect[index].dayNumber]);
    const selectedRange = this.calendarDatePickerService.selectedRange;
    let isDisabled = this.daysToSelect[index].isDisabled;
    if (!isDisabled && (selectedRange.date1 || selectedRange.date2)) {
      isDisabled = this.isOverlapWithDisabledRanges(selectedRange.date1 || selectedRange.date2, selectedDate);
    }

    const isPast = !this.allowPastDates && ((dateYear < todayYear || (dateYear === todayYear && dateMonth < todayMonth)) || today.diff(selectedDate, 'days') > 0);
    if (!isDisabled && !isPast && this.daysToSelect[index] && this.daysToSelect[index] !== this.selectedDay) {
      this.selectedDay = this.daysToSelect[index];
      const date = moment(this.date, this.dateFormat ? this.dateFormat : DATE_FORMAT);
      const _selectedDate = moment([date.year(), date.month(), this.daysToSelect[index].dayNumber]);
      this.calendarDatePickerService.selectDate$.next(_selectedDate);
      this.selectedRange.next(_selectedDate.format(this.dateFormat ? this.dateFormat : DATE_FORMAT));
    }
    if(this.detectChangesManually){
      setTimeout(() => this.changeDetector.detectChanges());
    }
  };

  unMark(): void {
    this.resetDaysToSelectStyle();
    this.calendarDatePickerService.selectedRange = {date1: null, date2: null};
    this.selectedDay = null;
  }

  calcDisabledRange(selectedDateToCompare: any): boolean {
    let disabledRanges = [];
    if (this.disabledRanges) {
      disabledRanges = Array.isArray(this.disabledRanges) ? this.disabledRanges : [this.disabledRanges];
    }
    const arrLength = disabledRanges.length;
    let isDisabled = false;
    let isDisabledFrom = false;
    let isDisabledTo = false;

    for (let i = 0; i < arrLength && !isDisabled; i++) {
      if (disabledRanges[i].from) {
        const from = moment(disabledRanges[i].from, this.dateFormat ? this.dateFormat : DATE_FORMAT);
        const fromToCompare = moment([from.year(), from.month(), from.date()]);
        isDisabledFrom = selectedDateToCompare.diff(fromToCompare) >= 0;
      }
      if (!isDisabled && disabledRanges[i].to) {
        const to = moment(disabledRanges[i].to, this.dateFormat ? this.dateFormat : DATE_FORMAT);
        const toToCompare = moment([to.year(), to.month(), to.date()]);
        isDisabledTo = selectedDateToCompare.diff(toToCompare) <= 0;
      }

      if (disabledRanges[i].from && disabledRanges[i].to) {
        isDisabled = isDisabledFrom && isDisabledTo;
      } else {
        isDisabled = isDisabledFrom || isDisabledTo;
      }

    }
    return isDisabled;
  }

  isOverlapWithDisabledRanges(fromOrTo: any, selectedDate: any): boolean {
    let disabledRanges = [];
    if (this.disabledRanges) {
      disabledRanges = Array.isArray(this.disabledRanges) ? this.disabledRanges : [this.disabledRanges];
    }
    const arrLength = disabledRanges.length;
    let isDisabled: boolean = false;

    for (let i = 0; i < arrLength && !isDisabled; i++) {
      const from = disabledRanges[i].from;
      const to = disabledRanges[i].to;
      if (from && to) {
        if (fromOrTo.diff(moment(from, DATE_FORMAT)) < 0 && selectedDate.diff(moment(from, DATE_FORMAT)) > 0
          || fromOrTo.diff(moment(to, DATE_FORMAT)) > 0 && selectedDate.diff(moment(to, DATE_FORMAT)) < 0) {
          isDisabled = true;
        }
      }
    }
    return isDisabled;
  }

  updateDaysStyle(selectedDate?: any): void {
    const {dateMonth, dateYear, todayYear, todayMonth, todayDayNumber} = this.getDatesData();
    let firstDay;
    let lastDay;
    let firstDayMonth;
    let lastDayMonth;
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();

    if (this.isSingleSelection) {
      firstDay = selectedDate.date();
      lastDay = selectedDate.date();
      firstDayMonth = selectedDate.month();
      lastDayMonth = selectedDate.month();
    } else {
      firstDayMonth = firstDate.month();
      lastDayMonth = lastDate.month();
      firstDay = firstDayMonth === dateMonth ? firstDate.date() : 0;
      lastDay = lastDayMonth === dateMonth ? lastDate.date() : 31;
    }

    const dateRunner = moment([dateYear, dateMonth]);

    for (let i = 0; i < this.daysToSelect.length; i++) {
      if (this.daysToSelect[i].dayNumber >= firstDay && this.daysToSelect[i].dayNumber <= lastDay) {
        this.daysToSelect[i].isSelected = true;
        this.daysToSelect[i].firstDay = dateMonth === firstDayMonth && this.daysToSelect[i].dayNumber === firstDay;
        this.daysToSelect[i].lastDay = dateMonth === lastDayMonth && this.daysToSelect[i].dayNumber === lastDay;
      }
      this.daysToSelect[i].today = todayMonth === dateMonth && todayYear === dateYear && todayDayNumber === this.daysToSelect[i].dayNumber;
      dateRunner.add(1, 'day');
    }

    for (let i = 0; i < this.NUM_OF_CELLS; i++) {
      if (!this.daysToSelect[i].isEmpty) {
        this.daysToSelect[i].past = !this.allowPastDates && (todayYear > dateYear || (todayYear === dateYear && todayMonth > dateMonth)
          || (todayYear === dateYear && todayMonth === dateMonth && todayDayNumber > this.daysToSelect[i].dayNumber));
      }
    }

    this.daysToSelect.forEach((day, index) => day.classToAdd += this.getBorderClass(day.dayNumber, index));
    if(this.detectChangesManually){
      setTimeout(() => this.changeDetector.detectChanges());
    }
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

  getDatesData(): any {
    const date = moment(this.date, this.dateFormat ? this.dateFormat : DATE_FORMAT);
    const today = moment();
    const dateYear = date.year();
    const dateMonth = date.month();
    const todayYear = today.year();
    const todayMonth = today.month();
    const todayDayNumber = today.date();
    return {today, dateMonth, dateYear, todayYear, todayMonth, todayDayNumber};
  }

  getDayClass(day: ICalendarDay): string {
    let classToAdd = day.classToAdd ? day.classToAdd : ' ';
    classToAdd += day.isDisabled ? ' day-disabled' : '';
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

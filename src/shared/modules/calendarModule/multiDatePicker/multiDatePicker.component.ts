import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {fromEvent, merge, Subject} from 'rxjs';
import {filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {CalendarDatePickerService} from '../calendarDatePicker/calendarDatePicker.service';
import {SVG_ICONS} from "../../svgIconModule/svg-icons.const";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AbstractControl} from '@angular/forms';
import {isEmpty} from "../../../utils/jsUtils";

@Component({
  selector: 'app-multi-date-picker',
  templateUrl: './multiDatePicker.html',
  styleUrls: ['./multiDatePicker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiDatePickerComponent implements OnInit, OnDestroy {
  public selection$: Subject<ICalendarClickPosition> = new Subject();
  public cancelSelection$: Subject<boolean> = new Subject();
  public moment: any = moment;
  public calendarDates: string[];
  public unSubscribe$: Subject<any> = new Subject();
  public DATE_INPUT_FORMAT: string = 'DD/MM/YYYY';
  public canSelect: boolean;
  public SVG_ICONS: any = SVG_ICONS;
  public formGroup: FormGroup;
  private rgx = new RegExp('[0-9]{2}/[0-9]{2}/20[0-9]{2}');
  private RANGE_SIZE = 31;

  @ViewChild('multiDatePicker') multiDatePicker: any;
  @Input('config') config?: any;
  @Output('onSelectRange') onSelectRange: EventEmitter<any> = new EventEmitter();

  constructor(private calendarDatePickerService: CalendarDatePickerService, private fBuilder: FormBuilder) {
    this.formGroup = fBuilder.group({
      from: [null, this.dateFormatValidator],
      to: [null, this.dateFormatValidator]
    }, {validator: this.rangeValidation});
  }

  ngOnInit(): void {
    const now = moment();
    this.calendarDates = [
      now.format(this.calendarDatePickerService.DATE_FORMAT),
      now.add(1, 'month').format(this.calendarDatePickerService.DATE_FORMAT),
      now.add(1, 'month').format(this.calendarDatePickerService.DATE_FORMAT)
    ];

    this.initMouseEventsHandler();
    this.initSelectedRangeHandler();

    this.formGroup.valueChanges.subscribe(() => setTimeout(() => this.rangeFromInputHandler()));

    if (this.config && this.config.selectedRange) {
      setTimeout(() => {
        const calendarFirstDate = moment(this.config.selectedRange.firstDate);
        this.calendarDates = [
          calendarFirstDate.format(this.calendarDatePickerService.DATE_FORMAT),
          calendarFirstDate.add(1, 'month').format(this.calendarDatePickerService.DATE_FORMAT),
          calendarFirstDate.add(1, 'month').format(this.calendarDatePickerService.DATE_FORMAT)
        ];
        const {firstDate, lastDate} = this.config.selectedRange;
        this.calendarDatePickerService.selectedRange = {date1: moment(firstDate), date2: moment(lastDate)};
        this.calendarDatePickerService.selectDate$.next(moment(firstDate));
        this.calendarDatePickerService.selectDate$.next(moment(lastDate));
      })
    }
  }

  initMouseEventsHandler(): void {
    fromEvent(this.multiDatePicker.nativeElement, 'click')
      .pipe(
        takeUntil(this.unSubscribe$),
        tap(this.tapHandler),
        filter(() => this.canSelect),
        switchMap(this.switchToMouseMove)
      )
      .subscribe((event: any) => {
        const {clientX, clientY} = event;
        this.selection$.next({clientX, clientY});
      });
  }

  tapHandler = (event: any) => {
    this.canSelect = !this.canSelect;
    if (this.canSelect) {
      this.selection$.next({clear: true});
      const {clientX, clientY} = event;
      this.selection$.next({clientX, clientY});
    }
  };

  switchToMouseMove = () => {
    return fromEvent(this.multiDatePicker.nativeElement, 'mousemove')
      .pipe(takeUntil(
        merge(
          this.cancelSelection$,
          fromEvent(this.multiDatePicker.nativeElement, 'click'))
        )
      );
  };

  initSelectedRangeHandler(): void {
    this.calendarDatePickerService.selectDate$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((selectedDate: any) => {
        const {selectedRange} = this.calendarDatePickerService;

        if (!selectedRange.date1) {
          selectedRange.date1 = selectedDate;
        } else {
          selectedRange.date2 = Math.abs(selectedRange.date1.diff(selectedDate, 'days')) < this.RANGE_SIZE ? selectedDate : selectedRange.date2;
        }
        this.updateDateInput();
      });
  }

  updateCalendarDates(direction: number): void {
    const currentViewDate = moment(this.calendarDates[0]);
    const {calendarDatePickerService} = this;

    if (direction > 0) {
      this.calendarDates = [
        currentViewDate.add(direction, 'month').format(calendarDatePickerService.DATE_FORMAT),
        currentViewDate.add(direction, 'month').format(calendarDatePickerService.DATE_FORMAT),
        currentViewDate.add(direction, 'month').format(calendarDatePickerService.DATE_FORMAT)
      ];
    } else {
      this.calendarDates[2] = this.calendarDates[1];
      this.calendarDates[1] = this.calendarDates[0];
      this.calendarDates[0] = currentViewDate.add(direction, 'month').format(calendarDatePickerService.DATE_FORMAT);
    }
  }

  select(): void {
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const format = this.config.format || 'MMMM Do YYYY';

    if (firstDate.format(format) === lastDate.format(format)) {
      this.onSelectRange.next(null);
      return
    }

    this.onSelectRange.next({
      from: firstDate ? firstDate.format(format) : moment().format(format),
      to: lastDate ? lastDate.format(format) : moment().add(1, 'day').format(format)
    });
  }

  cancel(): void {
    this.canSelect = false;
    this.formGroup.setValue({from: '', to: ''});
    this.cancelSelection$.next();
    this.calendarDatePickerService.clearSelectRange();
  }

  rangeFromInputHandler() {
    const {from, to} = this.formGroup.controls;
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const {DATE_FORMAT} = this.calendarDatePickerService;

    if (!isEmpty(from.errors) || !isEmpty(to.errors) || !from.value || !to.value) {
      return;
    }

    const newFrom = this.fixFormat(from.value);
    const newTo = this.fixFormat(to.value);
    let date = moment(this.fixFormat(from.value));

    if (newFrom === moment(firstDate).format(DATE_FORMAT) && newTo === moment(lastDate).format(DATE_FORMAT)) {
      return
    }

    this.calendarDates = [
      date.format(this.calendarDatePickerService.DATE_FORMAT),
      date.add(1, 'month').format(this.calendarDatePickerService.DATE_FORMAT),
      date.add(1, 'month').format(this.calendarDatePickerService.DATE_FORMAT)
    ];

    this.calendarDatePickerService.selectedRange = {date1: moment(newFrom), date2: moment(newTo)};
    this.calendarDatePickerService.selectDate$.next(moment(newFrom));
    this.calendarDatePickerService.selectDate$.next(moment(newTo));
  }

  updateDateInput() {
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const from = !!firstDate ? firstDate.format(this.DATE_INPUT_FORMAT) : '';
    const to = !!lastDate ? lastDate.format(this.DATE_INPUT_FORMAT) : '';
    this.formGroup.setValue({from, to});
  }

  private fixFormat(date: string) { // todo - temporary fix
    return date.split('/').reverse().join('-');
  }

  dateFormatValidator = (ctrl: AbstractControl) => (!ctrl.value || this.rgx.test(ctrl.value)) ? null : {'format-error': true};

  // validate from range
  rangeValidation = (abstractForm: FormGroup) => { // todo - need find a better way
    const {from, to} = abstractForm.controls;

    if (from.value) {
      const fromDateMilliseconds = moment(this.fixFormat(from.value)).valueOf();
      const todayMilliseconds = moment(moment().format(this.calendarDatePickerService.DATE_FORMAT)).valueOf();
      const MILLI_SECONDS_IN_DAY = 86400000;

      if ((fromDateMilliseconds / MILLI_SECONDS_IN_DAY) < (todayMilliseconds / MILLI_SECONDS_IN_DAY)) {
        this.formGroup.controls['from'].setErrors({'wrong-range': true});
        return;
      }

      let toError = this.formGroup.controls['to'].errors;
      if (toError && toError['wrong-range']) {
        delete toError['wrong-range'];
      }
      if (isEmpty(this.formGroup.controls['to'].errors)) {
        toError = null;
      }
      this.formGroup.controls['to'].setErrors(toError);

      if (from.value && to.value) {
        const toMilliseconds = moment(this.fixFormat(to.value)).valueOf();
        if ((toMilliseconds / MILLI_SECONDS_IN_DAY) - (fromDateMilliseconds / MILLI_SECONDS_IN_DAY) > this.RANGE_SIZE) { // check range size
          this.formGroup.controls['to'].setErrors({'wrong-range': true});
          return
        }

        if (toMilliseconds < fromDateMilliseconds) {
          this.formGroup.controls['to'].setErrors({'wrong-range': true});
          return;
        }
      }
    }
    return null;
  };

  errorsClass(errors) {
    if (!errors) {
      return '';
    }
    return Object.keys(errors).join(' ');
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
  }
}

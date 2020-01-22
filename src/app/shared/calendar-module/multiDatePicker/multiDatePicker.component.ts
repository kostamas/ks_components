import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as momentNs from 'moment';

const moment = momentNs;
import {fromEvent, merge, Subject} from 'rxjs';
import {filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {CalendarDatePickerService} from '../../../services/calendarDatePicker.service';
import {SVG_ICONS} from '../../svg-icon-module/svg-icons.const';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AbstractControl} from '@angular/forms';
import {JsUtils} from '../../../utils/jsUtils';

import {ICalendarClickPosition, IFromTo} from '../../../types/calendar';
import {DATE_FORMAT} from '../../../constants/shared.constant';

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
  public canSelect: boolean;
  public SVG_ICONS: any = SVG_ICONS;
  public formGroup: FormGroup;
  private rgx: RegExp = new RegExp('[0-9]{2}/[0-9]{2}/20[0-9]{2}');
  private RANGE_SIZE: number;

  @ViewChild('multiDatePicker') multiDatePicker: any;

  @Input('disabledRanges') disabledRanges: IFromTo[];
  @Input('config') config?: any;
  @Input('allowPastDates') allowPastDates: boolean;
  @Input('detectChangesManually') detectChangesManually: boolean;

  @Output('onSelectRange') onSelectRange: EventEmitter<any> = new EventEmitter();

  constructor(private calendarDatePickerService: CalendarDatePickerService, private fBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef) {
    this.formGroup = fBuilder.group({
      from: [null, this.dateFormatValidator],
      to: [null, this.dateFormatValidator]
    }, {validator: this.rangeValidation});
  }

  ngOnInit(): void {
    this.RANGE_SIZE = this.config && this.config.rangeSize ? this.config.rangeSize : Infinity;
    const now = moment();
    this.calendarDates = [
      now.format(DATE_FORMAT),
      now.add(1, 'month').format(DATE_FORMAT),
      now.add(1, 'month').format(DATE_FORMAT)
    ];

    this.initMouseEventsHandler();
    this.initSelectedRangeHandler();

    this.formGroup.valueChanges.subscribe(() => setTimeout(() => this.rangeFromInputHandler()));

    if (this.config && this.config.selectedRange) {
      setTimeout(() => {
        const calendarFirstDate = moment(this.config.selectedRange.firstDate, DATE_FORMAT);
        this.calendarDates = [
          calendarFirstDate.format(DATE_FORMAT),
          calendarFirstDate.add(1, 'month').format(DATE_FORMAT),
          calendarFirstDate.add(1, 'month').format(DATE_FORMAT)
        ];
        const {firstDate, lastDate} = this.config.selectedRange;
        this.calendarDatePickerService.selectedRange = {
          date1: moment(firstDate, DATE_FORMAT),
          date2: moment(lastDate, DATE_FORMAT)
        };
        this.calendarDatePickerService.selectDate$.next(moment(firstDate, DATE_FORMAT));
        this.calendarDatePickerService.selectDate$.next(moment(lastDate, DATE_FORMAT));
        if (this.detectChangesManually) {
          this.changeDetector.detectChanges();
        }
      });
    }
  }

  initMouseEventsHandler(): void {
    const click$ = fromEvent(this.multiDatePicker.nativeElement, 'click');
    merge(click$, this.calendarDatePickerService.sameDateClick$)
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
      if (event) {  // event === undefined it means that is a sameDateClick$ event and not a click event.
        this.selection$.next({clear: true});
        const {clientX, clientY} = event;
        this.selection$.next({clientX, clientY});
      }
    }
  };

  switchToMouseMove = () => {
    return fromEvent(this.multiDatePicker.nativeElement, 'mousemove')
      .pipe(takeUntil(
        merge(
          this.cancelSelection$,
          this.secondClick())
        )
      );
  };

  secondClick = () => {
    const secondClick$ = new Subject();
    const subscription = fromEvent(this.multiDatePicker.nativeElement, 'click').subscribe((event: any) => {
      const selectedRange = this.calendarDatePickerService.selectedRange;
      if (!selectedRange.date2 || !selectedRange.date1 || selectedRange.date1.diff(selectedRange.date2) === 0) {
        this.calendarDatePickerService.sameDateClick$.next(true);
      }
      subscription.unsubscribe();
      const {clientX, clientY} = event;
      this.selection$.next({clientX, clientY});
      secondClick$.next();
    });
    return secondClick$;
  }

  initSelectedRangeHandler(): void {
    this.calendarDatePickerService.selectDate$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((selectedDate: any) => {
        this.calendarDatePickerService.updateSelectedRange(selectedDate, this.RANGE_SIZE);
        this.updateDateInput();
      });
  }

  updateCalendarDates(direction: number): void {
    const currentViewDate = moment(this.calendarDates[0]);
    if (direction > 0) {
      this.calendarDates = [
        currentViewDate.add(direction, 'month').format(DATE_FORMAT),
        currentViewDate.add(direction, 'month').format(DATE_FORMAT),
        currentViewDate.add(direction, 'month').format(DATE_FORMAT)
      ];
    } else {
      this.calendarDates[2] = this.calendarDates[1];
      this.calendarDates[1] = this.calendarDates[0];
      this.calendarDates[0] = currentViewDate.add(direction, 'month').format(DATE_FORMAT);
    }
  }

  select(): void {
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const format = this.config && this.config.format || 'MMMM Do YYYY';

    if (firstDate && lastDate) {
      if (firstDate.format(format) === lastDate.format(format)) {
        return;
      }
      this.onSelectRange.next({from: firstDate, to: lastDate});
    } else {
      this.formGroup.controls['from'].setErrors({'wrong-range': true});
      this.formGroup.controls['to'].setErrors({'wrong-range': true});
    }
  }

  cancel(): void {
    this.canSelect = false;
    this.formGroup.setValue({from: '', to: ''});
    this.cancelSelection$.next();
    this.calendarDatePickerService.clearSelectRange();
  }

  rangeFromInputHandler(): void {
    const {from, to} = this.formGroup.controls;
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();

    if (!JsUtils.isEmpty(from.errors) || !JsUtils.isEmpty(to.errors) || !from.value || !to.value) {
      return;
    }

    const newFrom = from.value;
    const newTo = to.value;
    if (newFrom === moment(firstDate).format('DD/MM/YYYY') && newTo === moment(lastDate).format('DD/MM/YYYY')) {

      return;
    }
    const date = moment(from.value, 'DD/MM/YYYY');
    this.calendarDates = [
      date.format(DATE_FORMAT),
      date.add(1, 'month').format(DATE_FORMAT),
      date.add(1, 'month').format(DATE_FORMAT)
    ];

    this.calendarDatePickerService.selectedRange = {
      date1: moment(newFrom, 'DD/MM/YYYY'),
      date2: moment(newTo, 'DD/MM/YYYY')
    };
    this.calendarDatePickerService.selectDate$.next(moment(newFrom, 'DD/MM/YYYY'));
    this.calendarDatePickerService.selectDate$.next(moment(newTo, 'DD/MM/YYYY'));
  }

  updateDateInput(): void {
    const {firstDate, lastDate} = this.calendarDatePickerService.getSelectedRange();
    const from = !!firstDate ? moment(firstDate, DATE_FORMAT).format('DD/MM/YYYY') : '';
    const to = !!lastDate ? moment(lastDate, DATE_FORMAT).format('DD/MM/YYYY') : '';
    this.formGroup.setValue({from, to});
  }

  dateFormatValidator = (ctrl: AbstractControl) => (!ctrl.value || this.rgx.test(ctrl.value)) ? null : {'format-error': true};

  // validate from range
  rangeValidation = (abstractForm: FormGroup) => {
    const {from, to} = abstractForm.controls;
    if (from.value) {
      const fromDate = moment(from.value, 'DD/MM/YYYY');
      const todayDate = moment();
      const fromDateMilliseconds = moment([fromDate.year(), fromDate.month(), fromDate.date()]).valueOf();
      const todayMilliseconds = moment([todayDate.year(), todayDate.month(), todayDate.date()]).valueOf();
      const MILLI_SECONDS_IN_DAY = 86400000;

      if ((fromDateMilliseconds / MILLI_SECONDS_IN_DAY) < (todayMilliseconds / MILLI_SECONDS_IN_DAY)) {
        this.formGroup.controls['from'].setErrors({'wrong-range': true});
        return;
      }
      let toError = this.formGroup.controls['to'].errors;
      if (toError && toError['wrong-range']) {
        delete toError['wrong-range'];
      }
      if (JsUtils.isEmpty(this.formGroup.controls['to'].errors)) {
        toError = null;
      }
      this.formGroup.controls['to'].setErrors(toError);

      if (from.value && to.value) {
        const toMilliseconds = moment(to.value, 'DD/MM/YYYY').valueOf();
        if ((toMilliseconds / MILLI_SECONDS_IN_DAY) - (fromDateMilliseconds / MILLI_SECONDS_IN_DAY) > this.RANGE_SIZE) { // check range size
          this.formGroup.controls['to'].setErrors({'wrong-range': true});
          return;
        }

        if (toMilliseconds < fromDateMilliseconds) {
          this.formGroup.controls['to'].setErrors({'wrong-range': true});
          return;
        }
      }
    }
    return null;
  };

  errorsClass(errors: any): string {
    if (!errors) {
      return '';
    }
    return Object.keys(errors).join(' ');
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
  }
}

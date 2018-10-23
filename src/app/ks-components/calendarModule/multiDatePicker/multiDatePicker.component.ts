import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {fromEvent, Subject} from 'rxjs';
import {filter, skip, switchMap, takeUntil, tap} from 'rxjs/operators';
import {CalendarDatePickerService} from '../calendarDatePicker/calendarDatePicker.service';

@Component({
  selector: 'app-multi-date-picker',
  templateUrl: './multiDatePicker.html',
  styleUrls: ['./multiDatePicker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiDatePickerComponent implements OnInit, OnDestroy {
  public daysToSelect: any;
  public selection$: any = new Subject();
  public moment: any = moment;
  public calendarDates: string[];
  public unSubscribe$: any = new Subject();
  public DATE_FORMAT: string = 'YYYY-MM-DD';
  public canSelect: boolean;  // todo - find better solution

  @ViewChild('multiDatePicker') multiDatePicker: any;

  @Input('config') config: any;

  @Output('onSelectRange') onSelectRange: EventEmitter<any> = new EventEmitter();

  constructor(private calendarDatePickerService: CalendarDatePickerService) {
  }

  ngOnInit(): void {
    const now = moment();
    this.calendarDates = [
      now.format(this.DATE_FORMAT),
      now.add(1, 'month').format(this.DATE_FORMAT),
      now.add(1, 'month').format(this.DATE_FORMAT)
    ];

    this.initMouseEventsHandler();
    this.initSelectedRangeHandler();
  }

  initMouseEventsHandler(): void {
    fromEvent(this.multiDatePicker.nativeElement, 'click')
      .pipe(
        takeUntil(this.unSubscribe$),
        tap(this.tapHandler),
        filter(() => this.canSelect),
        switchMap(this.switchMapHandler)
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

  switchMapHandler = () => {
    return fromEvent(this.multiDatePicker.nativeElement, 'mousemove')
      .pipe(takeUntil(fromEvent(this.multiDatePicker.nativeElement, 'click')));
  };

  initSelectedRangeHandler(): void {
    this.calendarDatePickerService.selectDate$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((selectedDate: any) => {
        const {selectedRange} = this.calendarDatePickerService;

        if (!selectedRange.firsDate) {
          selectedRange.firsDate = selectedDate;
          selectedRange.lastDate = selectedDate;
        } else {
          if (selectedRange.lastDate && selectedDate.diff(selectedRange.firsDate) < 0) {
            selectedRange.firsDate = selectedDate;
          } else {
            selectedRange.lastDate = selectedDate;
          }
        }

        if (selectedRange.lastDate && selectedRange.lastDate.diff(selectedRange.firsDate) < 0) {
          const firstDay = selectedRange.firsDate;
          selectedRange.firsDate = selectedRange.lastDate;
          selectedRange.lastDate = firstDay;
        }
      });
  }

  updateCalendarDates(direction: number): void {
    const format = 'YYYY-MM-DD';
    const currentViewDate = moment(this.calendarDates[0]);

    if (direction > 0) {
      this.calendarDates = [
        currentViewDate.add(direction, 'month').format(format),
        currentViewDate.add(direction, 'month').format(format),
        currentViewDate.add(direction, 'month').format(format)
      ];
    } else {
      this.calendarDates[2] = this.calendarDates[1];
      this.calendarDates[1] = this.calendarDates[0];
      this.calendarDates[0] = currentViewDate.add(direction, 'month').format(format);
    }
  }

  select(): void {
    const {selectedRange} = this.calendarDatePickerService;
    if (selectedRange.firsDate && selectedRange.lastDate) {
      console.log(selectedRange.firsDate.format('MMMM Do YYYY') + ' - ' + selectedRange.lastDate.format('MMMM Do YYYY'));
    }
    this.onSelectRange.next({
      from: moment(selectedRange.firsDate).format(this.config.format || 'MMMM Do YYYY'),
      to: moment(selectedRange.lastDate).format(this.config.format || 'MMMM Do YYYY')
    });
  }

  cancel(): void {
    this.calendarDatePickerService.clearSelectRange();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
  }
}

import {Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {fromEvent, Subject} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
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

  @ViewChild('multiDatePicker') multiDatePicker: any;

  @Input('date') date: any;

  constructor(private calendarDatePickerService: CalendarDatePickerService) {
  }

  ngOnInit(): void {
    fromEvent(this.multiDatePicker.nativeElement, 'mousedown')
      .pipe(
        tap(() => this.selection$.next({clear: true})),
        switchMap(() => {
          return fromEvent(this.multiDatePicker.nativeElement, 'mousemove')
            .pipe(takeUntil(fromEvent(this.multiDatePicker.nativeElement, 'click')));
        }))
      .subscribe((event: any) => {
        const {clientX, clientY} = event;
        this.selection$.next({clientX, clientY});
      });

    this.calendarDatePickerService.selectDate$.subscribe((selectedDate: any) => {
      const {selectedRange} = this.calendarDatePickerService;

      if (!selectedRange.firsDate) {
        selectedRange.firsDate = selectedDate;
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

  select(): void {
    const {selectedRange} = this.calendarDatePickerService;
    console.log(selectedRange.firsDate.format('MMMM Do YYYY') + ' - ' + selectedRange.lastDate.format('MMMM Do YYYY'));
  }

  ngOnDestroy(): void {

  }
}

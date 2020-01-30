import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import * as momentNs from 'moment';
import {DATE_FORMAT} from '../calendar-module/calendar.const';
const moment = momentNs;

@Injectable()
export class CalendarDatePickerService {
  public selectDate$: any = new BehaviorSubject(null);
  public selectedRange: any = {date1: null, date2: null};
  public sameDateClick$: Subject<boolean> = new Subject<boolean>();
  public reset$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  clearSelectRange(): void {
    this.selectedRange = {date1: null, date2: null};
    this.selectDate$.next('');
    this.reset$.next(true);
  }

  updateSelectedRange(selectedDate: any, rangeSize: number): void {
    const {selectedRange} = this;

    if (!selectedRange.date1) {
      selectedRange.date1 = selectedDate;
    } else {
      selectedRange.date2 = Math.abs(selectedRange.date1.diff(selectedDate, 'days')) < rangeSize ? selectedDate : selectedRange.date2;
    }
  }

  getSelectedRange(): any {
    let lastDate, firstDate;
    if (this.selectedRange.date2) {
      firstDate = this.selectedRange.date1.diff(this.selectedRange.date2) < 0 ? moment(this.selectedRange.date1, DATE_FORMAT) : moment(this.selectedRange.date2, DATE_FORMAT);
      lastDate = this.selectedRange.date1.diff(this.selectedRange.date2) > 0 ? moment(this.selectedRange.date1, DATE_FORMAT) : moment(this.selectedRange.date2, DATE_FORMAT);
    } else {
      if (this.selectedRange.date1) {
        firstDate = moment(this.selectedRange.date1, DATE_FORMAT);
        lastDate = moment(this.selectedRange.date1, DATE_FORMAT);
      }
    }
    return {firstDate, lastDate};
  }
}

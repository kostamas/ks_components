import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as moment from "moment";

@Injectable()
export class CalendarDatePickerService {
  public DATE_FORMAT: string = 'YYYY-MM-DD';
  public selectDate$: any = new Subject();
  public selectedRange: any = {date1: null, date2: null};

  constructor() {
  }

  clearSelectRange(): void {
    this.selectedRange = {date1: null, date2: null};
    this.selectDate$.next();
  }

  getSelectedRange(): any {
    let lastDate, firstDate;
    if (this.selectedRange.date2) {
      firstDate = this.selectedRange.date1.diff(this.selectedRange.date2) < 0 ? moment(this.selectedRange.date1) : moment(this.selectedRange.date2);
      lastDate = this.selectedRange.date1.diff(this.selectedRange.date2) > 0 ? moment(this.selectedRange.date1) : moment(this.selectedRange.date2);
    } else {
      if (this.selectedRange.date1) {
        firstDate = moment(this.selectedRange.date1);
        lastDate = moment(this.selectedRange.date1);
      }
    }
    return {firstDate, lastDate};
  }
}

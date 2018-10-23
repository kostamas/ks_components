import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarDatePickerService {
  public selectDate$: any = new Subject();
  public selectedRange: any = {firsDate: null, lastDate: null};

  constructor() {
  }

  clearSelectRange(): void {
    this.selectedRange = {firsDate: null, lastDate: null};
    this.selectDate$.next();
  }
}

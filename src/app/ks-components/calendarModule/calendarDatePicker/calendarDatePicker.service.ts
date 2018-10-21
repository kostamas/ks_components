import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarDatePickerService {
  public selectDate$ = new Subject();
  public selectedRange = {firsDate: null, lastDate: null};

  constructor() {
  }
}

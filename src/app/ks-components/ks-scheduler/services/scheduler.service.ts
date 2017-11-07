import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class SchedulerService {

  constructor() {
  }

  public isDateExistByParams(obj, year, month, dayInMonth, hour) {
    return (obj[year]
      && obj[year][month]
      && obj[year][month][dayInMonth]
      && obj[year][month][dayInMonth][hour]);
  }

  public getDateDetails(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let dayOfMonth = date.getDate();
    let hours = date.getHours();
    return {year, month, dayOfMonth, hours};
  }
}

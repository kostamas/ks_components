import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class SchedulerService {
  private plan;

  constructor() {
  }

  public isDateExistByParams(obj, year, month, dayInMonth, hour) {
    return (obj[year]
      && obj[year][month]
      && obj[year][month][dayInMonth]
      && obj[year][month][dayInMonth][hour]);
  }

  public isDateExistByDate(obj, date) {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const dayInMonth = new Date(date).getDate();
    const hour = new Date(date).getHours();
    return this.isDateExistByParams(obj, year, month, dayInMonth, hour);
  }

  public convertToUTCMilisec(year, month, dayInMonth, hour) {
    const dateObj = new Date(year, month, dayInMonth, hour); // todo - use user's timezone
    return dateObj.getTime();
  }

  public getDateDetails(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let dayOfMonth = date.getDate();
    let hours = date.getHours();
    return {year, month, dayOfMonth, hours};
  }

  public runOnDateObject(dateObj, cbFunction, convertToUserTimezone?) {
    Object.keys(dateObj).forEach(year => {
      Object.keys(dateObj[year]).forEach(month => {
        Object.keys(dateObj[year][month]).forEach(dayInMonth => {
          Object.keys(dateObj[year][month][dayInMonth]).forEach(hour => {
            // todo - convert (year,month,dayInMonth,hour) to user's timezone (if needed).
            if (convertToUserTimezone) {
              console.log(convertToUserTimezone);
              // cbFunction(convertedYear, convertedMonth, convertedDayInMonth, convertedHour);
            }
            cbFunction(year, month, dayInMonth, hour);
          });
        });
      });
    });
  }
}

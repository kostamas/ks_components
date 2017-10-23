import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class SchedulingMockData {
  public static schedules: any = SchedulingMockData.buildMockData(SchedulingMockData.getRandomText, ' ');
  public static availability: any = SchedulingMockData.buildMockData(true, false);

  constructor() {
  }

  public getDataByDate(relevantWeek: Date) {
    let runningDate = new Date(relevantWeek);
    let result: any = {};
    let year, month, dayInMonth;

    for (let i = 0; i < 7; i++) {
      year = runningDate.getFullYear();
      month = runningDate.getMonth();
      dayInMonth = runningDate.getDate();

      if (SchedulingMockData.schedules[year][month][dayInMonth]) {
        if (!result[year]) {
          result[year] = {};
        }

        if (!result[year][month]) {
          result[year][month] = {};
        }

        result[year][month][dayInMonth] = SchedulingMockData.schedules[year][month][dayInMonth];
      }

      runningDate.setDate(dayInMonth + 1);
    }

    return Observable.from([result]).delay(Math.random() * 1200);
  }

  public static buildMockData(assignWhenTrue, assignWhenFalse) {
    let obj = {};
    obj[new Date().getFullYear() - 1] = {};
    obj[new Date().getFullYear()] = {};
    obj[new Date().getFullYear() + 1] = {};

    Object.keys(obj).forEach((year: string) => {
      obj[year] = {};
      for (let i = 0; i < 12; i++) {
        obj[year][i] = {};
      }

      Object.keys(obj[year]).forEach((month: string) => {
        const numOfDays = new Date(+year, +month + 1, 0).getDate();
        obj[year][month] = {};
        for (let day = 1; day <= numOfDays; day++) {
          if (Math.floor((Math.random() * 2))) {
            obj[year][month][day] = {};
            for (let hour = 0; hour < 24; hour++) {
              obj[year][month][day][hour] = {
                data: Math.floor((Math.random() * 2)) ? (typeof assignWhenTrue == 'function' ? assignWhenTrue() : assignWhenTrue) : assignWhenFalse,
                hour: +hour,
                date: `${year} - ${+month + 1} - ${day}`
              };
            }
          }
        }
      });
    });
    return obj;
  }

  public static getRandomText() {

    let text = ['11111', '222222', 'aabbcc', 'hello', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum sed ', 'neque quam', 'ipsum purus'];
    return text[Math.floor((Math.random() * 10) + 1)];
  }

  private daysInThisMonth(dateObj) {
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
  }
}

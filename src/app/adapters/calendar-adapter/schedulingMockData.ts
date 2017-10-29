import {Injectable} from '@angular/core';

@Injectable()
export class SchedulingMockData {
  public schedules: any;
  public availability: any;

  constructor() {
    this.schedules = this.buildMockData(this.getRandomText, ' ');
    this.availability = this.buildMockData(true, false);
  }

  public buildMockData(assignWhenTrue, assignWhenFalse) {
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
              if (!(this.schedules && this.schedules[year] && this.schedules[year][month] &&
                  this.schedules[year][month][day] && this.schedules[year][month][day][hour])) {
                obj[year][month][day][hour] = {
                  data: Math.floor((Math.random() * 2)) ? (typeof assignWhenTrue == 'function' ? assignWhenTrue() : assignWhenTrue) : assignWhenFalse,
                  hour: +hour,
                  date: `${year} - ${+month + 1} - ${day}`
                };
              }
            }
          }
        }
      });
    });
    return obj;
  }

  public  getRandomText() {
    let text = ['11111', '222222', 'aabbcc', 'hello', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum sed ', 'neque quam', 'ipsum purus'];
    return text[Math.floor((Math.random() * 10) + 1)];
  }
}

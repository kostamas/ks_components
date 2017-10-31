import {Injectable} from '@angular/core';

@Injectable()
export class SchedulingMockData {
  public schedules: any;
  public availability: any;

  constructor() {
    this.schedules = this.buildMockData('schedules');
    this.availability = this.buildMockData('availability');
  }

  public buildMockData(type) {
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

              if (type === 'schedules') {
                obj[year][month][day][hour] = {data: Math.floor((Math.random() * 2)) ? this.getRandomText() : ' ',};
              }

              if (type === 'availability') {
                if ((this.schedules && this.schedules[year] && this.schedules[year][month] &&
                    this.schedules[year][month][day] && this.schedules[year][month][day][hour] && this.schedules[year][month][day][hour].data)) {
                  obj[year][month][day][hour] = {
                    data: {
                      isAvailable: false,
                      textToShow: this.schedules[year][month][day][hour].data
                    }
                  };
                } else {
                  obj[year][month][day][hour] = {data: {isAvailable: Math.floor((Math.random() * 2)) > 0 }};
                }
              }
            }
          }
        }
      });
    });
    return obj;
  }

  public getRandomText() {
    let text = ['11111', '222222', 'aabbcc', 'hello', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum sed ', 'neque quam', 'ipsum purus'];
    return text[Math.floor((Math.random() * 10) + 1)];
  }
}

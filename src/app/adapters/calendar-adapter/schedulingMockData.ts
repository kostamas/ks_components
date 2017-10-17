import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class SchedulingMockData {
  public static mockData: any = {};

  constructor() {
    this.buildMockData();
  }

  public static getDataByDate(relevantWeek: Date) {
    let runningDate = new Date(relevantWeek);
    let result: any = {};

    for (let i = 0; i < 7; i++) {
      if (!result[runningDate.getFullYear()]) {
        result[runningDate.getFullYear()] = {};
      }
      if (!result[runningDate.getFullYear()][runningDate.getMonth()]) {
        result[runningDate.getFullYear()][runningDate.getMonth()] = {};
      }
      result[runningDate.getFullYear()][runningDate.getMonth()][runningDate.getDate()] = SchedulingMockData.mockData[runningDate.getFullYear()][runningDate.getMonth()][runningDate.getDate()];

      runningDate.setDate(runningDate.getDate() + 1);
    }

    return Observable.from([result]);
  }

  public buildMockData() {
    SchedulingMockData.mockData[new Date().getFullYear() - 1] = {};
    SchedulingMockData.mockData[new Date().getFullYear()] = {};
    SchedulingMockData.mockData[new Date().getFullYear() + 1] = {};

    Object.keys(SchedulingMockData.mockData).forEach((year: string) => {
      SchedulingMockData.mockData[year] = {};
      for (let i = 0; i < 12; i++) {
        SchedulingMockData.mockData[year][i] = {};
      }

      Object.keys(SchedulingMockData.mockData[year]).forEach((month: string) => {
        const numOfDays = new Date(+year, +month + 1, 0).getDate();
        SchedulingMockData.mockData[year][month] = {};
        for (let day = 1; day <= numOfDays; day++) {
          SchedulingMockData.mockData[year][month][day] = {};
          for (let hour = 0; hour < 24; hour++) {
            SchedulingMockData.mockData[year][month][day][hour] = {
              data: Math.floor((Math.random() * 2)) ? SchedulingMockData.getRandomText() : ' '
            }
          }
        }
      });
    });
  }

  public static getRandomText() {

    let text = ['11111', '222222', 'aabbcc', 'hello', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum sed praesent morbi', 'neque quam ipsum purus a nibh id,'];
    return text[Math.floor((Math.random() * 10) + 1)];
  }

  private daysInThisMonth(dateObj) {
    return new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
  }
}

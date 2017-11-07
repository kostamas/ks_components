import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

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
          if (Math.floor((Math.random() * 2)) || type === 'availability') {
            obj[year][month][day] = {};
            for (let hour = 0; hour < 24; hour++) {

              if (type === 'schedules') {
                obj[year][month][day][hour] = {data: Math.floor((Math.random() * 2)) ? this.getRandomText() : ''};
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
                  obj[year][month][day][hour] = {data: {isAvailable: Math.floor((Math.random() * 2)) > 0}};
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
    let text = ['11111', '222222', 'aabbcc', 'hello world', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum ', 'neque quam', 'ipsum purus'];
    return text[Math.floor((Math.random() * 10) + 1)];
  }

  public getEventById(id) {
    const eventList = [
      {
        id: 'event1',
        title: 'Event No. 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.`,
        icon: 'star rate'
      },
      {
        id: 'event2',
        title: 'Event No. 2',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.`,
        icon: 'flight'
      },
    ];

    return Observable.of(
      eventList.filter(event => {
        return event.id === id;
      })[0]).delay(Math.random()*1000 +  600);
  }
}

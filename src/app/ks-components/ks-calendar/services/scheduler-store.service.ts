import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SchedulerStoreService {
  private availability$ = new Subject<number>();
  private schedule$ = new Subject<number>();

  constructor() {
  }

  public notifyAvailability(availability: number) {
    this.availability$.next(availability);
  }

  public onAvailability(cb) {
    return this.availability$.subscribe(cb);
  }

  public schedule(item: IScheduleItem) {
    return this.schedule$.next();
  }

  public onSchdeule(cb) {
    return this.schedule$.subscribe(cb);
  }
}

/*************************************** interfaces *******************************/

export interface IScheduleItem {
  date: Date;
  data: any;
}

export interface ISchedulerConfig {
  getAvailability: () => Observable<any>;
  getSchedules: () => Observable<any>;

}


/*************************************** constants *******************************/

export const AVAILABILITY_STORE_TYPE = {
  GET: 1,
  SET: 2
};

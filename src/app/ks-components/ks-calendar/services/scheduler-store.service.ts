import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SchedulerStoreService {
  private availability$ = new Subject<number>();
  private schedules$ = new Subject<number>();

  constructor() {
  }

  public notifyAvailability(storeType: number) {
    this.availability$.next(storeType);
  }

  public onAvailability(cb) {
    return this.availability$.subscribe(cb);
  }

  public notifySchedules(storeType) {
    return this.schedules$.next(storeType);
  }

  public onSchedules(cb) {
    return this.schedules$.subscribe(cb);
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

export const SCHEDULER_STORE_TYPE = {
  GET: 1,
  SET: 2
};

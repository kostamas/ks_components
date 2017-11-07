import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SchedulerStoreService {
  private availability$ = new Subject<number>();
  private schedules$ = new Subject<number>();

  private timeSlotClick$ = new Subject<any>();
  private updateTimeSlots$ = new Subject<any>();

  private subscriptions = [];

  constructor() {
  }

  public notifyAvailability(storeType: number) {
    this.availability$.next(storeType);
  }

  public onAvailability(cb) {
    this.subscriptions.push(this.availability$.subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];
  }

  public notifySchedules(storeType) {
    return this.schedules$.next(storeType);
  }

  public onSchedules(cb) {
    this.subscriptions.push(this.schedules$.subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];

  }

  public notifyTimeSlot(timeSlotStoreType: number, metaData: any, timeSlotData: any) {
    this.timeSlotClick$.next({timeSlotStoreType, metaData, timeSlotData});
  }

  public onTimeSlot(cb) {
    this.subscriptions.push(this.timeSlotClick$.subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];

  }

  public notifyUpdateTimeSlot(data) {
    this.updateTimeSlots$.next(data);
  }

  public onUpdateTimeSlot(cb) {
    this.subscriptions.push(this.updateTimeSlots$.subscribe(cb));
    return this.subscriptions[this.subscriptions.length - 1];

  }

  public unSubscribe = (cb) =>{
    const index = this.subscriptions.indexOf(cb);
    if(index > -1){
      this.subscriptions[index].unsubscribe(cb);
      this.subscriptions.splice(index, 1);
    }
  };

  public unSubscribeAll =()=>{
    this.subscriptions.forEach(subscription=>{
      subscription.unsubscribe();
    })
  }
}


/*************************************** constants *******************************/

export const SCHEDULER_STORE_TYPE = {
  OUT: 1,
  IN: 2
};

export const TIME_SLOT_STORE_TYPE = {
  SCHEDULE: 1,
  DELETE: 2,
  CUSTOM: 3
};

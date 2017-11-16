import {Injectable, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Subject} from 'rxjs/Subject';
import {KsStore} from "../../../app-core/store/ks-store.service";

@Injectable()
export class SchedulerStoreService extends KsStore implements OnDestroy {
  private availability$ = new Subject<number>();
  private schedules$ = new Subject<number>();

  private timeSlotClick$ = new Subject<any>();
  private updateTimeSlots$ = new Subject<any>();

  constructor() {
    super();
  }

  public notifyAvailability(storeType: number) {
    this.availability$.next(storeType);
  }

  public onAvailability(cb,id?) {
    this.addSubscription(this.availability$.subscribe(cb), cb, id);
    return this.subscriptions[this.subscriptions.length - 1].subscription;
  }

  public notifySchedules(storeType) {
    return this.schedules$.next(storeType);
  }

  public onSchedules(cb) {
    this.addSubscription(this.schedules$.subscribe(cb), cb);
    return this.subscriptions[this.subscriptions.length - 1].subscription;

  }

  public notifyTimeSlot(timeSlotStoreType: number, metaData: any, timeSlotData: any) {
    this.timeSlotClick$.next({timeSlotStoreType, metaData, timeSlotData});
  }

  public onTimeSlot(cb) {
    this.addSubscription(this.timeSlotClick$.subscribe(cb), cb);
    return this.subscriptions[this.subscriptions.length - 1].subscription;

  }

  public notifyUpdateTimeSlot(data) {
    this.updateTimeSlots$.next(data);
  }

  public onUpdateTimeSlot(cb) {
    this.addSubscription(this.updateTimeSlots$.subscribe(cb), cb);
    return this.subscriptions[this.subscriptions.length - 1].subscription;
  }

  ngOnDestroy() {
    this.unSubscribeAll();
    this.subscriptions = [];
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

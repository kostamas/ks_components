import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  SCHEDULER_STORE_TYPE,
  SchedulerStoreService,
  ISchedulerConfig
} from "../../ks-components/ks-calendar/services/scheduler-store.service";
import {Observable} from "rxjs/Observable";
import {SchedulingMockData} from './schedulingMockData';

@Component({
  selector: 'app-calendar-adapter',
  templateUrl: './calendar-adapter.component.html',
  styleUrls: ['./calendar-adapter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarAdapterComponent implements OnInit {
  public schedulerConfig: ISchedulerConfig;  // todo - figure how and where to store scheduler types.

  public itemsToSchedule: any[] = [
    {text: 'eqweqwe', id: 123},
    {text: 'lorem ipsum', id: 123},
    {text: 'qweqwe', id: 123},
    {text: '11111', id: 123},
    {text: '22222', id: 123},
    {text: '3333', id: 123},
    {text: '444', id: 123},
    {text: '5555', id: 123},
    {text: '6666', id: 123}];

  constructor(private schedulerStoreService: SchedulerStoreService) {
  }

  ngOnInit() {
    this.schedulerConfig = {
      getAvailability: this.getAvailability,
      getSchedules: this.getSchedules
    };
  }

  public onItemClick(item) {
    this.schedulerStoreService.notifyAvailability(SCHEDULER_STORE_TYPE.GET);
    this.schedulerStoreService.onAvailability((availability: number) => {
      // if (availability === AVAILABILITY_STORE_TYPE.SET) {
      // }
    });
  }

  private getAvailability(): Observable<any> {
    return Observable.of(SchedulingMockData.availability)
      .delay(1000);
  }


  private getSchedules(): Observable<any> {
    return Observable.of(SchedulingMockData.schedules)
      .delay(1000);
  }

  private showSchedules() {
    this.schedulerStoreService.notifySchedules(SCHEDULER_STORE_TYPE.GET);
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  SCHEDULER_STORE_TYPE,
  SchedulerStoreService
} from "../../ks-components/ks-calendar/services/scheduler-store.service";
import {Observable} from "rxjs/Observable";
import {SchedulingMockData} from './schedulingMockData';
import {TimeSlotTypes} from "../../ks-components/ks-calendar/constants/scheduler.constant";
import {ISchedulerConfig} from '../../ks-components/ks-calendar/calendar/calendar.component';

@Component({
  selector: 'app-calendar-adapter',
  templateUrl: './calendar-adapter.component.html',
  styleUrls: ['./calendar-adapter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarAdapterComponent implements OnInit {
  public schedulerConfig: ISchedulerConfig;  // todo - figure how and where to store scheduler types.
  public selectedItemIndex;

  public itemsToSchedule: any[] = [
    {text: 'Item 1', id: 123, type: TimeSlotTypes.REGULAR},
    {text: 'Item 2', id: 123, type: TimeSlotTypes.REGULAR},
    {text: 'Item 3', id: 123, type: TimeSlotTypes.REGULAR, classToAdd: "custom-class-1"},
    {text: 'Item 4', id: 123, type: TimeSlotTypes.REGULAR},
    {text: 'Item 5', id: 123, type: TimeSlotTypes.REGULAR},
    {text: 'Item 6', id: 123, type: TimeSlotTypes.REGULAR, classToAdd: "custom-class-2"},
    {text: 'Item 7', id: 123, type: TimeSlotTypes.REGULAR},
    {text: 'Item 8', id: 123, type: TimeSlotTypes.REGULAR},
    {text: 'Item 9', id: 123, type: TimeSlotTypes.REGULAR}];

  constructor(private schedulerStoreService: SchedulerStoreService) {
  }

  ngOnInit() {
    this.schedulerConfig = {
      getAvailability: this.getAvailability,
      getSchedules: this.getSchedules,
      schedule: this.schedule
    };
  }

  public onItemClick(itemIndex) {
    this.selectedItemIndex = -1;
    this.schedulerStoreService.notifyAvailability(SCHEDULER_STORE_TYPE.GET);
    this.schedulerStoreService.onAvailability((availability: number) => {
      if (availability === SCHEDULER_STORE_TYPE.SET) {
        this.selectedItemIndex = itemIndex;
      }
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

  private schedule = ({timeSlotType, date, data}): Observable<any> => {
    let selectedItemIndex = this.selectedItemIndex;
    let selectedItem = this.itemsToSchedule[selectedItemIndex];
    this.itemsToSchedule.splice(selectedItemIndex, 1);

    this.selectedItemIndex = -1;
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayInMonth = date.getDate();
    const hour = date.getHours();

    if (!SchedulingMockData.schedules[year][month]) {
      SchedulingMockData.schedules[year][month] = {};
    }

    if (!SchedulingMockData.schedules[year][month][dayInMonth]) {
      SchedulingMockData.schedules[year][month][dayInMonth] = {};
      for (let i = 0; i < 24; i++) {
        SchedulingMockData.schedules[year][month][dayInMonth][i] = {};
      }
    }

    SchedulingMockData.schedules[year][month][dayInMonth][hour].data = selectedItem.text;
    return Observable.of({});
  }

  private showSchedules() {
    this.selectedItemIndex = -1;
    this.schedulerStoreService.notifySchedules(SCHEDULER_STORE_TYPE.GET);
  }
}

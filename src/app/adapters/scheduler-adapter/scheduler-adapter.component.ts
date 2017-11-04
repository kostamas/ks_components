import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  SCHEDULER_STORE_TYPE,
  SchedulerStoreService
} from '../../ks-components/ks-scheduler/services/scheduler-store.service';
import {Observable} from 'rxjs/Observable';
import {SchedulingMockData} from './schedulingMockData';
import {TimeSlotTypes} from '../../ks-components/ks-scheduler/constants/scheduler.constant';
import {ISchedulerConfig} from '../../ks-components/ks-scheduler/scheduler/scheduler.component';
import {SchedulerService} from '../../ks-components/ks-scheduler/services/scheduler.service';
import {DentistTimeSlotComponent} from '../customTimeSlots/dentist-time-slot/dentist-time-slot.component';

@Component({
  selector: 'app-scheduler-adapter',
  templateUrl: './scheduler-adapter.component.html',
  styleUrls: ['./scheduler-adapter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerAdapterComponent implements OnInit {
  public schedulerConfig: ISchedulerConfig;  // todo - figure how and where to store scheduler types.
  public selectedItemIndex;

  public itemsToSchedule: any[] = [
    {text: 'Item 1', id: 123, timeSlotType: TimeSlotTypes.REGULAR},
    {text: 'Item 2', id: 123, timeSlotType: TimeSlotTypes.REGULAR},
    {text: 'Dentist', id: 123, timeSlotType: TimeSlotTypes.CUSTOM, component: DentistTimeSlotComponent},
    {text: 'Item 3', id: 123, timeSlotType: TimeSlotTypes.REGULAR, classToAdd: 'custom-class-1'},
    {text: 'Item 4', id: 123, timeSlotType: TimeSlotTypes.REGULAR},
    {text: 'Item 5', id: 123, timeSlotType: TimeSlotTypes.REGULAR},
    {text: 'Item 6', id: 123, timeSlotType: TimeSlotTypes.REGULAR, classToAdd: 'custom-class-2'},
    {text: 'Item 7', id: 123, timeSlotType: TimeSlotTypes.REGULAR},
    {text: 'Item 8', id: 123, timeSlotType: TimeSlotTypes.REGULAR},
    {text: 'Item 9', id: 123, timeSlotType: TimeSlotTypes.REGULAR}];

  constructor(private schedulerStoreService: SchedulerStoreService, private schedulingMockData: SchedulingMockData,
              private schedulerService: SchedulerService) {
  }

  ngOnInit() {
    this.schedulerConfig = {
      getAvailability: this.getAvailability,
      getSchedules: this.getSchedules,
      schedule: this.schedule,
      deleteItem: this.deleteItem
    };
  }

  public onItemClick = (itemIndex) => {
    if (this.selectedItemIndex !== itemIndex) {
      this.schedulerStoreService.notifyAvailability(SCHEDULER_STORE_TYPE.OUT);
      this.schedulerStoreService.onAvailability((availability: number) => {
        if (availability === SCHEDULER_STORE_TYPE.IN) {
          this.selectedItemIndex = itemIndex;
        }
      });
    } else {
      this.showSchedules();
    }
  }

  private getAvailability = (startDate: Date, endDate: Date): Observable<any> => {
    return Observable.of(this.schedulingMockData.availability)
      .delay(Math.floor(Math.random() * 700));
  }


  private getSchedules = (startDate: Date, endDate: Date): Observable<any> => {
    return Observable.of(this.schedulingMockData.schedules)
      .delay(Math.floor(Math.random() * 700));
  }

  private schedule = ({date}) => {
    const selectedItem = this.itemsToSchedule[this.selectedItemIndex];
    this.itemsToSchedule.splice(this.selectedItemIndex, 1);
    this.selectedItemIndex = -1;

    let insertedItem;
    this.updateDB(date, {isAvailable: false, textToShow: selectedItem.text}, 'availability');
    if (selectedItem.timeSlotType === TimeSlotTypes.REGULAR) {
      insertedItem = this.updateDB(date, selectedItem.text, 'schedules');
    } else {
      const timeSlotData = {timeSlotType: TimeSlotTypes.CUSTOM, component: DentistTimeSlotComponent};
      insertedItem = this.updateDB(date, timeSlotData, 'schedules');
    }
    this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
  }

  private deleteItem = ({data, date}) => {
    this.itemsToSchedule.push({text: data, type: TimeSlotTypes.REGULAR}); // todo - id ?
    const insertedItem = this.updateDB(date, {isAvailable: true}, 'availability');
    this.updateDB(date, '', 'schedules');
    this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem); // todo - ?
  };

  private showSchedules = () => {
    this.selectedItemIndex = -1;
    this.schedulerStoreService.notifySchedules(SCHEDULER_STORE_TYPE.OUT);
  };

  private updateDB(date, data, collection) {
    const dateDetails = this.schedulerService.getDateDetails(date);
    if (!this.schedulingMockData[collection][dateDetails.year][dateDetails.month]) {
      this.schedulingMockData[collection][dateDetails.year][dateDetails.month] = {};
    }
    if (!this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth]) {
      this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth] = {};
      for (let i = 0; i < 24; i++) {
        this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth][i] = {};
      }
    }
    this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth][dateDetails.hours].data = data;

    return {
      [dateDetails.year]: {
        [dateDetails.month]: {
          [dateDetails.dayOfMonth]: {
            [dateDetails.hours]: {
              data: data
            }
          }
        }
      }
    };
  }
}

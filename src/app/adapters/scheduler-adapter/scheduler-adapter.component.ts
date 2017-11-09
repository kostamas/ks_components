import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  SCHEDULER_STORE_TYPE,
  SchedulerStoreService
} from '../../ks-components/ks-scheduler/services/scheduler-store.service';
import {Observable} from 'rxjs/Observable';
import {SchedulingMockData} from './schedulingMockData';
import {ISchedulerConfig} from '../../ks-components/ks-scheduler/scheduler/scheduler.component';
import {SchedulerService} from '../../ks-components/ks-scheduler/services/scheduler.service';
import {SimpleTimeSlotComponent} from './customTimeSlots/simple-time-slot/simple-time-slot.component';
import {TimeSlotConstant} from "../../ks-components/ks-scheduler/constants/timeSlot.constant";
import {AdvancedComponentComponent} from "./customTimeSlots/advanced-component/advanced-component.component";

const regularTimeSlot = TimeSlotConstant.TIME_SLOTS_TYPES.REGULAR;
const customTimeSlot = TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM;

@Component({
  selector: 'app-scheduler-adapter',
  templateUrl: './scheduler-adapter.component.html',
  styleUrls: ['./scheduler-adapter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[SchedulerStoreService]
})
export class SchedulerAdapterComponent implements OnInit{
  public schedulerConfig: ISchedulerConfig;  // todo - figure how and where to store scheduler types.
  public selectedItemIndex;

  public itemsToSchedule: any[] = [
    {title: 'Item 1', data: 'Item 1', timeSlotType: regularTimeSlot},
    {
      title: 'Dentist',
      timeSlotType: customTimeSlot,
      component: SimpleTimeSlotComponent,
      inputs: [{title: 'Dentist'}, {backgroundColor: '#D44444'}]
    },
    {
      title: 'Course',
      timeSlotType: customTimeSlot,
      component: SimpleTimeSlotComponent,
      inputs: [{title: 'CS Course'}, {backgroundColor: 'yellow'}, {color: 'black'}]
    },
    {
      title: 'Event (1)',
      timeSlotType: customTimeSlot,
      component: AdvancedComponentComponent,
      inputs: [{title: 'Event 1'}, {eventId: 'event1'}]
    },
    {title: 'Item 2', data: 'Item 2', timeSlotType: regularTimeSlot, classToAdd: 'custom-class-1'},
    {
      title: 'Wedding (NYC)',
      timeSlotType: customTimeSlot,
      component: SimpleTimeSlotComponent,
      inputs: [{title: 'Wedding'}, {backgroundColor: '#12bb05'}]
    },
    {
      title: 'Event (2)',
      timeSlotType: customTimeSlot,
      component: AdvancedComponentComponent,
      inputs: [{title: 'Event 2'}, {eventId: 'event2'}]
    },
    {title: 'Item 3', data: 'Item 3', timeSlotType: regularTimeSlot},
    {
      title: 'Work (morning)',
      timeSlotType: customTimeSlot,
      component: SimpleTimeSlotComponent,
      inputs: [{title: 'Work'}]
    },
    {title: 'Item 6', data: 'Item 6', timeSlotType: regularTimeSlot, classToAdd: 'custom-class-2'},
    {
      title: 'Work (night)',
      timeSlotType: customTimeSlot,
      component: SimpleTimeSlotComponent,
      inputs: [{title: 'Work'}, {backgroundColor: '#9239BB'}]
    }];

  constructor(private schedulerStoreService: SchedulerStoreService, private schedulingMockData: SchedulingMockData,
              private schedulerService: SchedulerService) {
  }

  ngOnInit() {
    this.schedulerConfig = {
      getAvailability: this.getAvailability,
      getSchedules: this.getSchedules,
      scheduleItem: this.scheduleItem,
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

  private scheduleItem = ({metaData, data}) => {
    const selectedItem = this.itemsToSchedule[this.selectedItemIndex];
    this.itemsToSchedule.splice(this.selectedItemIndex, 1);
    this.selectedItemIndex = -1;

    let insertedItem;

    this.updateDB(metaData.date, {isAvailable: false, textToShow: selectedItem.title}, 'availability');
    if (selectedItem.timeSlotType === TimeSlotConstant.TIME_SLOTS_TYPES.REGULAR) {
      insertedItem = this.updateDB(metaData.date, selectedItem.data, 'schedules');
    } else {
      const timeSlotData = selectedItem;
      insertedItem = this.updateDB(metaData.date, timeSlotData, 'schedules');
    }
    this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
  };

  private deleteItem = ({metaData, timeSlotData}) => {
    let itemToSchedule;
    if (metaData.timeSlotType === TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
      itemToSchedule = timeSlotData.data;
    } else {
      itemToSchedule = {title: timeSlotData.data, data: timeSlotData.data, timeSlotType: regularTimeSlot};
    }
    this.itemsToSchedule.push(itemToSchedule);
    const insertedItem = this.updateDB(metaData.date, {isAvailable: true}, 'availability');
    this.updateDB(metaData.date, '', 'schedules');
    this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
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
      [dateDetails.year]: {[dateDetails.month]: {[dateDetails.dayOfMonth]: {[dateDetails.hours]: {data: data}}}}
    };
  }
}

import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {SchedulerService} from '../services/scheduler.service';
import {SchedulerStoreService, TIME_SLOT_STORE_TYPE} from "../services/scheduler-store.service";

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: '1'})),
      transition('void => *', [
        style({opacity: '0'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({opacity: '1'}))
      ])
    ])
  ]
})
export class TimeSlotComponent implements OnChanges {

  @Input() timeSlotData: any;
  public TIME_SLOT_VIEWS = TimeSlotConstant.TIME_SLOT_VIEWS;

  constructor(private schedulerStoreService: SchedulerStoreService) {
  }

  ngOnChanges(changes: any) {
    if (!changes.timeSlotData || !changes.timeSlotData.currentValue || !changes.timeSlotData.currentValue.dynamicDefaultView) {

    }
  }

  public availableSlotClick() {
    this.schedulerStoreService.notifyTimeSlot(TIME_SLOT_STORE_TYPE.AVAILABILITY, this.timeSlotData.metaData.date, this.timeSlotData.data)
  }

  public getTypeof(val) {
    return typeof(val);
  }
}

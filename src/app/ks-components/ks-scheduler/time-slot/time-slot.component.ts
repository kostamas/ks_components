import {
  Component, ComponentFactoryResolver, DoCheck, Input, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {SchedulerStoreService, TIME_SLOT_STORE_TYPE} from "../services/scheduler-store.service";
import {isUndefined} from "util";

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
export class TimeSlotComponent implements DoCheck {

  @Input() timeSlotData: any;
  public TIME_SLOT_VIEWS = TimeSlotConstant.TIME_SLOT_VIEWS;
  public TIME_SLOTS_TYPES = TimeSlotConstant.TIME_SLOTS_TYPES;
  @ViewChild('customTimeSlot', {read: ViewContainerRef}) customTimeSlot: ViewContainerRef;
  private customTimeSlotCompoRef;

  constructor(private schedulerStoreService: SchedulerStoreService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public availableSlotClick() {
    this.schedulerStoreService.notifyTimeSlot(TIME_SLOT_STORE_TYPE.SCHEDULE, this.timeSlotData.metaData, this.timeSlotData.data)
  }

  public deleteItem() {
    let data: any = {};
    if (this.timeSlotData.metaData.timeSlotType === this.TIME_SLOTS_TYPES.CUSTOM) {
      data.component = this.timeSlotData.data.component;
      data.ref = this.customTimeSlotCompoRef;
    } else {
      data.component = this.timeSlotData.data;
    }
    this.schedulerStoreService.notifyTimeSlot(TIME_SLOT_STORE_TYPE.DELETE, this.timeSlotData.metaData, data);
  }

  ngDoCheck() {
    if (this.timeSlotData.metaData.timeSlotType === TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
      if (!this.customTimeSlotCompoRef) {
        this.compile();
      }
    } else {
      if (!!this.customTimeSlotCompoRef) {
        this.customTimeSlotCompoRef = undefined;
        this.customTimeSlot.remove();
      }
    }
  }

  private compile() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.timeSlotData.data.component);
    this.customTimeSlotCompoRef = this.customTimeSlot.createComponent(factory);
    this.customTimeSlotCompoRef.changeDetectorRef.detectChanges();
  }
}

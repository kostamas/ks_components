import {
  Component, ComponentFactoryResolver, DoCheck, Input, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {SchedulerStoreService, TIME_SLOT_STORE_TYPE} from "../services/scheduler-store.service";

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements DoCheck {

  public TIME_SLOT_VIEWS = TimeSlotConstant.TIME_SLOT_VIEWS;
  public TIME_SLOTS_TYPES = TimeSlotConstant.TIME_SLOTS_TYPES;
  private customTimeSlotCompoRef;

  @Input() timeSlotData: any;
  @ViewChild('customTimeSlot', {read: ViewContainerRef}) customTimeSlot: ViewContainerRef;

  constructor(private schedulerStoreService: SchedulerStoreService, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public availableSlotClick() {
    this.schedulerStoreService.notifyTimeSlot(TIME_SLOT_STORE_TYPE.SCHEDULE, this.timeSlotData.metaData, this.timeSlotData.data)
  }

  public deleteItem() {
    let timeSlotData: any = this.timeSlotData;
    if (this.timeSlotData.metaData.timeSlotType === this.TIME_SLOTS_TYPES.CUSTOM) {
      timeSlotData.componentRef = this.customTimeSlotCompoRef;
    }
    this.schedulerStoreService.notifyTimeSlot(TIME_SLOT_STORE_TYPE.DELETE, this.timeSlotData.metaData, timeSlotData);
  }

  ngDoCheck() {
    if(this.timeSlotData.metaData.timeSlotType === TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM){
    }
    if (this.timeSlotData.metaData.timeSlotType === TimeSlotConstant.TIME_SLOTS_TYPES.CUSTOM) {
      if (!this.customTimeSlotCompoRef) {
        this.compileComponent();
      }
    } else {
      if (!!this.customTimeSlotCompoRef) {
        this.customTimeSlotCompoRef = undefined;
        this.customTimeSlot.remove();
      }
    }
  }

  private compileComponent() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.timeSlotData.data.component);
    this.customTimeSlotCompoRef = this.customTimeSlot.createComponent(factory);
    this.customTimeSlotCompoRef.instance.date = new Date(this.timeSlotData.metaData.date);
    let inputName;
    if (Array.isArray(this.timeSlotData.data.inputs)) {
      this.timeSlotData.data.inputs.forEach(input => {
        inputName = Object.keys(input)[0];
        this.customTimeSlotCompoRef.instance[inputName] = input[inputName];
      });
    }
    this.customTimeSlotCompoRef.changeDetectorRef.detectChanges();
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TimeSlotConstant} from '../constants/timeSlot.constant';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss'],
  animations: [                         // todo - make as shared animation
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
export class TimeSlotComponent  {
  public TIME_SLOT_VIEWS;
  public topicMap;

  @Input() timeSlotData: any;

  @Output() availableSlotEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() initialScheduleLessonRemovedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    this.TIME_SLOT_VIEWS = TimeSlotConstant.TIME_SLOT_VIEWS;
    this.topicMap = { // todo - need to come from enum or something like that
      1: 'math',
      2: 'english'
    };
  }


  public availableSlotClick() {
    this.availableSlotEvent.emit(this.timeSlotData.data);
  }

  public removeInitialScheduleLesson() {
    this.initialScheduleLessonRemovedEvent.emit(this.timeSlotData.data);
  }
}

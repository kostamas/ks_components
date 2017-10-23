import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimeSlotComponent} from './time-slot.component';
import {SchedulingService} from '../services/scheduler.service';
import {InitialSchedulePaneComponent} from '../initial-schedule-pane/initial-schedule-pane.component';
import {KeysPipe} from '../../pipes/keys';
import {CalendarHoursPipe} from '../pipes/calendarHoursPipe.pipe';
import {PendingLessonsComponent} from '../pending-lessons/pending-lessons.component';
import {ZnkCalendarComponent} from '../calendar/calendar.component';
import {SchedulingComponent} from '../scheduling.component';
import {CommonModule} from '@angular/common';
import {SchedulingRoutingModule} from '../scheduling.route';
import {TranslateModule} from '@ngx-translate/core';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {CalendarConstant} from '../constants/scheduler.constant';

describe('TimeSlotComponent', () => {
  let component: TimeSlotComponent;
  let fixture: ComponentFixture<TimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SchedulingRoutingModule,
        TranslateModule
      ],
      declarations: [
        SchedulingComponent,
        ZnkCalendarComponent,
        TimeSlotComponent,
        PendingLessonsComponent,
        KeysPipe,
        InitialSchedulePaneComponent,
        CalendarHoursPipe
      ],
      providers: [
        TimeSlotConstant,
        SchedulingService,
        CalendarConstant
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotComponent);
    component = fixture.componentInstance;

    component.timeSlotData = {
      dynamicDefaultView: {
        timeSlotClass: 'TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS.EMPTY'
      },
      data: {
        topic: 'math',
      }
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

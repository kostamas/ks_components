import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZnkCalendarComponent } from './calendar.component';
import {CalendarHoursPipe} from '../pipes/calendarHoursPipe.pipe';
import {TimeSlotComponent} from '../time-slot/time-slot.component';
import {InitialSchedulePaneComponent} from '../initial-schedule-pane/initial-schedule-pane.component';
import {KeysPipe} from '../../pipes/keys';
import {PendingLessonsComponent} from '../pending-lessons/pending-lessons.component';
import {SchedulingComponent} from '../scheduling.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {SchedulingRoutingModule} from '../scheduling.route';
import {CalendarConstant} from '../constants/scheduler.constant';
import {TimeSlotConstant} from '../constants/timeSlot.constant';
import {SchedulingService} from '../services/scheduler.service';
import {HttpLoaderFactory} from '../../../app.module';
import {Http, HttpModule} from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ZnkCalendarComponent', () => {
  let component: ZnkCalendarComponent;
  let fixture: ComponentFixture<ZnkCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SchedulingRoutingModule,
        HttpModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        }),
        NoopAnimationsModule
      ],
      declarations: [
        ZnkCalendarComponent,
        CalendarHoursPipe,
        TimeSlotComponent,
        SchedulingComponent,
        ZnkCalendarComponent,
        TimeSlotComponent,
        PendingLessonsComponent,
        KeysPipe,
        InitialSchedulePaneComponent
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
    fixture = TestBed.createComponent(ZnkCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

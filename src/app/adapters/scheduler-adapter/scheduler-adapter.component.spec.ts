import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerAdapterComponent } from './scheduler-adapter.component';
import {SchedulerSpinnerComponent} from '../../ks-components/ks-scheduler/schedularSppiner/scheduler-spinner.component';
import {EllipsisPipe} from '../../../pipes/ellipsis.pipe';
import {KeysPipe} from '../../../pipes/keys.pipe';
import {SchedulerHoursPipe} from '../../ks-components/ks-scheduler/pipes/schedulerHoursPipe.pipe';
import {TimeSlotComponent} from '../../ks-components/ks-scheduler/time-slot/time-slot.component';
import {SchedulerComponent} from '../../ks-components/ks-scheduler/scheduler/scheduler.component';
import {
  MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {SchedulerStoreService} from '../../ks-components/ks-scheduler/services/scheduler-store.service';
import {SchedulerConstant} from '../../ks-components/ks-scheduler/constants/scheduler.constant';
import {SchedulerService} from '../../ks-components/ks-scheduler/services/scheduler.service';
import {TimeSlotConstant} from '../../ks-components/ks-scheduler/constants/timeSlot.constant';
import {SchedulingMockData} from './schedulingMockData';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SchedulerAdapterComponent', () => {
  let component: SchedulerAdapterComponent;
  let fixture: ComponentFixture<SchedulerAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        TranslateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [
        SchedulerAdapterComponent,
        SchedulerComponent,
        TimeSlotComponent,
        SchedulerHoursPipe,
        KeysPipe,
        EllipsisPipe,
        SchedulerSpinnerComponent
      ],
      providers:[
        TimeSlotConstant,
        SchedulerService,
        SchedulerConstant,
        SchedulerStoreService,
        SchedulingMockData
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

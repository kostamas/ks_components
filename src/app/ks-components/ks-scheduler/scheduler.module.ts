import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatInputModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';

import {SchedulerService} from './services/scheduler.service';

import {TimeSlotConstant} from './constants/timeSlot.constant';
import {SchedulerConstant} from './constants/scheduler.constant';

import {SchedulerHoursPipe} from './pipes/schedulerHoursPipe.pipe';
import {KeysPipe} from '../../../pipes/keys.pipe';
import {EllipsisPipe} from '../../../pipes/ellipsis.pipe';

import {SchedulerStoreService} from './services/scheduler-store.service';

import {SchedulerSpinnerComponent} from './schedularSppiner/scheduler-spinner.component';
import {SchedulerComponent} from './scheduler/scheduler.component';
import {TimeSlotComponent} from './time-slot/time-slot.component';
import {SchedulingMockData} from "../../adapters/scheduler-adapter/schedulingMockData";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [
    SchedulerComponent,
    TimeSlotComponent,
    SchedulerHoursPipe,
    KeysPipe,
    EllipsisPipe,
    SchedulerSpinnerComponent
  ],
  exports: [
    TranslateModule,
    SchedulerComponent
  ],
  providers: [
    TimeSlotConstant,
    SchedulerService,
    SchedulerConstant,
    SchedulerStoreService,
    SchedulingMockData
  ]
})
export class SchedulerModule {
}

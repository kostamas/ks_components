import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SchedulerComponent,
    TimeSlotComponent,
    SchedulerHoursPipe,
    KeysPipe,
    EllipsisPipe,
    SchedulerSpinnerComponent,
  ],
  exports: [
    TranslateModule,
    SchedulerComponent
  ],
  providers: [
    TimeSlotConstant,
    SchedulerService,
    SchedulerConstant,
    SchedulerStoreService
  ]
})
export class SchedulerModule{
}

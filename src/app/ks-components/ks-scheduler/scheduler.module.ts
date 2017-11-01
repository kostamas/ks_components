import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {SchedulerComponent} from './scheduler/scheduler.component';
import {TimeSlotComponent} from './time-slot/time-slot.component';
import {SchedulerService} from './services/scheduler.service';
import {TimeSlotConstant} from './constants/timeSlot.constant';
import {SchedulerConstant} from './constants/scheduler.constant';
import {SchedulerHoursPipe} from './pipes/schedulerHoursPipe.pipe';
import {KeysPipe} from '../../../pipes/keys';
import {SchedulerSpinnerComponent} from './schedularSppiner/scheduler-spinner.component';
import {SchedulerStoreService} from './services/scheduler-store.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    SchedulerComponent,
    TimeSlotComponent,
    SchedulerHoursPipe,
    KeysPipe,
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
    SchedulerStoreService
  ]
})
export class SchedulerModule{
}

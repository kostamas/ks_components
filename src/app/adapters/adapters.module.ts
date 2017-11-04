import {NgModule} from '@angular/core';
import {SchedulerAdapterComponent} from './scheduler-adapter/scheduler-adapter.component';
import {SchedulerModule} from '../ks-components/ks-scheduler/scheduler.module';
import {CommonModule} from '@angular/common';
import {SchedulingMockData} from './scheduler-adapter/schedulingMockData';
import {DentistTimeSlotComponent} from './customTimeSlots/dentist-time-slot/dentist-time-slot.component';

@NgModule({
  imports: [
    SchedulerModule,
    CommonModule,
  ],
  declarations: [
    SchedulerAdapterComponent,
    DentistTimeSlotComponent
  ],
  exports: [],
  entryComponents: [DentistTimeSlotComponent],
  providers: [
    SchedulingMockData
  ]
})
export class AdaptersModulesModule {
}

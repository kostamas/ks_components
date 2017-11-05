import {NgModule} from '@angular/core';
import {SchedulerAdapterComponent} from './scheduler-adapter/scheduler-adapter.component';
import {SchedulerModule} from '../ks-components/ks-scheduler/scheduler.module';
import {CommonModule} from '@angular/common';
import {SchedulingMockData} from './scheduler-adapter/schedulingMockData';
import {SimpleTimeSlotComponent} from './customTimeSlots/simple-time-slot/simple-time-slot.component';

@NgModule({
  imports: [
    SchedulerModule,
    CommonModule,
  ],
  declarations: [
    SchedulerAdapterComponent,
    SimpleTimeSlotComponent
  ],
  exports: [],
  entryComponents: [SimpleTimeSlotComponent],
  providers: [
    SchedulingMockData
  ]
})
export class AdaptersModulesModule {
}

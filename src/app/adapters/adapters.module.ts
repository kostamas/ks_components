import {NgModule} from '@angular/core';
import {SchedulerAdapterComponent} from './scheduler-adapter/scheduler-adapter.component';
import {SchedulerModule} from '../ks-components/ks-scheduler/scheduler.module';
import {CommonModule} from '@angular/common';
import {SchedulingMockData} from './scheduler-adapter/schedulingMockData';

@NgModule({
  imports: [
    SchedulerModule,
    CommonModule,
  ],
  declarations: [
    SchedulerAdapterComponent
  ],
  exports: [],
  providers: [
    SchedulingMockData
  ]
})
export class AdaptersModulesModule {
}

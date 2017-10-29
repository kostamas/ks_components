import {NgModule} from '@angular/core';
import {CalendarAdapterComponent} from './calendar-adapter/calendar-adapter.component';
import {CalendarModule} from '../ks-components/ks-calendar/calendar.module';
import {CommonModule} from '@angular/common';
import {SchedulingMockData} from './calendar-adapter/schedulingMockData';

@NgModule({
  imports: [
    CalendarModule,
    CommonModule,
  ],
  declarations: [
    CalendarAdapterComponent
  ],
  exports: [
  ],
  providers: [
    SchedulingMockData
  ]
})
export class AdaptersModulesModule {
}

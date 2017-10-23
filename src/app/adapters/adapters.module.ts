import {NgModule} from '@angular/core';
import {CalendarAdapterComponent} from './calendar-adapter/calendar-adapter.component';
import {CalendarModule} from '../ks-components/ks-calendar/calendar.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CalendarModule,
    CommonModule
  ],
  declarations: [
    CalendarAdapterComponent
  ],
  exports: [
  ],
  providers: [
  ]
})
export class AdaptersModulesModule {
}

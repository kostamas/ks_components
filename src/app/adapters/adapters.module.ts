import {NgModule} from '@angular/core';
import {CalendarAdapterComponent} from './calendar-adapter/calendar-adapter.component';
import {CalendarModule} from '../ks-components/ks-calendar/calendar.module';

@NgModule({
  imports: [
    CalendarModule
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

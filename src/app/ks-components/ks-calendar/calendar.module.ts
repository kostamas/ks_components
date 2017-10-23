import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CalendarComponent} from './calendar/calendar.component';
import {TimeSlotComponent} from './time-slot/time-slot.component';
import {SchedulerService} from './services/scheduler.service';
import {TimeSlotConstant} from './constants/timeSlot.constant';
import {SchedulerConstant} from './constants/scheduler.constant';
import {CalendarHoursPipe} from './pipes/calendarHoursPipe.pipe';
import {KeysPipe} from '../../../pipes/keys';
import {SchedulerSpinnerComponent} from './schedularSppiner/scheduler-spinner.component';
import {SchedulerStoreService} from './services/scheduler-store.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    CalendarComponent,
    TimeSlotComponent,
    CalendarHoursPipe,
    KeysPipe,
    SchedulerSpinnerComponent
  ],
  exports: [
    TranslateModule,
    CalendarComponent
  ],
  providers: [
    TimeSlotConstant,
    SchedulerService,
    SchedulerConstant,
    SchedulerStoreService
  ]
})
export class CalendarModule {
}

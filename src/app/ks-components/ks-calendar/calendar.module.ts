import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CalendarComponent} from './calendar/calendar.component';
import {TimeSlotComponent} from './time-slot/time-slot.component';
import {CalendarService} from './services/calendarservice';
import {TimeSlotConstant} from './constants/timeSlot.constant';
import {CalendarConstant} from './constants/calendar.constant';
import {CalendarHoursPipe} from './pipes/calendarHoursPipe.pipe';
import {KeysPipe} from '../../../pipes/keys';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    CalendarComponent,
    TimeSlotComponent,
    CalendarHoursPipe,
    KeysPipe
  ],
  exports: [
    TranslateModule,
    CalendarComponent
  ],
  providers: [
    TimeSlotConstant,
    CalendarService,
    CalendarConstant
  ]
})
export class CalendarModule {
}

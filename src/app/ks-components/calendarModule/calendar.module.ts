import {NgModule} from '@angular/core';
import {CalendarDatePickerService} from './calendarDatePicker/calendarDatePicker.service';
import {CalendarDateRangePickerComponent} from './calendarDatePicker/calendarDateRangePicker.component';
import {MultiDatePickerComponent} from './multiDatePicker/multiDatePicker.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    CalendarDateRangePickerComponent,
    MultiDatePickerComponent
  ],
  providers: [
    CalendarDatePickerService
  ],
  exports: [
    CalendarDateRangePickerComponent,
    MultiDatePickerComponent
  ]
})
export class CalendarModule {
}

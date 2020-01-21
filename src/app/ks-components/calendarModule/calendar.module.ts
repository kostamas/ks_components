import {NgModule} from '@angular/core';
import {CalendarDatePickerService} from './calendarDatePicker/calendarDatePicker.service';
import {CalendarDateRangePickerComponent} from './calendarDatePicker/calendarDateRangePicker.component';
import {MultiDatePickerComponent} from './multiDatePicker/multiDatePicker.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
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

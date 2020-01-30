import {NgModule} from '@angular/core';
import {CalendarDateRangePickerComponent} from './calendarDatePicker/calendarDateRangePicker.component';
import {MultiDatePickerComponent} from './multiDatePicker/multiDatePicker.component';
import {BrowserModule} from '@angular/platform-browser';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MultiDatePickerWrapperComponent} from './multi-date-picker-wrapper/multi-date-picker-wrapper.component';
import {CalendarDatePickerService} from '../services/calendarDatePicker.service';
import {DateInputComponent} from './date-input/date-input.component';

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalendarDateRangePickerComponent,
    MultiDatePickerComponent,
    MultiDatePickerWrapperComponent,
    DateInputComponent
  ],
  entryComponents: [
    CalendarDateRangePickerComponent,
    MultiDatePickerComponent,
    MultiDatePickerWrapperComponent
  ],
  providers: [
    CalendarDatePickerService
  ],
  exports: [
    CalendarDateRangePickerComponent,
    MultiDatePickerComponent,
    MultiDatePickerWrapperComponent,
    DateInputComponent
  ]
})
export class CalendarModule {
}

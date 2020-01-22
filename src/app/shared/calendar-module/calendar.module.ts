import {NgModule} from '@angular/core';
import {CalendarDatePickerService} from '../../services/calendarDatePicker.service';
import {CalendarDateRangePickerComponent} from './calendarDatePicker/calendarDateRangePicker.component';
import {MultiDatePickerComponent} from './multiDatePicker/multiDatePicker.component';
import {BrowserModule} from '@angular/platform-browser';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {DateInputComponent} from './date-input/date-input.component';
import {MultiDatePickerWrapperComponent} from './multi-date-picker-wrapper/multi-date-picker-wrapper.component';

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
		DateInputComponent,
		MultiDatePickerWrapperComponent
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
		DateInputComponent,
		MultiDatePickerWrapperComponent
	]
})
export class CalendarModule {
}

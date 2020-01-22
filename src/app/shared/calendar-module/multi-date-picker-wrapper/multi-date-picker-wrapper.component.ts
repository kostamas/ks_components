import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarDatePickerService} from '../../../services/calendarDatePicker.service';
import {IFromTo} from '../../../types/calendar';

@Component({
	selector: 'app-multi-date-picker-wrapper',
	templateUrl: './multi-date-picker-wrapper.component.html',
	providers: [CalendarDatePickerService]
})
export class MultiDatePickerWrapperComponent implements OnInit {
	public multiDatePickerConfig: any = {};

	@Input('format') format: string;
	@Input('initialDate') initialDate: any;
	@Input('selectedRange') selectedRange: any;
	@Input('disabledRanges') disabledRanges: IFromTo[];
	@Input('isSelectToMode') isSelectToMode: boolean;
	@Input('allowPastDates') allowPastDates: boolean;
  @Input('detectChangesManually') detectChangesManually: boolean = false;

	@Output('rangeSelected') rangeSelected: EventEmitter<string> = new EventEmitter<string>();

	constructor(private calendarDatePickerService: CalendarDatePickerService) {
	}

	ngOnInit(): void {
		if (this.format) {
			this.multiDatePickerConfig.format = this.format;
		}
		if (this.initialDate && !this.selectedRange) {
			this.multiDatePickerConfig.selectedRange = {
				firstDate: this.initialDate,
				lastDate: this.initialDate
			};
		}
		if (this.selectedRange) {
			this.multiDatePickerConfig.selectedRange = {
				firstDate: this.selectedRange.from,
				lastDate: this.selectedRange.to
			};
		}

		if (this.isSelectToMode) {
			setTimeout(() => setTimeout(() => this.calendarDatePickerService.sameDateClick$.next()));
		}
	}

	onSelectRange(selectedRange: any): void {
		if (selectedRange) {
			this.rangeSelected.emit(selectedRange);
		}
	}
}

import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';
import {CalendarDatePickerService} from '../../../services/calendarDatePicker.service';
import * as momentNs from 'moment';
const moment = momentNs;
import {IValidationStatus} from '../../../types/ISelect';
import {Subject} from 'rxjs';
import {IModal, IModalConfig} from '../../../types/modal';
import {ModalService} from '../../modal-module/modal.service';
import {MultiDatePickerWrapperComponent} from '../multi-date-picker-wrapper/multi-date-picker-wrapper.component';
import {CalendarDateRangePickerComponent} from '../calendarDatePicker/calendarDateRangePicker.component';
import {DATE_FORMAT} from '../../../constants/shared.constant';

@Component({
	selector: 'app-date-input',
	templateUrl: './date-input.component.html',
	styleUrls: ['./date-input.component.scss'],
	providers: [CalendarDatePickerService],
	encapsulation: ViewEncapsulation.None
})
export class DateInputComponent implements OnInit, OnChanges {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public validationStatus: IValidationStatus = {isValid: true};
	public selectedRangeText: string = '';
	public modalConfig: IModalConfig;
	public modal: IModal;

	@Input('dateFormat') dateFormat: string;
	@Input('selectedDate') selectedDate: any = ''; // todo - add selected range
	@Input('selectedDateArr') selectedDateArr: string[];
	@Input('withoutDefaultDate') withoutDefaultDate: boolean = false;
	@Input('multiDatePicker') multiDatePicker: boolean = false;
	@Input('calendarDate') calendarDate: string = '';
	@Input('isOpen') isOpen: boolean = false;
	@Input('validationStatus$') validationStatus$: Subject<IValidationStatus>;
	@Input('openInModal') openInModal: boolean = false;
	@Input('allowPastDates') allowPastDates: boolean = false;
  @Input('detectChangesManually') detectChangesManually: boolean = false;

	@ViewChild('dateInputElement') dateInputElement: ElementRef;
	@ViewChild('calendarWrapperElement') calendarWrapperElement: ElementRef;

	@Output('dateSelected') dateSelected: EventEmitter<string> = new EventEmitter<string>();
	@Output('rangeSelected') rangeSelected: EventEmitter<any> = new EventEmitter<any>();
	@Output('dateDeleted') dateDeleted: EventEmitter<any> = new EventEmitter<any>();
	@Output('isOpenChanged') isOpenChanged: EventEmitter<any> = new EventEmitter<any>();

	constructor(private calendarDatePickerService: CalendarDatePickerService, public modalService: ModalService) {
	}

	ngOnInit(): void {
		if (!this.selectedDate && !this.withoutDefaultDate) {
			this.selectedDate = moment().format(this.dateFormat ? this.dateFormat : DATE_FORMAT);
		}
		if (this.multiDatePicker) {
			if (this.selectedDate && this.selectedDate.from && this.selectedDate.to) {
				this.selectedRangeText = moment(this.selectedDate.from, DATE_FORMAT).format(DATE_FORMAT) + ' - ' + moment(this.selectedDate.to).format(DATE_FORMAT);
			}
		}

		if (this.validationStatus$) {
			this.validationStatus$.subscribe(validationStatus => this.validationStatus = validationStatus);
		}

		this.isOpenChanged.next(this.isOpen);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedDate && changes.selectedDate.currentValue && !changes.selectedDate.firstChange) {
			const selectedDate = changes.selectedDate.currentValue;
			if (this.multiDatePicker) {
				if (this.selectedDate.from && this.selectedDate.to) {
					this.selectedRangeText = moment(selectedDate.from, DATE_FORMAT).format(DATE_FORMAT) + ' - ' + moment(selectedDate.to).format(DATE_FORMAT);
				}
			}
			if (changes.selectedDate.currentValue === null) {
				this.clearDateInput();
			}
		}
	}

  @HostListener('document:click', ['$event'])
	documentClickHandler = (event: any) => {
		const {dateInputElement} = this;
		if (!dateInputElement.nativeElement.contains(event.target) && !this.calendarWrapperElement.nativeElement.contains(event.target)) {
			this.isOpen = false;
			this.isOpenChanged.next(this.isOpen);
		}
	}

	openDatePicker(): void {
		this.isOpen = true;
		if (!this.openInModal) {
			this.isOpenChanged.next(this.isOpen);
			if (this.selectedDate) {
				this.calendarDatePickerService.selectDate$.next(moment(this.selectedDate, DATE_FORMAT));
			}
		} else {
			const {x, y, width, left, top} = this.dateInputElement.nativeElement.getBoundingClientRect();
			this.modalConfig = {
				modalClass: 'date-options-modal',
				style: {width: `${width - 2}px`},
				closeModalCallback: () => {
					this.modal = null;
					this.isOpen = false;
				}
			};

			let componentToCompile;
			let componentInputs;
			let componentOutputs;

			if (this.multiDatePicker) {
				const position = {x: (x || left) + 353, y: (y || top) + 193};
				this.modalConfig.position = position;
				componentToCompile = MultiDatePickerWrapperComponent;
				componentInputs = {
					isSingleSelection: true,
					dateFormat: this.dateFormat,
					date: this.selectedDate,
					allowPastDates: this.allowPastDates
				};
				componentOutputs = {
					rangeSelected: (date: string) => {
						this.onSelectRange(date);
						this.modal.closeModal();
					}
				};
			} else {
				const position = {x: (x || left) + 120, y: (y || top) + 136};
				this.modalConfig.position = position;
				componentToCompile = CalendarDateRangePickerComponent;
				componentInputs = {
					isSingleSelection: true,
					dateFormat: this.dateFormat,
					date: this.selectedDate,
					calendarDatePickerService: this.calendarDatePickerService,
					allowPastDates: this.allowPastDates
				};
				componentOutputs = {
					selectedRange: (date: string) => {
						this.onSelectDate(date);
						this.modal.closeModal();
					}
				};
			}
			this.modal = this.modalService.open(componentToCompile, this.modalConfig, null, componentInputs, componentOutputs);
		}
	}

	onSelectDate = (date: string) => {
		this.selectedDate = moment(date, DATE_FORMAT).format(this.dateFormat ? this.dateFormat : DATE_FORMAT);
		this.dateSelected.next(this.selectedDate);
		this.isOpen = false;
		this.isOpenChanged.next(this.isOpen);
	}

	onSelectRange = (range: any) => {
		this.rangeSelected.next(range);
		this.isOpen = false;
		this.isOpenChanged.next(this.isOpen);
		this.selectedRangeText = moment(range.from, DATE_FORMAT).format(DATE_FORMAT) + ' - ' + moment(range.to).format(DATE_FORMAT);
	}

	deleteDate(dateToDelete: string, index: number): void {
		this.dateDeleted.next({deletedDate: dateToDelete, index});
		this.selectedDateArr.splice(index, 1);
	}

	clearDateInput($event?: MouseEvent): void {
		if (this.multiDatePicker) {
			this.selectedDate = '';
			this.selectedRangeText = '';
			this.rangeSelected.next('');
		} else {
			this.selectedDate = '';
			this.calendarDatePickerService.selectDate$.next(this.selectedDate);
			this.dateSelected.next('');
		}
		if ($event) {
			$event.stopPropagation();
		}
	}

	selectedDateClickHandler($event: MouseEvent): void {
		$event.stopPropagation();
	}
}

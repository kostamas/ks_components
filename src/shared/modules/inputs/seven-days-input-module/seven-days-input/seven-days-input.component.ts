import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ICheckboxItem} from '../../../../types/buttons';
import {MultiSelectColorfulOptionsComponent} from '../../select-module/options/multi-select-colorful-options/multi-select-colorful-options.component';
import {ISelectItem} from '../../../../types/ISelect';
import {Subject} from 'rxjs';
import {ISelectInputConfig, ISevenDaysInput} from '../../../../types/seven-days-input';

@Component({
	selector: 'app-seven-days-input',
	templateUrl: './seven-days-input.component.html',
	styleUrls: ['./seven-days-input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SevenDaysInputComponent implements OnInit {
	@Input() sevenDaysMainList: ISevenDaysInput;
	@Input() sevenDaysSelectInputOptions: ISelectItem[];
	@Input() selectInputConfig: ISelectInputConfig;
	@Input() reset$: Subject<any>;

	@Output() sevenDaysChanged: EventEmitter<ISevenDaysInput> = new EventEmitter();

	public selectColorfulOptionsComponent: any = MultiSelectColorfulOptionsComponent;
	public inputText$: Subject<string> = new Subject<string>();


	public multiSelectInputs: any;
	sevenDaysKeys: string[];

	constructor() {
	}

	ngOnInit(): void {


		if (this.reset$) {
			this.reset$.subscribe(() => {
				this.resetHandler();
			});
		}

		if (!this.sevenDaysMainList) {
			this.sevenDaysMainList = {
				sun: true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true
			};
		}
		this.sevenDaysKeys = Object.keys(this.sevenDaysMainList);
		this.initializeSelectInput();
	}

	resetHandler(): void {
		const defaultSevenDaysMainList: ISevenDaysInput = {
			sun: true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true
		};
		if (this.selectInputConfig) {
			this.sevenDaysSelectInputOptions = [
				{text: 'Sunday', value: 'sun', isSelected: true},
				{text: 'Monday', value: 'mon', isSelected: true},
				{text: 'Tuesday', value: 'tue', isSelected: true},
				{text: 'Wednesday', value: 'wed', isSelected: true},
				{text: 'Thursday', value: 'thu', isSelected: true},
				{text: 'Friday', value: 'fri', isSelected: true},
				{text: 'Saturday', value: 'sat', isSelected: true},
			];
			this.syncSevenDaysMainList();
		} else {
			this.sevenDaysMainList = defaultSevenDaysMainList;
		}
	}

	initializeSelectInput(): void {
		if (this.selectInputConfig) {
			if (!this.sevenDaysSelectInputOptions) {
				this.sevenDaysSelectInputOptions = [
					{text: 'Sunday', value: 'sun', isSelected: true},
					{text: 'Monday', value: 'mon', isSelected: true},
					{text: 'Tuesday', value: 'tue', isSelected: true},
					{text: 'Wednesday', value: 'wed', isSelected: true},
					{text: 'Thursday', value: 'thu', isSelected: true},
					{text: 'Friday', value: 'fri', isSelected: true},
					{text: 'Saturday', value: 'sat', isSelected: true},
				];
			}
			this.syncSevenDaysMainList();
			this.multiSelectInputs = [
				{text: 'All Days', handler: this.markDays.bind(this, 'all'), separator: ' |'},
				{text: 'WeekDays', handler: this.markDays.bind(this, 'weekDays'), separator: ' |'},
				{text: 'Weekend', handler: this.markDays.bind(this, 'weekend')},
			];
			this.inputText$.next(this.calcSelectInputText());
		}
	}

	checkHandler(checkboxItem: ICheckboxItem, day: string): void {
		const numOfCheckedItems = Object.values(this.sevenDaysMainList).filter(item => item).length;
		const isLastCheckedItem = checkboxItem.isSelected && numOfCheckedItems === 1;
		if (!isLastCheckedItem) {
			this.sevenDaysMainList[day] = !checkboxItem.isSelected;
			this.sevenDaysChanged.next(this.sevenDaysMainList);
		}
	}

	markDays(daysType: string): void {
		switch (daysType) {
			case 'all':
				this.sevenDaysMainList = {
					sun: true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true
				};
				break;
			case 'weekDays':
				this.sevenDaysMainList = {
					sun: false, mon: true, tue: true, wed: true, thu: true, fri: true, sat: false
				};
				break;
			case'weekend':
				this.sevenDaysMainList = {
					sun: true, mon: false, tue: false, wed: false, thu: false, fri: false, sat: true
				};
				break;
		}

		if (this.selectInputConfig) {
			this.syncSevenDaysSelectInput();
		}
		this.sevenDaysChanged.next(this.sevenDaysMainList);
	}


	syncSevenDaysSelectInput(): void {
		Object.keys(this.sevenDaysMainList).forEach((day, ind) => {
			this.sevenDaysSelectInputOptions[ind].isSelected = this.sevenDaysMainList[day];
		});
		this.inputText$.next(this.calcSelectInputText());
	}

	syncSevenDaysMainList(): void {
		Object.keys(this.sevenDaysMainList).forEach((day, ind) => {
			if (this.sevenDaysSelectInputOptions[ind].isSelected) {
				this.sevenDaysMainList[day] = true;
			} else {
				this.sevenDaysMainList[day] = false;
			}
		});
		this.sevenDaysChanged.next(this.sevenDaysMainList);
	}

	multipleSelectTextInputHandler = () => {
		return this.calcSelectInputText();
	};

	calcSelectInputText(): string {
		let text = '';
		const selectedIndex: number[] = [];
		Object.keys(this.sevenDaysMainList).forEach((day, ind) => {
			if (this.sevenDaysMainList[day]) {
				selectedIndex.push(ind);
				text += (text ? ' ,' + day : day);
			}
		});
		if (selectedIndex.length === 7) {
			text = 'All Days';
		} else if (selectedIndex.length === 5) {
			if (!this.sevenDaysMainList.sun && !this.sevenDaysMainList.sat) {
				text = 'Weekdays';
			}
		} else if (selectedIndex.length === 2) {
			if (selectedIndex.includes(6) && selectedIndex.includes(0)) {
				text = 'Weekend';
			}
		}
		return text;
	}


	isSingleSelected(): boolean {
		return Object.values(this.sevenDaysMainList).filter(d => d).length === 1;
	}
}


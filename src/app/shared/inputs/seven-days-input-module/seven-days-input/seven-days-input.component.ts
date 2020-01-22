import {
	Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import {ICheckboxItem} from '../../../../types/buttons';
import {MultiSelectColorfulOptionsComponent} from '../../select-module/options/multi-select-colorful-options/multi-select-colorful-options.component';
import {ISelectItem} from '../../../../types/ISelect';
import {Subject} from 'rxjs';
import {ISelectInputConfig, ISevenDaysInput} from '../../../../types/seven-days-input';
import {JsUtils} from '../../../../utils/jsUtils';

@Component({
	selector: 'app-seven-days-input',
	templateUrl: './seven-days-input.component.html',
	styleUrls: ['./seven-days-input.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SevenDaysInputComponent implements OnInit, OnDestroy, OnChanges {
	public sevenDaysSelectionChanged$: Subject<any> = new Subject();
	public sevenDaysSelectInputOptions: ISelectItem[] = [];
	public selectColorfulOptionsComponent: any = MultiSelectColorfulOptionsComponent;
	public inputText$: Subject<string> = new Subject<string>();
	public componentInputs: any = {};
	public multiSelectInputs: any;
	public isSingleSelection: boolean = true;
	public sevenDaysKeys: string[];
	private subscriptionsArray: any[] = [];

	@Input() sevenDaysMainList: ISevenDaysInput;
	@Input() selectInputConfig: ISelectInputConfig;
	@Input() reset$: Subject<any>;
	@Input() isDisabled: boolean = false;

	@Output() sevenDaysChanged: EventEmitter<ISevenDaysInput> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
		if (this.reset$) {
			this.subscriptionsArray.push(this.reset$.subscribe(() => {
				this.resetHandler();
			}));
		}
		if (!this.sevenDaysMainList) {
			this.sevenDaysMainList = {
				sun: true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true
			};
		}
		this.sevenDaysKeys = Object.keys(this.sevenDaysMainList);
		this.initializeSelectInput();
		this.isSingleSelection = JsUtils.isDefined(this.selectInputConfig && this.selectInputConfig.isSingleSelection) ? this.selectInputConfig.isSingleSelection : true;
		this.componentInputs = {
			headerButtons: this.multiSelectInputs,
			isSingleSelection: this.isSingleSelection,
			selectionChanged$: this.sevenDaysSelectionChanged$
		};
		if (this.selectInputConfig && this.selectInputConfig.selectAllConfig) {
			this.componentInputs.selectAllConfig = this.selectInputConfig.selectAllConfig;
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.sevenDaysMainList && !changes.sevenDaysMainList.firstChange) {
			this.syncSevenDaysSelectInput();
			this.inputText$.next(this.calcSelectInputText());
		}
		if (changes.selectInputConfig && !changes.selectInputConfig.firstChange) {
			this.componentInputs.selectAllConfig = changes.selectInputConfig.currentValue.selectAllConfig;
		}
	}

	resetHandler(): void {
		const defaultSevenDaysMainList: ISevenDaysInput = {
			sun: true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true
		};
		if (this.selectInputConfig) {
		} else {
			this.sevenDaysMainList = defaultSevenDaysMainList;
		}
	}

	initializeSelectInput(): void {
		if (this.selectInputConfig) {
			this.sevenDaysSelectInputOptions = [{name: 'Sunday', id: 'sun'}, {name: 'Monday', id: 'mon'},
				{name: 'Tuesday', id: 'tue'}, {name: 'Wednesday', id: 'wed'}, {name: 'Thursday', id: 'thu'},
				{name: 'Friday', id: 'fri'}, {name: 'Saturday', id: 'sat'}
			];
			if (this.sevenDaysMainList) {
				this.syncSevenDaysSelectInput();
			}

			this.multiSelectInputs = [
				{text: 'All Days', handler: this.markDays.bind(this, 'all'), separator: ' |', class: 'click-able-red'},
				{text: 'Weekdays', handler: this.markDays.bind(this, 'weekdays'), separator: ' |', class: 'click-able-red'},
				{text: 'Weekend', handler: this.markDays.bind(this, 'weekend'), class: 'click-able-red'},
			];
			this.inputText$.next(this.calcSelectInputText());
		}
	}

	checkHandler(checkboxItem: ICheckboxItem, day: string): void {
		const numOfCheckedItems = Object.keys(this.sevenDaysMainList).filter(key => this.sevenDaysMainList[key]).length;
		const isLastCheckedItem = checkboxItem.isSelected && numOfCheckedItems === 1;
		if (!isLastCheckedItem || !this.isSingleSelection) {
			this.sevenDaysMainList[day] = !checkboxItem.isSelected;
			this.sevenDaysChanged.next(this.sevenDaysMainList);
		}
	}

	markDays(daysType: string): void {
		let daysKeys = {'sun': true, mon: true, tue: true, wed: true, thu: true, fri: true, sat: true};

		switch (daysType) {
			case 'all':
				break;
			case 'weekdays':
				daysKeys = {'sun': false, mon: true, tue: true, wed: true, thu: true, fri: true, sat: false};
				break;
			case'weekend':
				daysKeys = {'sun': true, mon: false, tue: false, wed: false, thu: false, fri: false, sat: true};
				break;
		}
		Object.keys(daysKeys).forEach(k => this.sevenDaysMainList[k] = daysKeys[k]);
		if (this.selectInputConfig) {
			this.syncSevenDaysSelectInput();
		}
		this.sevenDaysSelectionChanged$.next();
		this.sevenDaysChanged.next(this.sevenDaysMainList);
	}

	syncSevenDaysSelectInput(): void {
		if (!this.sevenDaysSelectInputOptions.length) {
			this.initializeSelectInput();
		}
		if (this.selectInputConfig) {
			Object.keys(this.sevenDaysMainList).forEach((day, ind) => {
				this.sevenDaysSelectInputOptions[ind].isSelected = this.sevenDaysMainList[day];
			});
		}
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
				day = JsUtils.capitalize(day);
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
		} else if (selectedIndex.length === 0) {
			text = 'All Options';
		}
		return text;
	}


	isSingleSelected(): boolean {
		return Object.keys(this.sevenDaysMainList)
			.filter(key => this.sevenDaysMainList[key]).length === 1 && this.isSingleSelection;
	}

	onListChange($event: ISelectItem[]): void {
		this.syncSevenDaysMainList();
		this.inputText$.next(this.calcSelectInputText());
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
	}
}


import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IValidationStatus, ISelectItem} from '../../../../../types/ISelect';
import {ICheckboxItem} from '../../../../../types/buttons';
import {Subject} from 'rxjs';

/**
 * data.HideHeaders :
 * true => hide the headers (with the button all, or custom buttons)
 * false / default(undefined) => show headers buttons (All)
 * notice: you need to add trhe button All to the selectList of the component in order to see the button in the headers.
 **/
@Component({
	selector: 'app-multi-select-colorful-options',
	templateUrl: './multi-select-colorful-options.component.html',
	styleUrls: ['./multi-select-colorful-options.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MultiSelectColorfulOptionsComponent implements OnInit, OnDestroy {
	public selectList: ISelectItem[];
	public allOptionItem: ICheckboxItem = {value: 'all', isSelected: true};
	public validators: any;
	public validationStatus: IValidationStatus = <IValidationStatus>{};
	public validationStatus$: Subject<any>;
	public unsubscribeArr: any[] = [];

	@Input('data') data: any;

	@Output() validationEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() {
	}

	ngOnInit(): void {
		this.selectList = this.data.selectList;

		if (this.data.validators) {
			this.validators = this.data.validators;
		}
		if (this.data.validationStatus$) {
			const subscription = this.data.validationStatus$.subscribe((r) => this.setValidationStatus(r));
			this.unsubscribeArr.push(subscription);
		}
		if (this.data.selectionChanged$) {
			const subscription = this.data.selectionChanged$.subscribe(() => {
				this.calcAllOptionItem();
				this.data.onListChange(this.selectList);
			});
			this.unsubscribeArr.push(subscription);
		}
		this.initValidators();
		if (!this.data.hideHeaders) {
			this.calcAllOptionItem();
		}

		if (this.data.selectAllConfig && this.data.selectAllConfig.selectAllOptionValue) {
			this.allOptionItem = this.data.selectAllConfig.selectAllOptionValue;
		}
	}


	initValidators(): void {
		this.setValidationStatus({message: '', isValid: true});
		if (this.validators) {
			if (!Array.isArray(this.validators)) {
				this.validators = <((x?: any) => any)[]>[this.validators];
			}
			this.validate(false);
		}
	}


	calcAllOptionItem(): void {
		const isAllSelected = this.selectList.filter(option => (option.isSelected && option.name === 'All')).length > 0;
		if (isAllSelected) {
			this.selectList.forEach(option => option.isSelected = true);
		} else {
			const countSelected = this.selectList.filter(option => option.isSelected).length;
			const isAllOptionExists = this.selectList.some(option => option.name === 'All');
			const numOfOptionsWithoutAll = isAllOptionExists ? this.selectList.length - 1 : this.selectList.length;
			if (countSelected === numOfOptionsWithoutAll) {
				this.allOptionItem.isSelected = true;
				this.selectList.forEach((option: ISelectItem) => {
					if (option.name === 'All') {
						option.isSelected = true;
					}
				});
			} else {
				this.allOptionItem.isSelected = false;
			}
		}
	}

	selectAll(): void {
		if (this.data.selectAllConfig && this.data.selectAllConfig.selectAllHandler) {
			this.data.selectAllConfig.selectAllHandler(this.selectList, this.allOptionItem);
			this.data.onListChange(this.selectList);
		} else {
			let index = -1;
			const countSelected = this.selectList.filter((option: any) => option.isSelected).length;
			const isSelected = countSelected !== this.selectList.length;
			this.allOptionItem.isSelected = isSelected;

			this.selectList.forEach((option, ind) => {
				if (option.name === 'All') {
					index = ind;
				}
				option.isSelected = isSelected;
			});

			this.data.onSelectItem(index, true);
		}
	}

	checkboxChecked(index: string): void {
		const selectedItems: ISelectItem[] = this.selectList.filter(o => o.isSelected);
		if (selectedItems.length === 1 && this.selectList[index].name === selectedItems[0].name && this.data.isSingleSelection) {
			return;
		}
		this.selectList[index].isSelected = !this.selectList[index].isSelected;
		const value: boolean = this.selectList[index].isSelected;
		if (this.selectList[index].name !== 'All' && !this.data.hideHeaders) {
			this.selectList.filter(option => {
				if (option.name === 'All') {
					option.isSelected = false;
					this.allOptionItem.isSelected = false;
				}
			});
		}
		this.data.onSelectItem(index, value);
		this.data.onListChange(this.selectList);
		if (!this.data.hideHeaders) {
			this.calcAllOptionItem();
		}
		this.validate(true);
	}

	isSingleSelected(): boolean {
		return this.data.isSingleSelection && this.selectList.filter(o => o.isSelected).length === 1;
	}


	validate(isDirty: boolean): void {
		if (this.validators) {
			this.setValidationStatus({message: '', isValid: true});
			this.validators.forEach(cb => {
				const validationResult = cb({val: this.selectList, isDirty});
				if (!validationResult.isValid) {
					this.setValidationStatus(validationResult);
				}
			});
		}
	}

	setValidationStatus(validationResult: any): void {
		this.validationStatus = validationResult;
		this.data.setStatus(validationResult);
	}

	ngOnDestroy(): void {
		this.unsubscribeArr.forEach(subscription => subscription.unsubscribe());
	}

}

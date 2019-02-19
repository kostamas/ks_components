import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ISelectItem} from '../../../../../types/ISelect';
import {ICheckboxItem} from '../../../../../types/buttons';

@Component({
	selector: 'app-multi-select-colorful-options',
	templateUrl: './multi-select-colorful-options.component.html',
	styleUrls: ['./multi-select-colorful-options.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MultiSelectColorfulOptionsComponent implements OnInit {

	@Input('data') data: any;
	public selectList: ISelectItem[];
	public allOptionItem: ICheckboxItem = {value: 'all', isSelected: true};

	constructor() {
	}

	ngOnInit(): void {
		this.selectList = this.data.selectList;
		this.calcAllOptionItem();
	}

	calcAllOptionItem(): void {
		const isAllSelected = this.selectList.filter(option => (option.isSelected && option.value === 'All')).length > 0;
		if (isAllSelected) {
			this.selectList.forEach(option => option.isSelected = true);
		} else {
			const countSelected = this.selectList.filter(option => option.isSelected).length;
			if (countSelected === this.selectList.length - 1) {
				this.selectList.filter(option => {
					if (option.value === 'All') {
						option.isSelected = true;
						this.allOptionItem.isSelected = true;
					}
				});
			} else {
				this.allOptionItem.isSelected = false;
			}
			if (countSelected === 0) {
				this.selectAll();
			}
		}
	}

	selectAll(): void {
		let index = -1;
		this.allOptionItem.isSelected = true;
		this.selectList.forEach((option, ind) => {
			if (option.value === 'All') {
				index = ind;
			}
			option.isSelected = true;
		});
		this.data.getSelection(index, true);
	}

	checkboxChecked(index: string): void {
		const selectedItems: ISelectItem[] = this.selectList.filter(o => o.isSelected);
		if (selectedItems.length === 1 && this.selectList[index].text === selectedItems[0].text) {
			return;
		}
		this.selectList[index].isSelected = !this.selectList[index].isSelected;
		const value: boolean = this.selectList[index].isSelected;
		if (this.selectList[index].value !== 'All') {
			this.selectList.filter(option => {
				if (option.value === 'All') {
					option.isSelected = false;
					this.allOptionItem.isSelected = false;
				}
			});
		}
		this.data.getSelection(index, value);
		this.calcAllOptionItem();
	}

	isSingleSelected(): boolean {
		return this.selectList.filter(o => o.isSelected).length === 1;
	}
}

import {Injectable} from '@angular/core';
import {ISelectItem} from '../../../types/ISelect';

@Injectable({
	providedIn: 'root'
})
export class SelectInputService {
	updateIsSelected(optionList: ISelectItem[], inputTexts: string[], values: any []): void {
		if (inputTexts) {
			optionList.forEach(option => option.isSelected = inputTexts.indexOf(option.name) > -1);
		}
		if (values) {
			optionList.forEach(option => option.isSelected = values.indexOf(option.value) > -1);
		}
	}

	getSelectedItem(selectInputList: ISelectItem[], getAllSelectedItems?: boolean): ISelectItem | ISelectItem[] {
		if (getAllSelectedItems) {
			return selectInputList.filter((option: ISelectItem) => option.isSelected);
		}

		for (let i = 0; i < selectInputList.length; i++) {
			if (selectInputList[i].isSelected) {
				return selectInputList[i];
			}
		}
	}

	resetOptionsList(selectInputList: ISelectItem[]): void {
		selectInputList.forEach(option => option.isSelected = false);
	}
}

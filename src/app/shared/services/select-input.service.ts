import {Injectable} from '@angular/core';
import {ISelectItem} from '../types/ISelect';
import {JsUtils} from '../utils/jsUtils';
import {IRadioButton} from '../types/buttons';

@Injectable({
	providedIn: 'root'
})
export class SelectInputService {
	updateIsSelected(optionList: ISelectItem[] | IRadioButton[], names: string | string[], ids?: any | any[]): void {
		if (names) {
			names = Array.isArray(names) ? names : [names];
			(optionList as any[]).forEach(option => option.isSelected = names.indexOf(option.name) > -1);
		}
		if (JsUtils.isDefined(ids)) {
			ids = Array.isArray(ids) ? ids : [ids];
			(optionList as any[]).forEach(option => option.isSelected = ids.indexOf(option.id) > -1);
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

	getItem(selectInputList: ISelectItem[], names: string | string[], ids?: any | any[], getAllSelectedItems?: boolean): ISelectItem | ISelectItem[] {
		let result;
		if (names) {
			names = Array.isArray(names) ? names : [names];
			if (getAllSelectedItems) {
				result = selectInputList.filter((option: ISelectItem) => names.indexOf(option.name) > -1);
			} else {
				result = selectInputList.filter((option: ISelectItem) => names.indexOf(option.name) > -1)[0];
			}
		}
		if (JsUtils.isDefined(ids)) {
			ids = Array.isArray(ids) ? ids : [ids];
			if (getAllSelectedItems) {
				result = selectInputList.filter((option: ISelectItem) => ids.indexOf(option.id) > -1);
			} else {
				result = selectInputList.filter((option: ISelectItem) => ids.indexOf(option.id) > -1)[0];
			}
		}
		return result;
	}

	removeItemsFromList(optionList: ISelectItem[], names: string | string[], ids?: any | any[]): ISelectItem[] {
		if (names) {
			names = Array.isArray(names) ? names : [names];
			optionList = optionList.filter(option => names.indexOf(option.name) < 0);
		}
		if (JsUtils.isDefined(ids)) {
			ids = Array.isArray(ids) ? ids : [ids];
			optionList = optionList.filter(option => ids.indexOf(option.id) < 0);
		}

		return optionList;
	}

	isContains(optionList: ISelectItem[], names: string | string[], ids?: any | any[]): boolean {
		let isContains: boolean = false;
		const listLength = optionList.length;
		let searchBy: string;
		let itemsToCheck: any[];

		if (names) {
			itemsToCheck = Array.isArray(names) ? names : [names];
			searchBy = 'name';
		}
		if (JsUtils.isDefined(ids)) {
			itemsToCheck = Array.isArray(ids) ? ids : [ids];
			searchBy = 'id';
		}
		for (let i = 0; i < listLength && !isContains && searchBy; i++) {
			if (itemsToCheck.indexOf(optionList[i][searchBy]) > -1) {
				isContains = true;
			}
		}
		return isContains;
	}

	resetOptionsList(selectInputList: ISelectItem[]): void {
		selectInputList.forEach(option => option.isSelected = false);
	}
}

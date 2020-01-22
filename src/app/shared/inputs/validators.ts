import {ISelectItem, IValidationStatus} from '../types/ISelect';

export const selectRequired = (selectedItem: ISelectItem): IValidationStatus => {
	if (!selectedItem) {
		return {isValid: false, message: 'This is a required field'};
	} else {
		return {isValid: true, message: ''};
	}
}

export const dirtyAndRequired = (val: string, isDirty: boolean): IValidationStatus => {
	return (isDirty && !val) ? {isValid: false, message: ''} : {isValid: true, message: ''};
}

export interface ISelectItem {
	name: string;
	id: any;
	nameValue?: string;
	isSelected?: boolean;
	backgroundColor?: string;
	color?: string;
	svg?: string;
	withoutChips?: boolean;
}

export interface IValidationStatus {
	message?: string;
	isValid: boolean;
	invalidView?: string;
}

export interface ISelectOptionsComponentsTypes {
	regular: string;
	multiSelection: string;
}

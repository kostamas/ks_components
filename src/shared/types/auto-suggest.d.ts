export interface IAutoSuggestItem {
	name: string;
	value: any;
	id?: string;
	countryName?: string;
}

export interface IAutoSuggestValidationStatus {
	message: string;
	isValid: boolean;
	invalidView?: string;
}

export interface IAutoSuggestInvalidViews {
	yellowFiledRedBorder: 'yellow-filed-red-border';
}
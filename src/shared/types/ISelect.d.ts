export interface ISelectItem {
  name: string;
  value: any;
  isSelected?: boolean;
  backgroundColor?: string;
  color?: string;
  svg?: string;
}


export interface ISelectInputValidationStatus {
	message: string;
	isValid: boolean;
	invalidView?: string;
}

export  interface ISelectListValidatorObject {
	val: ISelectItem[];
	isDirty: boolean;
}
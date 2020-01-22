import {Subject} from 'rxjs';

export interface ISwitchText {
	enabled: string;
	disabled: string;
}

export interface ICheckboxItem {
	text?: string;
	value?: any;
	isSelected?: boolean;
}

export interface IRadioButton {
	isSelected?: boolean;
	id?: any;
	text?: string;
}

export interface IButtonWithPopupConfig {
	title: string;
	content: string;
	modalClass?: string;
	clickHandler: (closeModal: any, done$: Subject<any>) => any;
	firstButtonText: string;
	secondButtonText?: string;
}

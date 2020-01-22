import {ComponentRef} from '@angular/core';

interface IModalConfig {
	disableClose?: boolean;
	showCloseButton?: boolean;
	modalClass?: string | string[];
	position?: IModalPosition;
	closeModalCallback?: any;
	style?: any;
}

interface IModalPosition {
	x: number;
	y: number;
}

interface IPopupData {
	data?: any
	title?: string;
	content?: string;
	onDone?: () => any;
	onCancel?: () => any;
	buttons?: IPopupButton[];
	disableClose?: boolean;
}

interface IPopupTypes {
	message: string;
	error: string;
	warning: string;
}

interface IPopupButton {
	text: string;
	handler: (p: any) => any;
	style?: any;
	svg?: string;
	withLoader?: boolean;
	btnClass?: string;
	x?: string;
}

interface IModal {
	closeModalEventListener: () => void;
	componentRef: ComponentRef<any>;
	componentWrapper: HTMLElement;
	closeButtonRef: HTMLElement;
	modalContainer: HTMLElement;
	modalOverlay: HTMLElement;
	updateComponentData: any;
	closeModalCallback: any;
	updateStyle: any;
	closeModal: any;
	isOpen: boolean;
	id: string;
}

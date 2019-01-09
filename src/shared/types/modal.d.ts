import {ComponentRef} from '@angular/core';

interface IModalConfig {
  disableClose?: boolean;
  hidCloseButton?: boolean;
  modalClass?: string;
  position?: IModalPosition;
  closeModalCallback?: any;
  style?: any;
}

interface IModalPosition {
  x: number;
  y: number;
}

interface IPopupData {
  title?: string;
  content?: string;
  onDone?: () => any;
  onCancel?: () => any;
  buttons?: IPopupButton[];
}

interface IPopupTypes {
  message: string;
  error: string;
  warning: string;
}

interface IPopupButton {
  text: string;
  handler: (p: any) => any;
}

interface IModal {
  componentRef: ComponentRef<any>;
  modalContainer: HTMLElement;
  modalOverlay: HTMLElement;
  componentWrapper: HTMLElement;
  closeModalCallback: any;
  closeModal: any;
  updateStyle: any;
  updateComponentData: any;
  id: string;
}

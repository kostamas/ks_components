interface IModalConfig {
  disableClose?: boolean;
  hidCloseButton?: boolean;
  modalClass?: string;
}

interface IPopupData {
  title?: string;
  content?: string;
  onDone?: () => any;
  onCancel?: () => any;
}

interface IPopupTypes {
  message: string;
  error: string;
  warning: string;
}

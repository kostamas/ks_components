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
  isChecked?: boolean;
  value?: any;
  text?: string;
}

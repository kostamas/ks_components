export interface ISelectItem {
  text: string;
  value: any;
  isSelected?: boolean;
  backgroundColor?: string;
  color?: string;
  svg?: string;
}

export interface IOptionsComponentWrapper {
  component: any;
  inputs: any[];
}

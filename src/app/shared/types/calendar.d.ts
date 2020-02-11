export interface ICalendarPosition {
  left: number;
  top: number;
}

export interface IDaysWrapperPosition {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface ICalendarDay {
  classToAdd?: string;
	isDisabled?: boolean;
	isSelected: boolean;
	firstDay?: boolean;
	dayNumber: number;
	lastDay?: boolean;
	isEmpty: boolean;
	today: boolean;
	past: boolean;
}

export interface ICalendarClickPosition {
  clientX?: number;
  clientY?: number;
  clear?: boolean;
}

export interface IFromTo {
	from: string;
	to: string;
}

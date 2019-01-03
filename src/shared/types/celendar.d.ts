interface ICalendarPosition {
  left: number;
  top: number;
}

interface IDaysWrapperPosition {
  width: number;
  height: number;
  left: number;
  top: number;
}

interface ICalendarDay {
  classToAdd?: string;
  dayNumber: number;
  firstDay?: boolean;
  isEmpty: boolean;
  isSelected: boolean;
  lastDay?: boolean;
  past: boolean;
  today: boolean;
}

interface ICalendarClickPosition {
  clientX?: number;
  clientY?: number;
  clear?: boolean;
}

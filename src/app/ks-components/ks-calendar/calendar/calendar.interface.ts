export interface ICalendar {
    resetCalendar(): void;
    showAvailableDates(data, params): void;
    lessonsHandler(lessons: any[]): void;
    planHandler(plan): void;
    clearTimeSlot(date): void;
    updateDynamicDefaultView(defaultViewType): void;
    clearSlotsByGivenViews(viewsToClear: any[]): void;
    addClassToTimeSlots(classToAdd, slotsToIgnore: number[]): void;
}

// export interface ICalendarData {
//     dynamicWeek: ;
// }
//
// interface IWeekData {
//
// }

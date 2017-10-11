export interface ICalendarEventHandler {
  lessonScheduledHandler(data): void;
  lessonRemovedHandler(data): void;
  resetHandler(data): void;
}

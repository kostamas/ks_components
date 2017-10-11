import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'CalendarHoursPipe'})
export class CalendarHoursPipe implements PipeTransform {
  transform(hour: number): string {
    let result;

    if (hour === 0) {
      result = 12;
    }
    if (0 < hour && hour <= 12) {
      result = hour;
    }

    if (12 < hour && hour < 24) {
      result = (hour % 12 );
    }

    result += (( 12 <= hour && hour < 24) ? ' PM' : ' AM');
    return result;
  }
}

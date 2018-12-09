import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'filter', pure: false})
export class FilterPipe implements PipeTransform {
  transform(arr: any, filterValue: string): any {
    if (filterValue) {
      return arr.filter(row => {
        const regex = new RegExp(`${filterValue}`, 'ig');
        return regex.test(row.HotelName);
      });
    } else {
      return arr;
    }
  }
}

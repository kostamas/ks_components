import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'elipsis', pure: false})
export class EllipsisPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    if (args === undefined) {
      return value;
    }

    if (value.length > args) {
      return value.substring(0, args) + '...';
    } else {
      return value;
    }
  }
}

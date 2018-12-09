import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'elipsis', pure: false})
export class EllipsisPipe implements PipeTransform {
  transform(value: any, args: any[] = null, onOverflowCb: (isOverflow: boolean) => {}): any {
    value = String(value);
    if (args === undefined) {
      return value;
    }

    if (value.length > args) {
      if (onOverflowCb) {
        onOverflowCb(true);
      }
      return value.substring(0, args) + '...';
    } else {
      if (onOverflowCb) {
        onOverflowCb(false);
      }
      return value;
    }
  }
}

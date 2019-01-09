import {NgModule} from '@angular/core';
import {EllipsisPipe} from '../pips/ellipsis.pipe';
import {FilterPipe} from '../pips/filter.pipe';

@NgModule({
  declarations: [
    EllipsisPipe,
    FilterPipe
  ],
  exports: [
    EllipsisPipe,
    FilterPipe
  ]
})
export class SharedModules {
}

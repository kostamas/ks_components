import {NgModule} from '@angular/core';
import {EllipsisPipe} from '../pips/ellipsis.pipe';

@NgModule({
  declarations: [
    EllipsisPipe
  ],
  exports: [
    EllipsisPipe
  ]
})
export class SharedModules {
}

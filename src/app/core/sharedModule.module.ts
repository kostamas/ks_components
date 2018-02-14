import {NgModule} from '@angular/core';
import {KeysPipe} from '../../pipes/keys.pipe';
import {EllipsisPipe} from '../../pipes/ellipsis.pipe';

@NgModule({
  imports: [],
  declarations: [
    EllipsisPipe,
    KeysPipe
  ],
  entryComponents: [],
  exports: [
    EllipsisPipe,
    KeysPipe
  ],
  providers: []
})
export class SharedModule {
}

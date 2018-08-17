import {NgModule} from '@angular/core';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';
import {KeysPipe} from '../pipes/keys.pipe';
import {EllipsisPipe} from '../pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    ErrorModalComponent,
    KeysPipe,
    EllipsisPipe
  ],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [
    ErrorModalComponent,
    KeysPipe,
    EllipsisPipe
  ],
  entryComponents: [ErrorModalComponent]
})
export class SharedModule {
}

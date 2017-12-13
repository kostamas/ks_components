import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackgammonComponent} from './backgammon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BackgammonComponent
  ],
  entryComponents: [
  ],
  exports: [
    BackgammonComponent
  ],
  providers: []
})
export class BackgammonModule {
}

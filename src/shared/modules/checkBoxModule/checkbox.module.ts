import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    CheckboxComponent
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule {
}

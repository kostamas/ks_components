import {NgModule} from '@angular/core';
import {KeysPipe} from '../../pipes/keys.pipe';
import {EllipsisPipe} from '../../pipes/ellipsis.pipe';
import {ButtonsModule} from '../shared/buttons-module';
import {EllipseModule} from '../shared/ellipse-module/ellipse.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ButtonsModule,
    EllipseModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
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

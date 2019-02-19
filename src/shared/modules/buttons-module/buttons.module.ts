import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../loader-module/loader..module';
import {ButtonWithLoaderComponent} from './button-with-loader/button-with-loader.component';
import {SwitchComponent} from './switch/switch.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule,
    LoaderModule,
  ],
  declarations: [
    CheckboxComponent,
    ButtonWithLoaderComponent,
    SwitchComponent,
    RadioButtonsComponent
  ],
  exports: [
    CheckboxComponent,
    ButtonWithLoaderComponent,
    SwitchComponent,
    RadioButtonsComponent
  ]
})
export class ButtonsModule {
}

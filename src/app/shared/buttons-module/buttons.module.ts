import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CheckboxComponent} from './checkbox/checkbox.component';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../loader-module/loader.module';
import {ButtonWithLoaderComponent} from './button-with-loader/button-with-loader.component';
import {SwitchComponent} from './switch/switch.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import {ButtonWithPopupComponent} from './button-with-popup/button-with-popup.component';

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule,
    LoaderModule,
  ],
  declarations: [
		ButtonWithLoaderComponent,
		ButtonWithPopupComponent,
		RadioButtonsComponent,
		CheckboxComponent,
		SwitchComponent
  ],
  exports: [
		ButtonWithLoaderComponent,
		ButtonWithPopupComponent,
		RadioButtonsComponent,
		CheckboxComponent,
		SwitchComponent
  ]
})
export class ButtonsModule {
}

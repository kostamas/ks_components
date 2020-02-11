import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {LoaderModule} from '../../loader-module/loader.module';
import {SevenDaysInputComponent} from './seven-days-input/seven-days-input.component';
import {SelectModule} from '../select-module/select.module';
import {ButtonsModule} from '../../buttons-module/buttons.module';

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule,
    LoaderModule,
    SelectModule,
    ButtonsModule
  ],
  declarations: [
    SevenDaysInputComponent,
  ],
  exports: [
    SevenDaysInputComponent
  ]
})
export class SevenDaysSelectorModule {
}

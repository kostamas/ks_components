import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HbSearchButtonComponent} from './hb-search-button.component';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';
import {LoaderModule} from '../loader-module/loader..module';

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule,
    LoaderModule
  ],
  declarations: [
    HbSearchButtonComponent,
  ],
  providers: [],
  exports: [HbSearchButtonComponent]
})
export class HbButtonsModule {
}

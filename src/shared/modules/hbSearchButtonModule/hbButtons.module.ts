import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HbSearchButtonComponent} from './hb-search-button.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {SvgIconModule} from "../svgIconModule/svg-icon.module";

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule
  ],
  declarations: [
    HbSearchButtonComponent,
    LoaderComponent
  ],
  providers: [],
  exports: [HbSearchButtonComponent]
})
export class HbButtonsModule {
}

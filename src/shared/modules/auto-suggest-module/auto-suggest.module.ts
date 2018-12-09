import {NgModule} from '@angular/core';
import {AutoSuggestInputComponent} from './auto-suggest-input/auto-suggest-input.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';
import {AutoSuggestResultsComponent} from './auto-suggest-results/auto-suggest-results.component';
import {ModalModule} from "../modalModule/modal.module";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    SvgIconModule,
    ModalModule
  ],
  declarations: [
    AutoSuggestInputComponent,
    AutoSuggestResultsComponent
  ],
  providers: [],
  exports: [
    AutoSuggestInputComponent
  ],
  entryComponents: [
    AutoSuggestResultsComponent
  ]
})
export class AutoSuggestInputModule {
}

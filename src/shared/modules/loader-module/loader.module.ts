import {NgModule} from '@angular/core';
import {LoaderComponent} from './loader/loader.component';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    SvgIconModule
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule {
}

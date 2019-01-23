import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectInputComponent} from './select-input/select-input.component';
import {MultiSelectColorfulOptionsComponent} from './options/multi-select-colorful-options/multi-select-colorful-options.component';
import {CheckboxModule} from '../checkBoxModule/checkbox.module';
import {SelectRegularOptionsComponent} from './options/select-regular-options/select-regular-options.component';
import {SvgIconModule} from '../svgIconModule/svg-icon.module';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule,
    SvgIconModule
  ],
  declarations: [
    SelectInputComponent,
    MultiSelectColorfulOptionsComponent,
    SelectRegularOptionsComponent
  ],
  exports: [
    SelectInputComponent,
    MultiSelectColorfulOptionsComponent,
    SelectRegularOptionsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [
    MultiSelectColorfulOptionsComponent,
    SelectRegularOptionsComponent
  ]
})
export class SelectModule {
}

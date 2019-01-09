import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleSelectInputComponent} from './multiple-select-input/multiple-select-input.component';
import {MultipleSelectColorfulOptionsComponent} from './options/multiple-select-colorful-options/multiple-select-colorful-options.component';
import {CheckboxModule} from '../checkBoxModule/checkbox.module';
import {MultiSelectRegularOptionsComponent} from './options/multi-select-regular-options/multi-select-regular-options.component';

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule
  ],
  declarations: [
    MultipleSelectInputComponent,
    MultipleSelectColorfulOptionsComponent,
    MultiSelectRegularOptionsComponent
  ],
  exports: [
    MultipleSelectInputComponent,
    MultipleSelectColorfulOptionsComponent
  ],
  entryComponents: [
    MultipleSelectColorfulOptionsComponent,
    MultiSelectRegularOptionsComponent
  ]
})
export class MultipleSelectModule {
}

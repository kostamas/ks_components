import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultipleSelectInputComponent} from './multiple-select-input/multiple-select-input.component';
import {MultipleSelectResultsComponent} from './multiple-select-results/multiple-select-results.component';
import {CheckboxModule} from "../checkBoxModule/checkbox.module";

@NgModule({
  imports: [
    CommonModule,
    CheckboxModule
  ],
  declarations: [
    MultipleSelectInputComponent,
    MultipleSelectResultsComponent],
  exports: [
    MultipleSelectInputComponent,
    MultipleSelectResultsComponent
  ],
  entryComponents: [
    MultipleSelectResultsComponent
  ]
})
export class MultipleSelectModule {
}

import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectInputComponent} from './select-input/select-input.component';
import {MultiSelectColorfulOptionsComponent} from './options/multi-select-colorful-options/multi-select-colorful-options.component';
import {SelectRegularOptionsComponent} from './options/select-regular-options/select-regular-options.component';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {ButtonsModule} from '../../buttons-module/buttons.module';


@NgModule({
  imports: [
    CommonModule,
    SvgIconModule,
    ButtonsModule
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

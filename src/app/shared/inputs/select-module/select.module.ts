import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectInputComponent} from './select-input/select-input.component';
import {MultiSelectColorfulOptionsComponent} from './options/multi-select-colorful-options/multi-select-colorful-options.component';
import {SelectRegularOptionsComponent} from './options/select-regular-options/select-regular-options.component';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {EllipseModule} from '../../ellipse-module/ellipse.module';
import {TooltipModule} from '../../tooltip-module/tooltip.module';
import {FormsModule} from '@angular/forms';
import {ButtonsModule} from '../../buttons-module';
import {SelectInputService} from '../../services/select-input.service';

@NgModule({
  imports: [
    CommonModule,
    SvgIconModule,
    ButtonsModule,
    TooltipModule,
    EllipseModule,
    FormsModule
  ],
  declarations: [
    SelectInputComponent,
    MultiSelectColorfulOptionsComponent,
    SelectRegularOptionsComponent
  ],
  providers: [
    SelectInputService
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

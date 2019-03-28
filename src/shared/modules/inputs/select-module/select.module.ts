import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectInputComponent} from './select-input/select-input.component';
import {MultiSelectColorfulOptionsComponent} from './options/multi-select-colorful-options/multi-select-colorful-options.component';
import {SelectRegularOptionsComponent} from './options/select-regular-options/select-regular-options.component';

@NgModule({
	imports: [
		CommonModule,
		SvgIconModule,
		ButtonsModule,
		TooltipModule
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

import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';


import {ButtonsModule} from '../../buttons-module/buttons.module';
import {SelectInputService} from './select-input.service';
import {TooltipDirective} from "../../tooltip-module/tooltip.directive";
import {TooltipModule} from "../../tooltip-module/tooltip.module";

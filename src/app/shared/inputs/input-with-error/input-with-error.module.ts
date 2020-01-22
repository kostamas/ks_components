import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {EllipseModule} from '../../ellipse-module/ellipse.module';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {InputWithErrorComponent} from './input-with-error.component';
import {TooltipModule} from '../../tooltip-module/tooltip.module';

@NgModule({
	imports: [
		BrowserModule,
		EllipseModule,
		SvgIconModule,
		FormsModule,
		TooltipModule
	],
	declarations: [
		InputWithErrorComponent
	],
	exports: [
		InputWithErrorComponent
	]
})
export class InputWithErrorModule {
}

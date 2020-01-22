import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InputWithSymbolComponent} from './input-with-symbol.component';
import {FormsModule} from '@angular/forms';
import {EllipseModule} from '../../ellipse-module/ellipse.module';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';

@NgModule({
	imports: [
		BrowserModule,
		EllipseModule,
		SvgIconModule,
		FormsModule
	],
	declarations: [
		InputWithSymbolComponent
	],
	exports: [
		InputWithSymbolComponent
	]
})
export class InputWithSymbolModule {
}

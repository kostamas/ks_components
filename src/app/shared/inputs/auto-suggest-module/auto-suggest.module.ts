import {NgModule} from '@angular/core';
import {AutoSuggestInputComponent} from './auto-suggest-input/auto-suggest-input.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SvgIconModule} from '../../svg-icon-module/svg-icon.module';
import {AutoSuggestResultsComponent} from './auto-suggest-results/auto-suggest-results.component';
import {ModalModule} from '../../modal-module/modal.module';
import {TooltipModule} from '../../tooltip-module/tooltip.module';
import {EllipseModule} from '../../ellipse-module/ellipse.module';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule,
		SvgIconModule,
		ModalModule,
		TooltipModule,
		EllipseModule
	],
	declarations: [
		AutoSuggestInputComponent,
		AutoSuggestResultsComponent,
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

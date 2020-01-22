import {NgModule} from '@angular/core';
import {ToastComponent} from './toast/toast.component';
import {ToastService} from '../../services/toast.service';
import {CommonModule} from '@angular/common';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';

@NgModule({
	imports: [
		CommonModule,
		SvgIconModule
	],
	declarations: [
		ToastComponent
	],
	providers: [
		ToastService
	],
	entryComponents: [
		ToastComponent
	]
})
export class ToastModule {
}

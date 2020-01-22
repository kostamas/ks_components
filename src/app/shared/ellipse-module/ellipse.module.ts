import {NgModule} from '@angular/core';
import {EllipseDetectorDirective} from './ellipse-detector.directive';

@NgModule({
	declarations: [
		EllipseDetectorDirective
	],
	exports: [
		EllipseDetectorDirective
	]
})
export class EllipseModule {
}

import {NgModule} from '@angular/core';
import {PopupService} from './popup.service';
import {PopupComponent} from './popup/popup.component';
import {ModalModule} from '../modal-module/modal.module';
import { CommonModule } from '@angular/common';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {ButtonsModule} from '../buttons-module/buttons.module';

@NgModule({
	imports: [
		ModalModule,
		CommonModule,
		SvgIconModule,
		ButtonsModule
	],
  declarations: [
    PopupComponent
  ],
  providers: [
    PopupService
  ],
  entryComponents: [PopupComponent]
})
export class PopupModule {
}

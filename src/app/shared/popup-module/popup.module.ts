import {NgModule} from '@angular/core';
import {PopupService} from './popup.service';
import {PopupComponent} from './popup/popup.component';
import {ModalModule} from '../modal-module/modal.module';
import { CommonModule } from '@angular/common';
import {SvgIconModule} from '../svg-icon-module/svg-icon.module';
import {ButtonsModule} from '../buttons-module/buttons.module';
import {ErrorPopupComponent} from './error-popup/error-popup.component';
import {InformationPopupComponent} from './information-popup/information-popup.component';

@NgModule({
	imports: [
		ModalModule,
		CommonModule,
		SvgIconModule,
		ButtonsModule
	],
  declarations: [
    PopupComponent,
    ErrorPopupComponent,
    InformationPopupComponent
  ],
  providers: [
    PopupService
  ],
  entryComponents: [
    PopupComponent,
    ErrorPopupComponent,
    InformationPopupComponent
  ]
})
export class PopupModule {
}

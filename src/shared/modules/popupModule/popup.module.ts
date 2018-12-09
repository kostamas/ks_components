import {NgModule} from '@angular/core';
import {PopupService} from './popup.service';
import {PopupComponent} from './popup/popup.component';
import {ModalModule} from '../modalModule/modal.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    ModalModule,
    CommonModule
  ],
  providers: [
    PopupService
  ],
  entryComponents: [PopupComponent]
})
export class PopupModule {
}

import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { WindowRef } from '../../core/window-ref.service';

import {TransparentShapeModalComponent} from './transparent-shape-modal.component';

import {TransparentShapeModalService} from './transparent-shape-modal.service';

@NgModule({
  imports: [
    MatDialogModule,
    CommonModule
  ],
  declarations: [
    TransparentShapeModalComponent
  ],
  entryComponents: [
    TransparentShapeModalComponent
  ],
  exports: [
    TransparentShapeModalComponent
  ],
  providers: [
    TransparentShapeModalService,
    WindowRef
  ]
})
export class TransparentShapeModalModule {
}

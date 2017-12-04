import {NgModule} from '@angular/core';
import {ImageExpanderDirective} from './image-expander.directive';
import {MatDialogModule} from '@angular/material/dialog';
import {ExpandedImageModalComponent} from './expanded-image-modal/expanded-image-modal.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    MatDialogModule,
    CommonModule
  ],
  declarations: [
    ImageExpanderDirective,
    ExpandedImageModalComponent
  ],
  entryComponents: [
    ExpandedImageModalComponent
  ],
  exports: [
    ImageExpanderDirective
  ],
  providers: []
})
export class ImageExpander {
}

import {NgModule} from '@angular/core';
import {ImageZoomerDirective} from './image-zoomer.directive';
import {MatDialogModule} from '@angular/material/dialog';
import {ExpandedImageModalComponent} from './expanded-image-modal/expanded-image-modal.component';

@NgModule({
  imports: [
    MatDialogModule
  ],
  declarations: [
    ImageZoomerDirective,
    ExpandedImageModalComponent
  ],
  entryComponents: [
    ExpandedImageModalComponent
  ],
  exports: [
    ImageZoomerDirective
  ],
  providers: []
})
export class ImageZoomer {
}

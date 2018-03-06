import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRef } from '../../core/window-ref.service';
import {GalleryComponent} from './gallery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GalleryComponent
  ],
  exports: [
    GalleryComponent
  ],
  providers: [
    WindowRef
  ]
})
export class GalleryModule {
}

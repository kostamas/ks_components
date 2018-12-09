import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SvgIconComponent} from './svg-icon/svg-icon.component';
import {SvgIconService} from './svg-icons.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SvgIconComponent
  ],
  providers: [
    SvgIconService
  ],
  exports: [
    SvgIconComponent
  ]
})
export class SvgIconModule {
}

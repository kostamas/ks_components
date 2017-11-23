import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {FormsModule} from '@angular/forms';
// import {MatIconModule} from '@angular/material';
import {ImageZoomerDirective} from './image-zoomer.directive';
import {ImageZoomerComponent} from "./image-zoomer.component";

@NgModule({
    imports: [
    ],
    declarations: [
        ImageZoomerDirective,
        ImageZoomerComponent
    ],
    exports: [
        ImageZoomerDirective
    ],
    providers: [
    ]
})
export class ImageZoomer {
}

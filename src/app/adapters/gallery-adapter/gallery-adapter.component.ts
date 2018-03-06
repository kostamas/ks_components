import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-gallery-adapter',
  templateUrl: './gallery-adapter.component.html',
  styleUrls: ['./gallery-adapter.component.scss']
})
export class GalleryAdapterComponent {

  public imagesPaths = [];

  constructor() {
    for (let i = 0; i < 19; i++) {
      this.imagesPaths.push(`../../assets/images/gallery-image${i + 1}.jpg`);
    }
  }
}

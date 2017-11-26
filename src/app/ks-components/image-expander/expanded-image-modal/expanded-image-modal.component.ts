import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-expanded-image-modal',
  templateUrl: './expanded-image-modal.component.html',
  styleUrls: ['./expanded-image-modal.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ExpandedImageModalComponent implements OnInit {
  public imgData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imgData = {
      src: data.img.src,
      width: (data.img.style.width || data.img.clientWidth) * 2,
      height: (data.img.style.height || data.img.height ) * 2
    };
  }

  ngOnInit() {
  }

}

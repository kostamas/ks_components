import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-expanded-image-modal',
  templateUrl: './expanded-image-modal.component.html',
  styleUrls: ['./expanded-image-modal.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ExpandedImageModalComponent implements OnInit {
  public imgData;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if(this.data && this.data.img){
      this.imgData = {
        src: this.data.img.src,
        width: (this.data.img.style.width || this.data.img.clientWidth) * 2,
        height: (this.data.img.style.height || this.data.img.height ) * 2
      };
    }
  }

}

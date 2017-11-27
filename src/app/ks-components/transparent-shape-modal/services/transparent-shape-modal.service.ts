import {Injectable} from '@angular/core';
import {TransparentShapeModalComponent} from "../transparent-shape-modal.component";
import {MatDialog} from "@angular/material";

@Injectable()
export class TransparentShapeModalService {

  constructor(public dialog: MatDialog) {
  }

  public openTransShapeModal(position, radius) {
    position.left -= radius / 2;
    position.top -= radius / 2;

    let config: any = {
      data: {position, radius},
      panelClass: 'transparent-shape-modal',
      hasBackdrop: false,
    };
    let ref = this.dialog.open(TransparentShapeModalComponent, config);

    config.data.close = ref.close.bind(ref);
  }
}

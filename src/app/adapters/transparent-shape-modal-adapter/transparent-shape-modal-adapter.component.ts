import {Component, OnInit} from '@angular/core';
import {TransparentShapeModalService} from "../../ks-components/transparent-shape-modal/services/transparent-shape-modal.service";

@Component({
  selector: 'app-transparent-shape-modal-adapter',
  templateUrl: './transparent-shape-modal-adapter.component.html',
  styleUrls: ['./transparent-shape-modal-adapter.component.scss']
})
export class TransparentShapeModalAdapterComponent implements OnInit {

  constructor(private transparentShapeModalService: TransparentShapeModalService) {
  }

  ngOnInit() {
  }

  public openTransShapeModal($event) {
    this.transparentShapeModalService.openTransShapeModal({left: $event.clientX, top: $event.clientY}, 200);
  }
}

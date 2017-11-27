import {Component, Inject, Input, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-transparent-shape-modal',
  templateUrl: './transparent-shape-modal.component.html',
  styleUrls: ['./transparent-shape-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransparentShapeModalComponent implements OnInit {
  public circleLeftPosition;
  public circleTopPosition;
  public topBlocHeight;
  public leftBlockHeight;
  public leftBlockWidth;
  public rightBlockWidth;
  public rightBlockHeight;
  public circleRadiusPx;
  public showModal = false;

  @Input() position: any;
  @Input() circleRadius: number;
  @Input() circleClickHandler: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    // todo: check if @Optional works
  }

  ngOnInit() {
    let left = (this.data && this.data.position && this.data.position.left) || this.position.left;
    let top = (this.data && this.data.position && this.data.position.top) || this.position.top;
    let radius = (this.data && this.data.radius) || this.circleRadius;
    var windowWidth = window.innerWidth;

    this.circleLeftPosition = left + 'px';
    this.circleTopPosition = top + 'px';

    this.topBlocHeight = top + 'px';
    this.leftBlockHeight = radius + 'px';
    this.rightBlockHeight = radius + 'px';

    this.leftBlockWidth = left + 'px';
    this.rightBlockWidth = windowWidth - (radius + left) + 'px';

    this.circleRadiusPx = radius + 'px';
  }

  public circleClick() {

  }

  public transparentShapeModalClick() {
    this.data.close()
  }
}


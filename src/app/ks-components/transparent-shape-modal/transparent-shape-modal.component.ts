import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

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
  public bottomBlockHeight;

  @Input() position: any;
  @Input() circleRadius: number;
  @Input() transparentShapeClickHandler: any;
  @Input() backgroundClickHandler;
  @Input() shape = 'circle';

  constructor() {
  }

  ngOnInit() {
    let left =  this.position.left;
    let top = this.position.top;
    let radius = this.circleRadius;

    this.circleLeftPosition = left + 'px';
    this.circleTopPosition = top + 'px';

    this.topBlocHeight = top + 'px';
    this.leftBlockHeight = radius + 'px';
    this.rightBlockHeight = radius + 'px';

    this.leftBlockWidth = left + 'px';
    this.rightBlockWidth = `calc(100vw - ${radius + left}px)`;

    this.bottomBlockHeight = `calc(100vh - ${radius + top}px)`;

    this.circleRadiusPx = radius + 'px';
  }


}


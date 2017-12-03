import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {WindowRef} from "../../core/window-ref.service";

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
  @Input() transparentShapeClickHandler: any = () => {
  };
  @Input() backgroundClickHandler: any = () => {
  };
  @Input() shape = 'circle';

  constructor(private windowRef: WindowRef) {
  }

  ngOnInit() {
    let left = this.position.left;
    let top = this.position.top;
    const radius = this.circleRadius;

    // console.log('left:' + left  + '      this.windowRef.nativeWindow.innerWidth: ' + this.windowRef.nativeWindow.innerWidth);
    // console.log('top:' + top +  '     this.windowRef.nativeWindow.top: ' + this.windowRef.nativeWindow.innerHeight);

    const viewPortHeight = this.windowRef.nativeWindow.innerHeight;
    const viewPortWidth = this.windowRef.nativeWindow.innerWidth;

    if (top > viewPortHeight - radius || top < 0) {
      top = top > viewPortHeight - radius ? viewPortHeight - radius : 0;
    }

    if (left > viewPortWidth - radius || left < 0) {
      left = left > viewPortWidth - radius ? viewPortWidth - radius : 0;
    }

    console.log('left: ' + left, 'view: ' + viewPortWidth);


    this.calcPosition(left, top, radius);
  }

  private calcPosition(left, top, radius) {

    this.circleLeftPosition = left;
    this.circleTopPosition = top;

    this.topBlocHeight = top;
    this.leftBlockHeight = radius;
    this.rightBlockHeight = radius;
    this.leftBlockWidth = left;
    this.rightBlockWidth = `calc(100vw - ${radius + left}px)`;
    this.bottomBlockHeight = `calc(100vh - ${radius + top}px)`;
  }
}


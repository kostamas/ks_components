import {AfterViewInit, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-transparent-shape-modal',
  templateUrl: './transparent-shape-modal.component.html',
  styleUrls: ['./transparent-shape-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransparentShapeModalComponent implements AfterViewInit {
  private shapeElement;

  @Input() position: any;
  @Input() radius: number;
  @Input() shape = 'circle';
  @ViewChild('svg') svg;
  @Input() backgroundClickHandler: any = () => null;

  constructor() {
  }

  ngAfterViewInit() {
    this.shapeElement = this.svg.nativeElement.getElementById(`t-s-${this.shape}`);
    this.setPosition(this.shape, this.shapeElement, this.position.top, this.position.left, this.radius);
  }

  private setPosition(shapeType, shapeElement, top, left, radius) {
    switch (shapeType) {
      case 'circle': {
        this.circlePosition(shapeElement, top, left, radius);
        break;
      }
      case 'square': {
        this.squarePosition(shapeElement, top, left, radius);
        break;
      }
      case 'star': {
        this.starPosition(shapeElement, top, left, radius);
        break;
      }
    }
  }

  private circlePosition(shapeElement, top, left, radius) {
    shapeElement.style.cy = top;
    shapeElement.style.cx = left;
    shapeElement.style.r = radius;
  }

  private squarePosition(shapeElement, top, left, radius) {
    shapeElement.style.y = top;
    shapeElement.style.x = left;
    shapeElement.style.width = radius;
    shapeElement.style.height = radius;
  }

  private starPosition(shapeElement, top, left, radius) {
    const viewBox = (96 / radius) * 96;
    const leftOffset = (100 / (viewBox - 2)) * 100;
    const topOffset = (125 / (viewBox + 13)) * 125;
    shapeElement.setAttribute('viewBox', `0 0 ${viewBox} ${viewBox}`);
    shapeElement.setAttribute('x', left - leftOffset);
    shapeElement.setAttribute('y', top - topOffset);
  }
}


import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BackgammonMap} from './backgammonMap';
import {CanvasContext} from "./canvasContext";

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit {

  @ViewChild('canvas') canvas;

  constructor() {
  }

  ngAfterViewInit() {
    this.init();
  }

  private init() {
    CanvasContext.context = this.canvas.nativeElement.getContext("2d");
    const background = new Image();

    background.src = "assets/images/backgammon.jpg";
    background.style.zIndex = '-1px';
    background.onload = function () {
      CanvasContext.context.drawImage(background, 0, 0);
      new BackgammonMap();
    }​
  }
}

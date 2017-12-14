import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Canvas} from "./canvas";
import {StateManager} from "./stateManager";
import {GameController} from "./gameController";

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
    Canvas.canvas = this.canvas.nativeElement;
    Canvas.context = this.canvas.nativeElement.getContext("2d");
    new StateManager();
    new GameController();
  }
}

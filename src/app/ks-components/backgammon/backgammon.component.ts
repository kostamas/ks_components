import {AfterViewInit, Component, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from "./canvas";
import {BackgammonStateManager} from "./backgammonStateManager";
import {GameController} from "./gameController";

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas;

  constructor(private zone: NgZone, private gameController: GameController) {
  }

  ngAfterViewInit() {
    this.init();
  }

  private init() {
    this.zone.runOutsideAngular(() => {
      Canvas.canvas = this.canvas.nativeElement;
      Canvas.context = this.canvas.nativeElement.getContext("2d");
      new BackgammonStateManager().init();
      this.gameController.init();
    });
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

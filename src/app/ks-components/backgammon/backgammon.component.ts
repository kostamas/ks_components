import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from "./canvas";
import {BackgammonStateManager} from "./backgammonStateManager";
import {GameController} from "./gameController";
import {ActivatedRoute} from "@angular/router";
import {BackgammonDBService} from "../../adapters/backgammon-adapter/backgammonDB.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  public showOnlineOption = true;
  public showCanvas = true;
  public showOnlineGame = false;
  public onlineGameForm;

  @ViewChild('canvas') canvas;

  constructor(private zone: NgZone, private gameController: GameController,
              private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
              private backgammonDBService: BackgammonDBService) {
  }

  ngAfterViewInit() {
    this.init();
  }

  private init() {
    this.route.params.subscribe(params => {
      if (params['gameId']) {
        this.backgammonDBService.getGameById(params['gameId']).subscribe(gameData => {
          this.startGame(gameData);
          this.showCanvas = true;
          this.changeDetector.detectChanges();
        });
      } else {
        const gameData = this.backgammonDBService.getLocalGame();
        this.startGame(gameData);
        this.showCanvas = true;
        this.showOnlineGame = false;
      }
    });

    this.onlineGameForm = new FormGroup({
      name: new FormControl(),
      password: new FormControl(),
      secondPlayerName: new FormControl()
    });
  }

  private startGame(gameId?) {
    this.zone.runOutsideAngular(() => {
      Canvas.canvas = this.canvas.nativeElement;
      Canvas.context = this.canvas.nativeElement.getContext("2d");
      new BackgammonStateManager().init();
      this.gameController.init(gameId);
    });
  }

  public openOnlineGame() {
    this.showOnlineGame = true;
    this.showCanvas = false;
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

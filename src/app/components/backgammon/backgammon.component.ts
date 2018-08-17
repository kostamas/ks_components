import {AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {GameController} from './backgammonGameController';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BackgammonDBToken} from './backgammonDb.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DirtyRequired} from '../../shared/vaildators/dirty-required-validator.validator';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  public showCanvas = true;
  public formGroup: FormGroup;
  public onlinePlayers$;
  public localUser;
  public signInError = '';

  @ViewChild('canvas') canvas;

  constructor(@Inject(BackgammonDBToken) private backgammonDBService, private zone: NgZone, private gameController: GameController,
              private changeDetector: ChangeDetectorRef, fBuilder: FormBuilder, public dialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
    this.formGroup = fBuilder.group({
      email: [null, Validators.compose([DirtyRequired, Validators.email])],
      password: [null, Validators.compose([DirtyRequired, Validators.minLength(6), Validators.maxLength(15)])],
      nickname: [null, Validators.maxLength(15)]
    });
  }

  ngAfterViewInit() {
    this.init();
  }

  private init() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.localUser = JSON.parse(localStorage.getItem('backgammonUser'));

      if (params['gameId'] && this.localUser) {
        this.startGame(null, BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE, params['gameId']);
        this.changeDetector.detectChanges();
        return;
      }

      if (params['menu']) {
        // this.location.go('backgammon');
        // const {email, password} = this.localUser;
        // this.signIn(email, password);
        this.changeDetector.detectChanges();
        return;
      }

      const gameData = this.backgammonDBService.getLocalGame();
      this.startGame(gameData, BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL);
      this.changeDetector.detectChanges();
    });
  }

  private startGame(gameData, gameMode, gameId?) {
    this.showCanvas = true;
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
    this.zone.runOutsideAngular(() => {
      Canvas.canvas = this.canvas.nativeElement;
      Canvas.context = this.canvas.nativeElement.getContext('2d');

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE) {
        BackgammonStateManager.init(BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE, this.localUser);
        this.gameController.init(null, BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE, gameId);
      }

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL) {
        BackgammonStateManager.init(BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL);
        this.gameController.init(gameData, BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL);
      }

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER) {
        BackgammonStateManager.init(BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER);
        this.gameController.init(gameData, BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER);
      }
    });
  }

  private clearGame() {
    this.localUser = undefined;
    // this.openedGames = [];
    this.formGroup.reset();
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

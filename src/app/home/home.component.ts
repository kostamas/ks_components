import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {BackgammonStateManager} from '../components/backgammon/backgammonStateManager';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {BackgammonDBToken} from '../components/backgammon/backgammonDb.types';
import {GameController} from '../components/backgammon/backgammonGameController';
import {BACKGAMMON_CONSTANTS} from '../components/backgammon/helpers/backgammonConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  public components;
  public selectedPlayer;
  public openedGames;
  public onlinePlayers$;
  public showCanvas;
  public logout$;
  public localUser;

  public onlineViewStates = {
    'localGame': 'localGame',
    'onlineGame': 'onlineGame',
    'vsComputer': 'vsComputer',
    'onlineMenu': 'onlineMenu'
  };
  public currentViewState = this.onlineViewStates.localGame;

  public buttonsNames = {
    'playOnline': 'playOnline',
    'playLocal': 'playLocal',
    'logout': 'logout',
    'menu': 'menu',
    'computer': 'computer'
  };

  private displayedButtonsByCurrState = {
    [this.onlineViewStates.localGame]: [this.buttonsNames.playOnline, this.buttonsNames.computer],
    [this.onlineViewStates.onlineGame]: [this.buttonsNames.menu, this.buttonsNames.logout],
    [this.onlineViewStates.onlineMenu]: [this.buttonsNames.playLocal, this.buttonsNames.logout, this.buttonsNames.computer],
    [this.onlineViewStates.vsComputer]: [this.buttonsNames.playOnline, this.buttonsNames.playLocal],
  };


  constructor(private router: Router, private location: Location, @Inject(BackgammonDBToken) private backgammonDBService,
              private gameController: GameController) {
  }

  ngOnInit() {
  }

  public goToMenu() {
    this.router.navigate(['/backgammon/', {menu: true}]);
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
    this.currentViewState = this.onlineViewStates.onlineMenu;
    this.showCanvas = false;
  }

  public displayButtonHandler(btnName) {
    return this.displayedButtonsByCurrState[this.currentViewState].indexOf(btnName) > -1;
  }

  public playAgainstComputer() {
    this.playLocalOrAgainstComputer(BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER, this.onlineViewStates.vsComputer);

  }

  public playLocal() {
    this.playLocalOrAgainstComputer(BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL, this.onlineViewStates.localGame);
  }

  private playLocalOrAgainstComputer(gameMode, newViewState) {
    if (this.currentViewState === this.onlineViewStates.onlineGame) {
      this.gameController.destroy();
      BackgammonStateManager.removeSubscriptions();
    }
    this.currentViewState = newViewState;
    this.showCanvas = true;
    this.openedGames = [];
    const gameData = this.backgammonDBService.getLocalGame();
    // this.startGame(gameData, gameMode);
  }

  public playOnline() {
    const isAuthenticated = this.backgammonDBService.isAuthenticated();
    const pageToNavigate = isAuthenticated ? 'online' : 'login';
    this.router.navigate([`/${pageToNavigate}`]);
  }

  public logOut() {

  }

  clickHandler(page) {
  }
}

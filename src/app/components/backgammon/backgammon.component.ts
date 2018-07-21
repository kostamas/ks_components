import {AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {GameController} from './backgammonGameController';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BackgammonDBToken} from './backgammonDb.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DirtyRequired} from '../../shared/vaildators/dirty-required-validator.validator';
import {Subject} from 'rxjs/Subject';
import {Location} from '@angular/common';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';
import {MatDialog} from '@angular/material';
import {ErrorModalComponent} from '../../shared/components/error-modal/error-modal.component';

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  public showCanvas = true;
  public formGroup: FormGroup;
  public onlinePlayers$;
  public selectedPlayer;
  public localUser;
  public openedGames;
  public signInError = '';
  public logout$;

  public onlineViewStates = {
    'localGame': 'localGame',
    'onlineGame': 'onlineGame',
    'vsComputer': 'vsComputer',
    'signIn': 'signIn',
    'register': 'register',
    'onlineMenu': 'onlineMenu'
  };
  public currentViewState = this.onlineViewStates.localGame;
  public submitButtonsText = {
    [this.onlineViewStates.signIn]: 'Sign In',
    [this.onlineViewStates.register]: 'Register',
    [this.onlineViewStates.onlineGame]: 'Send Request'
  };
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
    [this.onlineViewStates.signIn]: [this.buttonsNames.playLocal, this.buttonsNames.computer],
    [this.onlineViewStates.register]: [this.buttonsNames.playLocal],
    [this.onlineViewStates.onlineMenu]: [this.buttonsNames.playLocal, this.buttonsNames.logout, this.buttonsNames.computer],
    [this.onlineViewStates.vsComputer]: [this.buttonsNames.playOnline, this.buttonsNames.playLocal],
  };

  private formErrorMessagesBuilder = {
    email: {
      dirtyRequired: 'This is a required field',
      email: 'not valid email',
      maxlength: 'password is too long'
    },
    password: {
      dirtyRequired: 'This is a required field',
      minlength: '6 character minimum',
      maxlength: 'password is too long'
    },
    nickname: {
      maxlength: 'nickname is too long'
    }
  };

  public formErrorMessages = {email: '', password: '', minlength: '', maxlength: ''};

  @ViewChild('canvas') canvas;

  constructor(@Inject(BackgammonDBToken) private backgammonDBService, private zone: NgZone, private gameController: GameController,
              private changeDetector: ChangeDetectorRef, fBuilder: FormBuilder, public dialog: MatDialog,
              private activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.formGroup = fBuilder.group({
      email: [null, Validators.compose([DirtyRequired, Validators.email])],
      password: [null, Validators.compose([DirtyRequired, Validators.minLength(6), Validators.maxLength(15)])],
      nickname: [null, Validators.maxLength(15)]
    });
  }

  ngAfterViewInit() {
    this.logout$ = new Subject();
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
        this.currentViewState = this.onlineViewStates.onlineGame;
        BackgammonStateManager.init(BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE, this.localUser);
        this.gameController.init(null, BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE, gameId);
      }

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL) {
        this.currentViewState = this.onlineViewStates.localGame;
        BackgammonStateManager.init(BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL);
        this.gameController.init(gameData, BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL);
      }

      if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER) {
        this.currentViewState = this.onlineViewStates.vsComputer;
        BackgammonStateManager.init(BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER);
        this.gameController.init(gameData, BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER);
      }
    });
  }

  public logOut() {
    this.clearGame();
    this.logout$.next();
    localStorage.removeItem('backgammonUser');
    this.router.navigate(['/backgammon/']);
    if (this.currentViewState === this.onlineViewStates.onlineMenu) {
      this.playLocal();
    }
  }

  public goToMenu() {
    this.router.navigate(['/backgammon/', {menu: true}]);
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
    this.currentViewState = this.onlineViewStates.onlineMenu;
    this.showCanvas = false;
  }

  public formErrorHandler() {
    let control, validatorName;
    Object.keys(this.formGroup.controls).forEach(controlName => {
      control = this.formGroup.controls[controlName];
      if (control.errors) {
        validatorName = Object.keys(control.errors)[0];
        this.formErrorMessages[controlName] = this.formErrorMessagesBuilder[controlName][validatorName];
      } else {
        this.formErrorMessages[controlName] = '';
      }
    });
  }

  public onFocus(controlName) {
    this.formErrorMessages[controlName] = '';
  }

  public isDisabled() {
    return !this.formGroup.valid || !this.formGroup.value.email || !this.formGroup.value.password;
  }

  public submit() {
    if (this.currentViewState === this.onlineViewStates.signIn) {
      this.signIn();
    }
    if (this.currentViewState === this.onlineViewStates.register) {
      this.register();
    }
  }

  public toggleSignInRegister() {
    if (this.currentViewState === this.onlineViewStates.register) {
      this.currentViewState = this.onlineViewStates.signIn;
    } else {
      this.currentViewState = this.onlineViewStates.register;
    }
  }

  private signIn = (userData?) => {
    const email = !!userData ? userData.user.email : this.formGroup.value.email;
    const password = this.formGroup.value.password;
    this.backgammonDBService.singIn(email, password)
      .catch((error: any) => {
        this.dialog.open(ErrorModalComponent, {
          width: '100px',
          data: {errorMessage: 'Wrong password or email'},
          panelClass: 'error-modal'
        });
        return error;
      })
      .subscribe(user => {
        const x = this.backgammonDBService.isAuthenticated();

        if (user) {
          //       localStorage.removeItem('backgammonUser');
          //       localStorage.setItem('backgammonUser', JSON.stringify({email: user.name, password: user.password}));
          //       this.localUser = user;
          //       this.onlineMenuHandler();
          //     } else {
          //       this.signInError = 'error - user does not exists';
          //       setTimeout(() => this.signInError = '', 2000);
          //     }
        }
      });
  };

  private register() {
    const {email, password, nickname} = this.formGroup.value;
    this.logout$.next();
    this.backgammonDBService.createNewUser(email, password)
      .do(registrationData => this.backgammonDBService.saveUserData(registrationData, nickname))
      .catch((err) => {
        this.dialog.open(ErrorModalComponent, {
          width: '250px',
          data: {errorMessage: err.error || 'Something went wrong :('}
        });
        return;
      })
      .subscribe(this.signIn);

  }

  private onlineMenuHandler = () => {
    if (this.currentViewState !== this.onlineViewStates.onlineGame) {
      this.currentViewState = this.onlineViewStates.onlineMenu;
    }

    this.onlinePlayers$ = this.backgammonDBService.getAllUsers(this.localUser)
      .takeUntil(this.logout$)
      .do((players: any) => {
        if (this.selectedPlayer) {
          const updatedSelectedPlayer = players.filter(player => player.name === this.selectedPlayer.name)[0];
          if (updatedSelectedPlayer) {
            this.selectedPlayer = updatedSelectedPlayer;
          } else {
            this.selectedPlayer = players[0];
          }
        } else {
          this.selectedPlayer = players[0];
        }
        if (this.localUser.gameIds) {

          this.openedGames = [];
          Object.keys(this.localUser.gameIds).forEach(gameId => {
            const secondPlayer = players.filter(player => player.gameIds && player.gameIds[gameId])[0];
            if (secondPlayer) {
              this.openedGames.push({gameId, secondPlayer: secondPlayer});
            }
          });
        }
      });
  };

  public checkIfOpenGameExists(selectedPlayer) {
    if (!this.localUser || !this.localUser.gameIds || !selectedPlayer || !selectedPlayer.gameIds) {
      return false;
    }

    return Object.keys(this.localUser.gameIds)
      .filter(gameId => !!selectedPlayer.gameIds[gameId])
      .length > 0;
  }

  public checkIfCanInvite(selectedPlayer) {
    return !this.checkIfOpenGameExists(selectedPlayer) &&
      (!selectedPlayer || !selectedPlayer.invitations || (
        this.localUser &&
        (!selectedPlayer.invitations.sent || !selectedPlayer.invitations.sent[this.localUser.name]) &&
        (!selectedPlayer.invitations.received || !selectedPlayer.invitations.received[this.localUser.name])
      ));
  }

  public sendInvitation() {
    this.backgammonDBService.sendInvitation(this.localUser, this.selectedPlayer);
  }

  public acceptInvitation(secondPlayerName) {
    this.backgammonDBService.createNewGame(this.localUser.name, secondPlayerName)
      .subscribe(gameId => {
        this.router.navigate(['/backgammon/', {gameId}]);
      });
  }

  public continue(playerName) {
    const openedGame = this.openedGames.filter((_openedGame: any) => _openedGame.secondPlayer.name === playerName)[0];
    this.router.navigate(['/backgammon/', {gameId: openedGame.gameId}]);
  }

  public displayButtonHandler(btnName) {
    return this.displayedButtonsByCurrState[this.currentViewState].indexOf(btnName) > -1;
  }

  public playOnline() {
    // const localUser: any = JSON.parse(localStorage.getItem('backgammonUser'));
    // if (localUser) {
    //   this.localUser = localUser;
    this.showCanvas = false;
    //   this.signIn(localUser.name, localUser.password);
    // } else {
    //   this.showCanvas = false;
    this.currentViewState = this.onlineViewStates.signIn;
    // }
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
    this.startGame(gameData, gameMode);
  }

  private clearGame() {
    this.localUser = undefined;
    this.openedGames = [];
    this.formGroup.reset();
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

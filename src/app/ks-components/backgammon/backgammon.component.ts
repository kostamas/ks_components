import {AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {GameController} from './gameController';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BackgammonDBToken} from './backgammonDb.types';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DirtyRequired} from '../../shared/vaildators/dirty-required-validator.validator';
import {Subject} from 'rxjs/Subject';
import {Location} from '@angular/common';

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
    'menu': 'menu'
  };

  private displayedButtonsByCurrState = {
    [this.onlineViewStates.localGame]: [this.buttonsNames.playOnline],
    [this.onlineViewStates.onlineGame]: [this.buttonsNames.menu, this.buttonsNames.logout],
    [this.onlineViewStates.signIn]: [this.buttonsNames.playLocal],
    [this.onlineViewStates.register]: [this.buttonsNames.playLocal],
    [this.onlineViewStates.onlineMenu]: [this.buttonsNames.playLocal, this.buttonsNames.logout],
  };

  private formErrorMessagesBuilder = {
    name: {dirtyRequired: 'This is a required field'},
    password: {dirtyRequired: 'This is a required field'}
  };

  public formErrorMessages = {name: '', password: ''};

  @ViewChild('canvas') canvas;

  constructor(@Inject(BackgammonDBToken) private backgammonDBService, private zone: NgZone, private gameController: GameController, private changeDetector: ChangeDetectorRef,
              fBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.formGroup = fBuilder.group({
      name: [null, DirtyRequired],
      password: [null, DirtyRequired]
    });
  }

  ngAfterViewInit() {
    this.logout$ = new Subject();
    this.init();
  }

  private init() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.localUser = JSON.parse(localStorage.getItem('backgammonUser'));

      this.formGroup.statusChanges.subscribe(status => {
        Object.keys(this.formErrorMessages).forEach(controlName => this.formErrorMessages[controlName] = '');
        if (status === 'INVALID') {
          this.formErrorHandler();
        }
      });

      if (params['gameId'] && this.localUser) {
        const isOnline = true;
        this.startGame(null, isOnline, params['gameId']);
        this.changeDetector.detectChanges();
        return;
      }

      if (params['menu']) {
        this.location.go('backgammon');
        const {name, password} = this.localUser;
        this.signIn(name, password);
        this.changeDetector.detectChanges();
        return;
      }

      const gameData = this.backgammonDBService.getLocalGame();
      this.startGame(gameData);
      this.changeDetector.detectChanges();
    });
  }

  private startGame(gameData, isOnline?, gameId?) {
    this.showCanvas = true;
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
    this.zone.runOutsideAngular(() => {
      Canvas.canvas = this.canvas.nativeElement;
      Canvas.context = this.canvas.nativeElement.getContext('2d');
      if (isOnline) {
        this.currentViewState = this.onlineViewStates.onlineGame;
        BackgammonStateManager.init(isOnline, this.localUser);
        this.gameController.init(null, isOnline, gameId);
      } else {
        this.currentViewState = this.onlineViewStates.localGame;
        BackgammonStateManager.init();
        this.gameController.init(gameData);
      }
    });
  }

  public logOut() {
    this.location.go('/backgammon')
    localStorage.removeItem('backgammonUser');
    this.clearGame();
    this.logout$.next();
    this.playLocal();
  }

  public goToMenu() {
    this.router.navigate(['/backgammon/', {menu: true}]);
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
    this.currentViewState = this.onlineViewStates.onlineMenu;
    this.showCanvas = false;
  }

  private formErrorHandler() {
    let control, validatorName;
    Object.keys(this.formGroup.controls).forEach(controlName => {
      control = this.formGroup.controls[controlName];
      if (control.errors) {
        validatorName = Object.keys(control.errors)[0];
        this.formErrorMessages[controlName] = this.formErrorMessagesBuilder[controlName][validatorName];
      }
    });
  }

  public isDisabled() {
    return !this.formGroup.valid || !this.formGroup.value.name || !this.formGroup.value.password;
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

  private signIn(_name?, _password?) {
    const name = !!_name ? _name : this.formGroup.value.name;
    const password = !!_password ? _password : this.formGroup.value.password;
    this.backgammonDBService.getUser(name, password).subscribe(user => {
      if (user) {
        localStorage.removeItem('backgammonUser');
        localStorage.setItem('backgammonUser', JSON.stringify({name: user.name, password: user.password}));
        this.localUser = user;
        this.onlineMenuHandler();
      } else {
        this.signInError = 'error - user does not exists';
        setTimeout(() => this.signInError = '', 2000);
      }
    });
  }

  private register() {
    const {name, password} = this.formGroup.value;
    this.logout$.next();
    this.backgammonDBService.createNewUser(name, password)
      .subscribe((err: any) => {
        if (err) {
          alert(err.error || 'something went wrong');
        } else {
          this.signIn();
        }
      });
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
  }

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
    const localUser: any = JSON.parse(localStorage.getItem('backgammonUser'));
    if (localUser) {
      this.localUser = localUser;
      this.showCanvas = false;
      this.signIn(localUser.name, localUser.password);
    } else {
      this.showCanvas = false;
      this.currentViewState = this.onlineViewStates.signIn;
    }
  }

  public playLocal() {
    if (this.currentViewState === this.onlineViewStates.onlineGame) {
      this.gameController.destroy();
      BackgammonStateManager.removeSubscriptions();
    }
    this.showCanvas = true;
    this.currentViewState = this.onlineViewStates.localGame;
    this.openedGames = [];
    const gameData = this.backgammonDBService.getLocalGame();
    this.startGame(gameData);
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

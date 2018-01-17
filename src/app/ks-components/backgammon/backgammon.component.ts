import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {GameController} from './gameController';
import {ActivatedRoute} from '@angular/router';
import {BackgammonDBService} from '../../adapters/backgammon-adapter/backgammonDB.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DirtyRequired} from '../../shared/vaildators/dirty-required-validator.validator';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  public showOnlineOption = true;
  public showCanvas = true;
  public formGroup: FormGroup;
  public onlinePlayers$;
  public selectedPlayer;
  public localUser;
  public openedGames;
  public signInError = '';
  public logout$;

  public onlineViewStates = {
    local: 'local-state',
    signIn: 'sign-in-state',
    register: 'register-state',
    onlineGame: 'online-game-state',
    liveGame: 'live-game'
  };
  public currentViewState = this.onlineViewStates.local;
  public submitButtonsText = {
    [this.onlineViewStates.signIn]: 'Sign In',
    [this.onlineViewStates.register]: 'Register',
    [this.onlineViewStates.onlineGame]: 'Send Request'
  };
  public onlineOrLocalText = {
    [this.onlineViewStates.local]: 'Online',
    [this.onlineViewStates.signIn]: 'Local',
    [this.onlineViewStates.register]: 'Local',
    [this.onlineViewStates.onlineGame]: 'Local',
    [this.onlineViewStates.liveGame]: 'Local'
  };

  private formErrorMessagesBuilder = {
    name: {
      dirtyRequired: 'This is a required field'
    },
    password: {
      dirtyRequired: 'This is a required field'
    }
  };

  public formErrorMessages = {
    name: '',
    password: ''
  };

  @ViewChild('canvas') canvas;

  constructor(private zone: NgZone, private gameController: GameController,
              private changeDetector: ChangeDetectorRef,
              private backgammonDBService: BackgammonDBService, fBuilder: FormBuilder) {

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
    const gameData = this.backgammonDBService.getLocalGame();
    this.startGame(gameData);
    this.changeDetector.detectChanges();

    this.formGroup.statusChanges.subscribe(status => {
      Object.keys(this.formErrorMessages).forEach(controlName => this.formErrorMessages[controlName] = '');
      if (status === 'INVALID') {
        this.formErrorHandler();
      }
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
        this.currentViewState = this.onlineViewStates.liveGame;
        BackgammonStateManager.init(isOnline, this.localUser);
        this.gameController.init(null, isOnline, gameId);
      } else {
        this.currentViewState = this.onlineViewStates.local;
        BackgammonStateManager.init();
        this.gameController.init(gameData);
      }
    });
  }

  public logOut() {
    localStorage.removeItem('backgammonUser');
    this.localUser = undefined;
    this.formGroup.reset();
    this.logout$.next();
    this.playOnlineOrLocal();
  }

  public goToMenu() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
    this.currentViewState = this.onlineViewStates.onlineGame;
    this.showCanvas = false;
  }

  public playOnlineOrLocal() {
    if (this.currentViewState === this.onlineViewStates.local) {
      const localUser: any = JSON.parse(localStorage.getItem('backgammonUser'));
      if (localUser) {
        this.localUser = localUser;
        this.currentViewState = this.onlineViewStates.onlineGame;
        this.showCanvas = false;
        this.signIn(localUser.name, localUser.password);
      } else {
        this.showCanvas = false;
        this.currentViewState = this.onlineViewStates.signIn;
      }
    } else {
      if (this.currentViewState === this.onlineViewStates.liveGame) {
        BackgammonStateManager.removeSubscriptions();
        this.gameController.destroy();
      }
      this.showCanvas = true;
      this.currentViewState = this.onlineViewStates.local;
      this.openedGames = [];
      const gameData = this.backgammonDBService.getLocalGame();
      this.startGame(gameData);
    }
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
    switch (this.currentViewState) {
      case this.onlineViewStates.signIn:
        this.signIn();
        break;
      case this.onlineViewStates.register:
        this.register();
        break;
      default:
        break;
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
        this.onlineGameHandler();
      } else {
        this.signInError = 'error - user does not exists';
        setTimeout(() => this.signInError = '', 2000);
      }
    });
  }

  private register() {
    const name = this.formGroup.value.name;
    const password = this.formGroup.value.password;
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

  private onlineGameHandler() {
    if (this.currentViewState !== this.onlineViewStates.liveGame) {
      this.currentViewState = this.onlineViewStates.onlineGame;
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
            const openedGamePlayer = players.filter(player => player.gameIds && player.gameIds[gameId])[0];
            if (openedGamePlayer) {
              this.openedGames.push({gameId, user: openedGamePlayer});
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
      (!selectedPlayer || !selectedPlayer.invitations ||
        (
          this.localUser &&
          (!selectedPlayer.invitations.sent || !selectedPlayer.invitations.sent[this.localUser.name])
          &&
          (!selectedPlayer.invitations.received || !selectedPlayer.invitations.received[this.localUser.name])
        )
      );
  }

  public sendInvitation() {
    this.backgammonDBService.sendInvitation(this.localUser, this.selectedPlayer);
  }

  public acceptInvitation(secondPlayerName) {
    this.backgammonDBService.createNewGame(this.localUser.name, secondPlayerName)
      .subscribe(gameId => {
        const isOnline = true;
        this.startGame(null, isOnline, gameId);
      });
  }

  public continue(playerName) {
    const openedGame = this.openedGames.filter((_openedGame: any) => _openedGame.user.name === playerName)[0];
    const isOnline = true;
    this.startGame(null, isOnline, openedGame.gameId);
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

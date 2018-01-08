import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from './canvas';
import {BackgammonStateManager} from './backgammonStateManager';
import {GameController} from './gameController';
import {ActivatedRoute} from '@angular/router';
import {BackgammonDBService} from '../../adapters/backgammon-adapter/backgammonDB.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DirtyRequired} from '../../shared/vaildators/dirty-required-validator.validator';

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  public showOnlineOption = true;
  public showCanvas = false;
  public formGroup: FormGroup;
  public onlinePlayers;
  public selectedPlayer;
  public invitations;
  public onlineViewStates = {
    none: 'none-state',
    signIn: 'sign-in-state',
    register: 'register-state',
    onlineGame: 'online-game-state'
  };
  public currentViewState = this.onlineViewStates.none;
  public submitButtonsText = {
    [this.onlineViewStates.signIn]: 'Sign In',
    [this.onlineViewStates.register]: 'Register',
    [this.onlineViewStates.onlineGame]: 'Send Request'
  };
  public onlineOrLocalText = {
    [this.onlineViewStates.none]: 'Online',
    [this.onlineViewStates.signIn]: 'Local',
    [this.onlineViewStates.register]: 'Local',
    [this.onlineViewStates.onlineGame]: 'Local'
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
  }

  @ViewChild('canvas') canvas;

  constructor(private zone: NgZone, private gameController: GameController,
              private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
              private backgammonDBService: BackgammonDBService, fBuilder: FormBuilder) {


    this.formGroup = fBuilder.group({
      name: [null, DirtyRequired],
      password: [null, DirtyRequired]
    });
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
        this.changeDetector.detectChanges();
      }
    });

    this.formGroup.statusChanges.subscribe(status => {
      Object.keys(this.formErrorMessages).forEach(controlName => this.formErrorMessages[controlName] = '');
      if (status === 'INVALID') {
        this.formErrorHandler();
      }
    });
  }

  private startGame(gameId?) {
    this.zone.runOutsideAngular(() => {
      Canvas.canvas = this.canvas.nativeElement;
      Canvas.context = this.canvas.nativeElement.getContext('2d');
      new BackgammonStateManager().init();
      this.gameController.init(gameId);
    });
  }

  public playOnlineOrLocal() {
    if (this.currentViewState === this.onlineViewStates.none) {
      this.showCanvas = false;
      this.currentViewState = this.onlineViewStates.signIn;
    } else {
      this.showCanvas = true;
      this.currentViewState = this.onlineViewStates.none;
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

  public submit() {
    switch (this.currentViewState) {
      case this.onlineViewStates.signIn:
        this.signIn();
      case this.onlineViewStates.register:
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

  private signIn() {
    const name = this.formGroup.value.name;
    const password = this.formGroup.value.password;
    this.backgammonDBService.getUser(name, password).subscribe(user => {
      if (user) {
        //save to local storage
        this.onlineGameHandler();
      } else {
        alert('error - user does not exists');
      }
    });
  }

  private onlineGameHandler() {
    this.currentViewState = this.onlineViewStates.onlineGame;
    this.onlinePlayers = this.backgammonDBService.getAllUsers();
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

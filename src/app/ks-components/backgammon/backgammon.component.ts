import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {Canvas} from "./canvas";
import {BackgammonStateManager} from "./backgammonStateManager";
import {GameController} from "./gameController";
import {ActivatedRoute} from "@angular/router";
import {BackgammonDBService} from "../../adapters/backgammon-adapter/backgammonDB.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-backgammon',
  templateUrl: './backgammon.component.html',
  styleUrls: ['./backgammon.component.scss']
})
export class BackgammonComponent implements AfterViewInit, OnDestroy {
  public showOnlineOption = true;
  public showCanvas = false;
  public formGroup: FormGroup;
  public onlineViewStates = {
    none: 'none-state',
    signIn: 'sign-in-state',
    register: 'register-state',
    secondPlayer: 'second-player-state'
  };
  public currentViewState = this.onlineViewStates.none;
  public submitButtonsText = {
    [this.onlineViewStates.signIn]: 'Sign In',
    [this.onlineViewStates.register]: 'Register',
    [this.onlineViewStates.secondPlayer]: 'Send Request'
  };
  public onlineOrLocalText = {
    [this.onlineViewStates.none]: 'Online',
    [this.onlineViewStates.signIn]: 'Local',
    [this.onlineViewStates.register]: 'Local',
    [this.onlineViewStates.secondPlayer]: 'Local'
  }
  public formMessagesBuilder = {
    name: {
      required: {
        message: 'This is a required field',
        constrains: {
          dirty: true
        }
      }
    },
    password: {
      required: 'This is a required field'
    }
  };
  public errorMesages = {
    name:'',
    password:''
  }

  @ViewChild('canvas') canvas;

  constructor(private zone: NgZone, private gameController: GameController,
              private route: ActivatedRoute, private changeDetector: ChangeDetectorRef,
              private backgammonDBService: BackgammonDBService, fBuilder: FormBuilder) {
    this.formGroup = fBuilder.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
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
      if (status === 'INVALID') {
        this.formErrorHandler();
      }
    })
  }

  private startGame(gameId?) {
    this.zone.runOutsideAngular(() => {
      Canvas.canvas = this.canvas.nativeElement;
      Canvas.context = this.canvas.nativeElement.getContext("2d");
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
    let validation, control;
    Object.keys(this.formGroup.controls).forEach(controlName => {
      control = this.formGroup.controls[controlName];

      Object.keys(this.formMessagesBuilder[controlName]).forEach(validationName => {
        validation = this.formMessagesBuilder[controlName][validationName];
        if(!control.valid){
          if(validation.constrains){
            Object.keys(validation.constrains).forEach(constrainName=>{
              debugger;

            });
          }
        }
        this.errorMesages[controlName] = validation.message;
        debugger;
      });
    })
  }

  public submit() {
    debugger;
    switch (this.currentViewState) {
      case this.onlineViewStates.signIn:
        break;
      case this.onlineViewStates.register:
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    BackgammonStateManager.removeSubscriptions();
    this.gameController.destroy();
  }
}

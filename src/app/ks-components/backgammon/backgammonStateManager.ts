import {Subject} from 'rxjs/Subject';
import {Canvas} from './canvas';
import {Injectable} from '@angular/core';
import {BACKGAMMON_CONSTANTS} from './helpers/backgammonConstants';

@Injectable()
export class BackgammonStateManager {
  public static mouseMove$: Subject<any>;
  private static mouseClick$: Subject<any>;
  private static redraw$: Subject<any>;
  private static selectedCheckerMove$: Subject<any>;
  private static mouseDrop$: Subject<any>;
  private static selectChecker$: Subject<any>;
  private static skipPlayer$: Subject<any>;
  private static nextPlayerState$: Subject<any>;
  private static computerMove$: Subject<any>;
  private static rollClick$: Subject<any>;
  private static surrender$: Subject<any>;
  public static gameMode;
  public static localUser;
  public static gameState;
  private static subscriptions;

  constructor() {
  }

  public static init(gameMode, localUser?) {
    if (gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE) {
      BackgammonStateManager.localUser = localUser;
    }
    BackgammonStateManager.gameMode = gameMode;

    BackgammonStateManager.mouseMove$ = new Subject();
    BackgammonStateManager.mouseClick$ = new Subject();
    BackgammonStateManager.redraw$ = new Subject();
    BackgammonStateManager.selectedCheckerMove$ = new Subject();
    BackgammonStateManager.mouseDrop$ = new Subject();
    BackgammonStateManager.selectChecker$ = new Subject();
    BackgammonStateManager.skipPlayer$ = new Subject();
    BackgammonStateManager.nextPlayerState$ = new Subject();
    BackgammonStateManager.computerMove$ = new Subject();
    BackgammonStateManager.rollClick$ = new Subject();
    BackgammonStateManager.surrender$ = new Subject();

    BackgammonStateManager.subscriptions = [];

    Canvas.canvas.addEventListener('mousemove', BackgammonStateManager.mouseMoveHandler);
    Canvas.canvas.addEventListener('click', BackgammonStateManager.mouseClickHandler);
  }

  private static mouseMoveHandler = ($event) => {
    const clientRect = Canvas.canvas.getBoundingClientRect();
    const cords = {x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top};
    const {gameState, mouseMove$, localUser, gameMode} = BackgammonStateManager;

    switch (gameMode) {
      case BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL:
        mouseMove$.next(cords);
        break;

      case BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE:
        if (gameState.players.black === localUser.name) {
          if (gameState.currentState < 2) {
            mouseMove$.next(cords);
          }
        } else {
          if (gameState.currentState > 1) {
            mouseMove$.next(cords);
          }
        }
        break;

      case BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER:
        if (gameState.players.black === 'You') {
          if (gameState.currentState < 2) {
            mouseMove$.next(cords);
          }
        } else {
          if (gameState.currentState > 1) {
            mouseMove$.next(cords);
          }
        }
        break;
    }
  }

  private static mouseClickHandler = ($event) => {
    const clientRect = Canvas.canvas.getBoundingClientRect();
    const cords = {x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top};
    const {mouseMove$, mouseClick$, gameState, localUser, gameMode} = BackgammonStateManager;

    switch (gameMode) {
      case BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL:
        mouseClick$.next(cords);
        break;

      case BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE:
        if (gameState.players.black === localUser.name) {
          if (gameState.currentState < 2) {
            mouseClick$.next(cords);
          }
        } else {
          if (gameState.currentState > 1) {
            mouseClick$.next(cords);
          }
        }
        break;

      case BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER:
        if (gameState.players.black === 'You') {
          if (gameState.currentState < 2) {
            mouseClick$.next(cords);
          }
        } else {
          if (gameState.currentState > 1) {
            mouseClick$.next(cords);
          }
        }
        break;
    }
  }

  public static onMouseMove(cb, id) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.mouseMove$.subscribe(cb)});
  }

  public static onMouseClick(cb, id) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.mouseClick$.subscribe(cb)});
  }

  public static notifyRedraw() {
    BackgammonStateManager.redraw$.next();
  }

  public static onRedraw(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.redraw$.subscribe(cb)});
  }

  public static notifySelectedCheckerMove(data) {
    BackgammonStateManager.selectedCheckerMove$.next(data);
  }

  public static onSelectedCheckerMove(cb, id?) {
    BackgammonStateManager.subscriptions.push({
      id,
      subscription: BackgammonStateManager.selectedCheckerMove$.subscribe(cb)
    });
  }

  public static notifySelectedCheckerDrop(data) {
    BackgammonStateManager.mouseDrop$.next(data);
  }

  public static onSelectedCheckerDrop(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.mouseDrop$.subscribe(cb)});
  }

  public static notifySelectChecker(data) {
    BackgammonStateManager.selectChecker$.next(data);
  }

  public static onSelectChecker(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.selectChecker$.subscribe(cb)});
  }

  public static notifySkipPlayer() {
    BackgammonStateManager.skipPlayer$.next();
  }

  public static onSkipPlayer(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.skipPlayer$.subscribe(cb)});
  }

  public static notifySurrender(player) {
    BackgammonStateManager.surrender$.next(player);
  }

  public static onSurrender(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.surrender$.subscribe(cb)});
  }

  public static notifyRollClick() {
    BackgammonStateManager.rollClick$.next();
  }

  public static onRollClick(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.rollClick$.subscribe(cb)});
  }

  public static notifyComputerMove(newGameState) {
    BackgammonStateManager.computerMove$.next(newGameState);
  }

  public static onComputerMove(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.computerMove$.subscribe(cb)});
  }

  public static notifyNextPlayerState() {
    BackgammonStateManager.nextPlayerState$.next();
  }

  public static onNextPlayerState(cb, id?) {
    BackgammonStateManager.subscriptions.push({
      id,
      subscription: BackgammonStateManager.nextPlayerState$.subscribe(cb)
    });
  }

  public static isOnline = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.ONLINE;

  public static isVSComputer = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.COMPUTER;

  public static isLocal = () => BackgammonStateManager.gameMode === BACKGAMMON_CONSTANTS.GAME_MODES.LOCAL;

  public static removeSubscriptions() {
    if (BackgammonStateManager.subscriptions) {
      BackgammonStateManager.subscriptions.forEach(subscriptionData => {
        subscriptionData.subscription.unsubscribe();
      });
    }
    if (Canvas.canvas) {
      Canvas.canvas.removeEventListener('mousemove', BackgammonStateManager.mouseMoveHandler);
      Canvas.canvas.removeEventListener('click', BackgammonStateManager.mouseClickHandler);
    }

    BackgammonStateManager.gameMode = null;
    BackgammonStateManager.localUser = null;
    BackgammonStateManager.gameState = {};
  }
}

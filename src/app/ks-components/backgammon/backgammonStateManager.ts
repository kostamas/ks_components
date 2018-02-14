import {Subject} from 'rxjs/Subject';
import {Canvas} from './canvas';
import {Injectable} from '@angular/core';

@Injectable()
export class BackgammonStateManager {
  public static mouseMove$: Subject<any>;
  private static mouseClick$: Subject<any>;
  private static redraw$: Subject<any>;
  private static selectedCheckerMove$: Subject<any>;
  private static mouseDrop$: Subject<any>;
  private static selectChecker$: Subject<any>;
  private static skipPlayer$: Subject<any>;
  private static game$: Subject<any>;
  private static rollClick$: Subject<any>;
  private static isOnline;
  public static localUser;
  public static gameState;
  private static subscriptions;

  constructor() {
  }

  public static init(isOnline?, localUser?) {
    if (isOnline) {
      BackgammonStateManager.isOnline = isOnline;
      BackgammonStateManager.localUser = localUser;
    }
    BackgammonStateManager.mouseMove$ = new Subject();
    BackgammonStateManager.mouseClick$ = new Subject();
    BackgammonStateManager.redraw$ = new Subject();
    BackgammonStateManager.selectedCheckerMove$ = new Subject();
    BackgammonStateManager.mouseDrop$ = new Subject();
    BackgammonStateManager.selectChecker$ = new Subject();
    BackgammonStateManager.skipPlayer$ = new Subject();
    BackgammonStateManager.game$ = new Subject();
    BackgammonStateManager.rollClick$ = new Subject();

    BackgammonStateManager.subscriptions = [];

    Canvas.canvas.addEventListener('mousemove', BackgammonStateManager.mouseMoveHandler);
    Canvas.canvas.addEventListener('click', BackgammonStateManager.mouseClickHandler);
  }

  private static mouseMoveHandler = ($event) => {
    const clientRect = Canvas.canvas.getBoundingClientRect();
    const cords = {x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top};

    if (!BackgammonStateManager.isOnline || !BackgammonStateManager.gameState
      || !BackgammonStateManager.gameState.players) {
      BackgammonStateManager.mouseMove$.next(cords);
      return;
    }

    if (BackgammonStateManager.gameState.players.black === BackgammonStateManager.localUser.name) {
      if (BackgammonStateManager.gameState.currentState < 2) {
        BackgammonStateManager.mouseMove$.next(cords);
      }
    } else {
      if (BackgammonStateManager.gameState.currentState > 1) {
        BackgammonStateManager.mouseMove$.next(cords);
      }
    }
  }

  private static mouseClickHandler = ($event) => {
    const clientRect = Canvas.canvas.getBoundingClientRect();
    const cords = {x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top};
    if (!BackgammonStateManager.isOnline || !BackgammonStateManager.gameState
      || !BackgammonStateManager.gameState.players) {
      BackgammonStateManager.mouseClick$.next(cords);
      return;
    }

    if (BackgammonStateManager.gameState.players.black === BackgammonStateManager.localUser.name) {
      if (BackgammonStateManager.gameState.currentState < 2) {
        BackgammonStateManager.mouseClick$.next(cords);
      }
    } else {
      if (BackgammonStateManager.gameState.currentState > 1) {
        BackgammonStateManager.mouseClick$.next(cords);
      }
    }
  };

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

  public static notifyRollClick() {
    BackgammonStateManager.rollClick$.next();
  }

  public static onRollClick(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.rollClick$.subscribe(cb)});
  }

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

    BackgammonStateManager.isOnline = false;
    BackgammonStateManager.localUser = null;
    BackgammonStateManager.gameState = {};
  }
}

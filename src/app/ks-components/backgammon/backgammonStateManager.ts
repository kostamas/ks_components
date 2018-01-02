import {Subject} from 'rxjs/Subject';
import {Canvas} from './canvas';
import {Injectable} from "@angular/core";

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

  private static subscriptions;

  constructor() {
  }

  public init() {

    BackgammonStateManager.mouseMove$ = new Subject();
    BackgammonStateManager.mouseClick$ = new Subject();
    BackgammonStateManager.redraw$ = new Subject();
    BackgammonStateManager.selectedCheckerMove$ = new Subject();
    BackgammonStateManager.mouseDrop$ = new Subject();
    BackgammonStateManager.selectChecker$ = new Subject();
    BackgammonStateManager.skipPlayer$ = new Subject();
    BackgammonStateManager.game$ = new Subject();

    BackgammonStateManager.subscriptions = [];

    Canvas.canvas.addEventListener('mousemove', BackgammonStateManager.mouseMoveHandler);
    Canvas.canvas.addEventListener('click', BackgammonStateManager.mouseClickHandler);
  }

  private static mouseMoveHandler = ($event) => {
    const clientRect = Canvas.canvas.getBoundingClientRect();
    BackgammonStateManager.mouseMove$.next({x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top});
  }

  private static mouseClickHandler = ($event) => {
    const clientRect = Canvas.canvas.getBoundingClientRect();
    BackgammonStateManager.mouseClick$.next({x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top});
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

  public static notifyGame(newGameState) {
    BackgammonStateManager.game$.next(newGameState);
  }

  public static onGame(cb, id?) {
    BackgammonStateManager.subscriptions.push({id, subscription: BackgammonStateManager.game$.subscribe(cb)});
  }

  public static removeSubscriptions() {
    BackgammonStateManager.subscriptions.forEach(subscriptionData => {
      subscriptionData.subscription.unsubscribe();
    });

    Canvas.canvas.removeEventListener('mousemove', BackgammonStateManager.mouseMoveHandler);
    Canvas.canvas.removeEventListener('click', BackgammonStateManager.mouseClickHandler);
  }
}

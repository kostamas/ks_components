import {Subject} from 'rxjs/Subject';
import {Canvas} from './canvas';

export class StateManager {
  public static mouseMove$: Subject<any>;
  private static mouseClick$: Subject<any>;
  private static redraw$: Subject<any>;
  private static selectedCheckerMove$: Subject<any>;
  private static mouseDrop$: Subject<any>;
  private static selectChecker$: Subject<any>;
  private static skipPlayer$: Subject<any>;

  private static subscriptions;

  public init() {

    StateManager.mouseMove$ = new Subject();
    StateManager.mouseClick$ = new Subject();
    StateManager.redraw$ = new Subject();
    StateManager.selectedCheckerMove$ = new Subject();
    StateManager.mouseDrop$ = new Subject();
    StateManager.selectChecker$ = new Subject();
    StateManager.skipPlayer$ = new Subject();

    StateManager.subscriptions = [];

    Canvas.canvas.addEventListener('mousemove', StateManager.mouseMoveHandler);

    Canvas.canvas.addEventListener('click', StateManager.mouseClickHandler);
  }

  private static mouseMoveHandler = ($event) => {
    StateManager.mouseMove$.next({x: $event.layerX, y: $event.layerY});
  }

  private static mouseClickHandler = ($event) => {
    StateManager.mouseClick$.next({x: $event.layerX, y: $event.layerY});
  }

  public static onMouseMove(cb, id) {
    StateManager.subscriptions.push({id, subscription: StateManager.mouseMove$.subscribe(cb)});
  }

  public static onMouseClick(cb, id) {
    StateManager.subscriptions.push({id, subscription: StateManager.mouseClick$.subscribe(cb)});
  }

  public static notifyRedraw() {
    StateManager.redraw$.next();
  }

  public static onRedraw(cb, id?) {
    StateManager.subscriptions.push({id, subscription: StateManager.redraw$.subscribe(cb)});
  }

  public static notifySelectedCheckerMove(data) {
    StateManager.selectedCheckerMove$.next(data);
  }


  public static notifySelectedCheckerDrop(data) {
    StateManager.mouseDrop$.next(data);
  }

  public static onSelectedCheckerDrop(cb, id?) {
    StateManager.subscriptions.push({id, subscription: StateManager.mouseDrop$.subscribe(cb)});
  }

  public static notifySelectChecker(data) {
    StateManager.selectChecker$.next(data);
  }

  public static onSelectChecker(cb, id?) {
    StateManager.subscriptions.push({id, subscription: StateManager.selectChecker$.subscribe(cb)});
  }

  public static notifySkipPlayer() {
    StateManager.skipPlayer$.next();
  }

  public static onSkipPlayer(cb, id?) {
    StateManager.subscriptions.push({id, subscription: StateManager.skipPlayer$.subscribe(cb)});
  }

  public static removeSubscriptions() {
    StateManager.subscriptions.forEach(subscriptionData => {
      subscriptionData.subscription.unsubscribe();
    });

    Canvas.canvas.removeEventListener('mousemove', StateManager.mouseMoveHandler);
    Canvas.canvas.removeEventListener('click', StateManager.mouseClickHandler);
  }
}

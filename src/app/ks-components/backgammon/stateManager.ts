import {Subject} from 'rxjs/Subject';
import {Canvas} from './canvas';

export class StateManager {
  public static mouseMove$: Subject<any>;
  private static mouseClick$: Subject<any>;
  private static redraw$: Subject<any>;
  private static selectedCheckerMove$: Subject<any>;
  private static mouseDrop$: Subject<any>;
  private static selectChecker$: Subject<any>;

  private static subscriptions;

  constructor() {
    StateManager.mouseMove$ = new Subject();
    StateManager.mouseClick$ = new Subject();
    StateManager.redraw$ = new Subject();
    StateManager.selectedCheckerMove$ = new Subject();
    StateManager.mouseDrop$ = new Subject();
    StateManager.selectChecker$ = new Subject();

    StateManager.subscriptions = {move: [], click: []};

    StateManager.init();
  }

  private static init() {
    Canvas.canvas.addEventListener('mousemove', ($event) => {
      StateManager.mouseMove$.next({x: $event.layerX, y: $event.layerY});
    });

    Canvas.canvas.addEventListener('click', ($event) => {
      StateManager.mouseClick$.next({x: $event.layerX, y: $event.layerY});
    });
  }

  public static onMouseMove(cb, id) {
    StateManager.subscriptions.move.push({id, subscription: StateManager.mouseMove$.subscribe(cb)});
  }

  public static onMouseClick(cb, id) {
    StateManager.subscriptions.move.push({id, subscription: StateManager.mouseClick$.subscribe(cb)});
  }

  public static notifyRedraw() {
    StateManager.redraw$.next();
  }

  public static onRedraw(cb, id?) {
    StateManager.subscriptions.move.push({id, subscription: StateManager.redraw$.subscribe(cb)});
  }

  public static notifySelectedCheckerMove(data) {
    StateManager.selectedCheckerMove$.next(data);
  }


  public static notifySelectedCheckerDrop(data) {
    StateManager.mouseDrop$.next(data);
  }

  public static onSelectedCheckerDrop(cb, id?) {
    StateManager.subscriptions.move.push({id, subscription: StateManager.mouseDrop$.subscribe(cb)});
  }

  public static notifySelectChecker(data) {
    StateManager.selectChecker$.next(data);
  }

  public static onSelectChecker(cb, id?) {
    StateManager.subscriptions.move.push({id, subscription: StateManager.selectChecker$.subscribe(cb)});
  }
  public static removeSubscriptions() {
  }
}

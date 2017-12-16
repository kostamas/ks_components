import {Subject} from 'rxjs/Subject';
import {Canvas} from './canvas';

export class StateManager {
  private static mouseMove$: Subject<any>;
  private static mouseClick$: Subject<any>;
  private static redraw$: Subject<any>;
  private static selectedCheckerMove$: Subject<any>;
  private static subscriptions;

  constructor() {
    StateManager.mouseMove$ = new Subject();
    StateManager.mouseClick$ = new Subject();
    StateManager.redraw$ = new Subject();
    StateManager.selectedCheckerMove$ = new Subject();

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

  public static onSelectedCheckerMove(cb, id?) {
    StateManager.subscriptions.move.push({id, subscription: StateManager.selectedCheckerMove$.subscribe(cb)});
  }

  public static removeSubscriptions() {
  }
}

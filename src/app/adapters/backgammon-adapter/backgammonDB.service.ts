import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {BackgammonMockData} from './backgammon-mock';
import {IBackgammonDb} from '../../ks-components/backgammon/backgammonDb.interface';
import {BackgammonStateManager} from '../../ks-components/backgammon/backgammonStateManager';

export class BackgammonDBService implements IBackgammonDb {
  constructor() {
  }

  public getGameById(gameId: string) {
    return Observable.of(BackgammonMockData.db.games.game1);
  }

  public getLocalGame() {
    return BackgammonMockData.db.games.game1;
  }

  private gameHandler(newGameState) {
    BackgammonStateManager.notifyGame(newGameState);
  }
}

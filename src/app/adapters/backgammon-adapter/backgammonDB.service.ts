import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {BackgammonMockData} from "./backgammon-mock";
import {IBackgammonDb} from "../../ks-components/backgammon/backgammonDb.interface";

export class BackgammonDBService implements IBackgammonDb {
  public getGameById(gameId: string) {
    return Observable.of(BackgammonMockData.db.games.game1);
  }
}

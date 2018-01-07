import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {BackgammonMockData} from './backgammon-mock';
import {IBackgammonDb} from '../../ks-components/backgammon/backgammonDb.interface';
import {BackgammonStateManager} from '../../ks-components/backgammon/backgammonStateManager';

// import {AngularFireDatabase} from 'angularfire2/database';

export class BackgammonDBService implements IBackgammonDb {
  // constructor(private fireDatabase: AngularFireDatabase) {
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

  public getUser(userName, password) {
    // return this.fireDatabase.object(`users/${userName}`)
    //   .valueChanges()
    //   .map((user: any) => user && user.password === password ? user : null);
    return Observable.of({userName, password});
  }

  public createNewUser(userName, password) {

  }

  public getAllUsers() {
    return Observable.of([{name: 'user1'}, {name: 'user2'}, {name: 'user3'}]);
  }
}

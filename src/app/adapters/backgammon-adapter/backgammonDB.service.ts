import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {BackgammonMockData} from './backgammon-mock';
import {IBackgammonDb} from '../../ks-components/backgammon/backgammonDb.interface';
import {BackgammonStateManager} from '../../ks-components/backgammon/backgammonStateManager';

import {AngularFireDatabase} from 'angularfire2/database';

export class BackgammonDBService implements IBackgammonDb {
  constructor(private fireDatabase: AngularFireDatabase) {
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

  public getAllUsers(localUser) {
    const usersArr = [];
    return this.fireDatabase.object(`users/`)
      .valueChanges()
      .map((users: any) => {
        usersArr.length = 0;
        Object.keys(users).forEach(userKey => {
          if (users[userKey].name !== localUser.name) {
            usersArr.push({
              name: users[userKey].name,
              gameIds: users[userKey].gameIds,
              invitations: users[userKey].invitations
            });
          }
        });
        return usersArr;
      });

  }

  public getInvitations(userName) {
    return this.fireDatabase.object(`users/${userName}/invitations`).valueChanges();
  }

  public sendInvitation(localPlayer, selectedPlayer) {
    this.fireDatabase.object(`users/${selectedPlayer.name}/invitations/received/${localPlayer.name}`)
      .set(localPlayer.name);
    this.fireDatabase.object(`users/${localPlayer.name}/invitations/sent/${selectedPlayer.name}`)
      .set(selectedPlayer.name);
  }
}

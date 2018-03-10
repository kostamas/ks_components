import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {BackgammonMockData} from './backgammon-mock';
import {IBackgammonDb} from '../../ks-components/backgammon/backgammonDb.interface';

import {AngularFireDatabase} from 'angularfire2/database';
import {initialState} from '../../ks-components/backgammon/helpers/initialGameState';

export class BackgammonDBService implements IBackgammonDb {
  constructor(private fireDatabase: AngularFireDatabase) {
  }

  public getGameById(gameId: string) {
    return Observable.of(BackgammonMockData.db.games.game1);
  }

  public getLocalGame() {
    return BackgammonMockData.db.games.game1;
  }

  public getUser(userName, password) {
    return this.fireDatabase.object(`users/${userName}`)
      .valueChanges()
      .map((user: any) => user && String(user.password) === String(password) ? user : null);
  }

  public createNewUser(userName, password) {
    return this.fireDatabase.object(`users/${userName}`)
      .valueChanges()
      .take(1)
      .switchMap((user: any) => {
        let observable;
        if (user) {
          observable = Observable.of({error: 'user name already exists'});
        } else {
          observable = Observable.fromPromise(this.fireDatabase.object(`users/${userName}`)
            .set({name: userName, password}));
        }
        return observable;
      });
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

  public isGameCompleted(gameId) {
    return this.fireDatabase.object(`games/${gameId}/state/winningPlayer`).valueChanges()
      .map((winningPlayer: any) => winningPlayer === 1 || winningPlayer === 3)
      .take(1);
  }

  public createNewGame(localUserName, secondPlayerName) {
    const _initialState: any = initialState;
    _initialState.state.players = {
      black: localUserName,
      white: secondPlayerName
    };
    const pushData = this.fireDatabase.list('games/').push(_initialState);
    const gameId = pushData.key;

    return Observable.fromPromise(pushData.then(err => {
      this.fireDatabase.object(`users/${localUserName}/gameIds/${gameId}`).set(gameId);
      this.fireDatabase.object(`users/${secondPlayerName}/gameIds/${gameId}`).set(gameId);
      this.fireDatabase.object(`users/${localUserName}/invitations/received/${secondPlayerName}`).remove();
      this.fireDatabase.object(`users/${secondPlayerName}/invitations/sent/${localUserName}`).remove();
      return gameId;
    })).take(1);
  }

  public newGame(localUserName, secondPlayerName, gameId) {
    const _initialState: any = initialState;
    _initialState.state.players = {
      black: localUserName,
      white: secondPlayerName
    };

    return this.fireDatabase.object(`games/${gameId}`).set(_initialState);
  }

  public getGameStateObserveable(gameId) {
    return this.fireDatabase.object(`games/${gameId}/state`).valueChanges();
  }

  public getSelectedCheckerObservable(gameId) {
    return this.fireDatabase.object(`games/${gameId}/selectedChecker`).valueChanges();
  }

  public updateGameState(gameId, newState) {
    newState.timeStamp = Date.now();
    this.fireDatabase.object(`games/${gameId}`).set(newState);
  }

  public updateSelectedCheckerMove(x, y, checker, gameId, localUser) {
    const selectedChecker = {x, y, id: checker.id, player: localUser.name};
    this.fireDatabase.object(`games/${gameId}/selectedChecker`).set(selectedChecker);
  }

  public sendInvitation(localPlayer, selectedPlayer) {
    this.fireDatabase.object(`users/${selectedPlayer.name}/invitations/received/${localPlayer.name}`)
      .set(localPlayer.name);
    this.fireDatabase.object(`users/${localPlayer.name}/invitations/sent/${selectedPlayer.name}`)
      .set(selectedPlayer.name);
  }

}

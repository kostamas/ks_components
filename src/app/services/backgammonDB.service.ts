import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import {Observable} from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import {BackgammonMockData} from '../backgammon-mock';
import {AngularFireDatabase} from 'angularfire2/database';
import {initialState} from '../components/backgammon/helpers/initialGameState';
import {IBackgammonDBService} from '../components/backgammon/backgammonDb.types';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from '@angular/core';

@Injectable()
export class BackgammonDBSAdapter implements IBackgammonDBService {
  readonly angularFireAuth;
  private fireDatabase;

  constructor(fireDatabase: AngularFireDatabase, angularFireAuth: AngularFireAuth) {
    this.fireDatabase = fireDatabase;
    this.angularFireAuth = angularFireAuth;
  }

  public getGameById(gameId: string) {
    return Observable.of(BackgammonMockData.db.games.game1);
  }

  public getLocalGame() {
    return BackgammonMockData.db.games.game1;
  }

  public getUser() {
    const {currentUser} = this.angularFireAuth.auth;
    if (!currentUser) {
      return new ErrorObservable('sad');
    } else {
      return this.fireDatabase.object(`users/${currentUser.uid}`)
        .valueChanges();
    }
  }

  public createNewUser = (email, password) => {
    const prom = this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    return fromPromise(prom);
  };

  public singIn = (email, password) => {
    const prom = this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    return fromPromise(prom);
  };

  public isAuthenticated = () => {
    return !!this.angularFireAuth.auth.currentUser;
  };

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

  public getGameStateObservable(gameId) {
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

  public saveUserData(registrationData, nickName) {
    const user = registrationData && registrationData.user;
    if (!user) {
       throw Observable.throw('Failed to register :(');
    } else {
      const newUsrToSave = {
        uid: user.uid,
        nickName,
        email: user.email
      };
      return this.fireDatabase.object(`users/${user.uid}`).set(newUsrToSave);
    }
  }
}

import {InjectionToken} from '@angular/core';

export interface IBackgammonDBService {
  getGameById: (id: string) => any;
  getLocalGame: () => any;
  getUser: (userName: string, password: string) => any;
  createNewUser: (userName: string, password: string) => any;
  saveUserData: (...params) => any;
  getAllUsers: (localUser: any) => any;
  createNewGame: (localUserName: string, secondPlayerName: string) => any;
  newGame: (localUserName: any, secondPlayerName: string, gameId: string) => any;
  getGameStateObservable: (gameId: string) => any;
  getSelectedCheckerObservable: (gameId: string) => any;
  updateGameState: (gameId: string, newState: any) => any;
  updateSelectedCheckerMove: (x: number, y: number, checker: any, gameId: string, localUser: any) => any;
  sendInvitation: (localPlayer: any, selectedPlayer: any) => any;
}

export interface IBackgammonSrvCtor {
  new(a: any, b: any): IBackgammonDBService;
}

export const BackgammonDBToken = new InjectionToken<IBackgammonDBService>('BackgammonDBService');

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
require("rxjs/add/operator/delay");
var Observable_1 = require("rxjs/Observable");
var backgammon_mock_1 = require("./backgammon-mock");
var initialGameState_1 = require("../../ks-components/backgammon/helpers/initialGameState");
var BackgammonDBService = (function () {
    function BackgammonDBService(fireDatabase) {
        this.fireDatabase = fireDatabase;
    }
    BackgammonDBService.prototype.getGameById = function (gameId) {
        return Observable_1.Observable.of(backgammon_mock_1.BackgammonMockData.db.games.game1);
    };
    BackgammonDBService.prototype.getLocalGame = function () {
        return backgammon_mock_1.BackgammonMockData.db.games.game1;
    };
    BackgammonDBService.prototype.getUser = function (userName, password) {
        return this.fireDatabase.object("users/" + userName)
            .valueChanges()
            .map(function (user) { return user && String(user.password) === String(password) ? user : null; });
    };
    BackgammonDBService.prototype.createNewUser = function (userName, password) {
        var _this = this;
        return this.fireDatabase.object("users/" + userName)
            .valueChanges()
            .take(1)
            .switchMap(function (user) {
            var observable;
            if (user) {
                observable = Observable_1.Observable.of({ error: 'user name already exists' });
            }
            else {
                observable = Observable_1.Observable.fromPromise(_this.fireDatabase.object("users/" + userName)
                    .set({ name: userName, password: password }));
            }
            return observable;
        });
    };
    BackgammonDBService.prototype.getAllUsers = function (localUser) {
        var usersArr = [];
        return this.fireDatabase.object("users/")
            .valueChanges()
            .map(function (users) {
            usersArr.length = 0;
            Object.keys(users).forEach(function (userKey) {
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
    };
    BackgammonDBService.prototype.isGameCompleted = function (gameId) {
        return this.fireDatabase.object("games/" + gameId + "/state/winningPlayer").valueChanges()
            .map(function (winningPlayer) { return winningPlayer === 1 || winningPlayer === 3; })
            .take(1);
    };
    BackgammonDBService.prototype.createNewGame = function (localUserName, secondPlayerName) {
        var _this = this;
        var _initialState = initialGameState_1.initialState;
        _initialState.state.players = {
            black: localUserName,
            white: secondPlayerName
        };
        var pushData = this.fireDatabase.list('games/').push(_initialState);
        var gameId = pushData.key;
        return Observable_1.Observable.fromPromise(pushData.then(function (err) {
            _this.fireDatabase.object("users/" + localUserName + "/gameIds/" + gameId).set(gameId);
            _this.fireDatabase.object("users/" + secondPlayerName + "/gameIds/" + gameId).set(gameId);
            _this.fireDatabase.object("users/" + localUserName + "/invitations/received/" + secondPlayerName).remove();
            _this.fireDatabase.object("users/" + secondPlayerName + "/invitations/sent/" + localUserName).remove();
            return gameId;
        })).take(1);
    };
    BackgammonDBService.prototype.newGame = function (localUserName, secondPlayerName, gameId) {
        var _initialState = initialGameState_1.initialState;
        _initialState.state.players = {
            black: localUserName,
            white: secondPlayerName
        };
        return this.fireDatabase.object("games/" + gameId).set(_initialState);
    };
    BackgammonDBService.prototype.getGameStateObserveable = function (gameId) {
        return this.fireDatabase.object("games/" + gameId + "/state").valueChanges();
    };
    BackgammonDBService.prototype.getSelectedCheckerObservable = function (gameId) {
        return this.fireDatabase.object("games/" + gameId + "/selectedChecker").valueChanges();
    };
    BackgammonDBService.prototype.updateGameState = function (gameId, newState) {
        newState.timeStamp = Date.now();
        this.fireDatabase.object("games/" + gameId).set(newState);
    };
    BackgammonDBService.prototype.updateSelectedCheckerMove = function (x, y, checker, gameId, localUser) {
        var selectedChecker = { x: x, y: y, id: checker.id, player: localUser.name };
        this.fireDatabase.object("games/" + gameId + "/selectedChecker").set(selectedChecker);
    };
    BackgammonDBService.prototype.sendInvitation = function (localPlayer, selectedPlayer) {
        this.fireDatabase.object("users/" + selectedPlayer.name + "/invitations/received/" + localPlayer.name)
            .set(localPlayer.name);
        this.fireDatabase.object("users/" + localPlayer.name + "/invitations/sent/" + selectedPlayer.name)
            .set(selectedPlayer.name);
    };
    return BackgammonDBService;
}());
exports.BackgammonDBService = BackgammonDBService;

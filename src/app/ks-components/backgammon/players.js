"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var backgammonStateManager_1 = require("./backgammonStateManager");
var backgammonUtils_1 = require("./helpers/backgammonUtils");
var Players = (function () {
    function Players() {
        var _this = this;
        this.winningPlayer = -1;
        this.skipBtnCoordinates = { x: 320, y: 30 };
        this.surrenderCoordinates = { x: 570, y: 30 };
        this.surrenderHandler = function (x, y) {
            var surrenderCoordinates = _this.surrenderCoordinates;
            var localUserName = backgammonStateManager_1.BackgammonStateManager.localUser.name;
            var canSurrenderPlayer = Players.canSurrenderPlayer, onlinePlayersName = Players.onlinePlayersName, playersNamesMap = Players.playersNamesMap;
            var canSurrenderPlayerName = onlinePlayersName[playersNamesMap[canSurrenderPlayer]];
            var _isOverlap = backgammonUtils_1.isOverlap(x, y, surrenderCoordinates.x, surrenderCoordinates.y - 10, 100, 17);
            if (canSurrenderPlayer > -1 && localUserName === canSurrenderPlayerName && _isOverlap) {
                backgammonStateManager_1.BackgammonStateManager.notifySurrender(canSurrenderPlayer);
            }
        };
        this.mouseClickHandler = function (_a) {
            var x = _a.x, y = _a.y;
            _this.skipTurnHandler(x, y);
            _this.surrenderHandler(x, y);
        };
        this.init();
    }
    Players.nextPlayer = function () {
        Players.currentState = (Players.currentState + 1) % 4;
    };
    Players.prototype.init = function () {
        backgammonStateManager_1.BackgammonStateManager.onMouseClick(this.mouseClickHandler, 'player');
        this.draw();
    };
    Players.prototype.skipTurnHandler = function (x, y) {
        var skipBtnCoordinates = this.skipBtnCoordinates;
        if (Players.showsSkipButton && backgammonUtils_1.isOverlap(x, y, skipBtnCoordinates.x, skipBtnCoordinates.y - 10, 60, 40)) {
            if (Players.currentState < 2) {
                Players.currentState = 2;
            }
            else {
                Players.currentState = 0;
            }
            backgammonStateManager_1.BackgammonStateManager.notifySkipPlayer();
            Players.showsSkipButton = false;
        }
    };
    Players.prototype.showWinningPlayer = function (playerType) {
        var canSurrenderPlayer = Players.canSurrenderPlayer, onlinePlayersName = Players.onlinePlayersName, playersNamesMap = Players.playersNamesMap;
        this.winningPlayer = playerType;
        var onlinePlayerName = Players.onlinePlayersName[Players.playersNamesMap[playerType]];
        var winningPlayerName = onlinePlayerName || Players.playersNamesMap[playerType];
        canvas_1.Canvas.context.fillStyle = 'rgba(0,0,0,0.7)';
        canvas_1.Canvas.context.fillRect(0, 0, 684, 575);
        canvas_1.Canvas.context.font = '35px Lato';
        canvas_1.Canvas.context.fillStyle = 'white';
        canvas_1.Canvas.context.fillText(winningPlayerName + " Won!", 270, 240);
        if (Players.canSurrenderPlayer > -1) {
            canvas_1.Canvas.context.font = '20px Lato';
            var surrenderedPlayerName = onlinePlayersName[playersNamesMap[canSurrenderPlayer]];
            canvas_1.Canvas.context.fillText("(" + surrenderedPlayerName + " Surrendered)", 245, 290);
        }
    };
    Players.isCurrentOnlinePlayer = function () {
        var localUserName = backgammonStateManager_1.BackgammonStateManager.localUser && backgammonStateManager_1.BackgammonStateManager.localUser.name; // isOnline.
        var currentPlayerType = Players.currentState < 2 ? Players.playersMap.Black : Players.playersMap.White;
        var currentPlayerName = Players.onlinePlayersName[Players.playersNamesMap[currentPlayerType]];
        return !localUserName || localUserName && localUserName === currentPlayerName;
    };
    Players.prototype.draw = function () {
        canvas_1.Canvas.context.font = '25px serif';
        canvas_1.Canvas.context.fillStyle = '#f7f01b';
        canvas_1.Canvas.context.fillText('Player:', 12, 27);
        canvas_1.Canvas.context.beginPath();
        canvas_1.Canvas.context.moveTo(90, 22);
        canvas_1.Canvas.context.lineWidth = 7;
        canvas_1.Canvas.context.strokeStyle = Players.currentState < 2 ? '#000' : '#fff';
        canvas_1.Canvas.context.lineTo(110, 22);
        canvas_1.Canvas.context.stroke();
        if (Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]] ||
            Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]]) {
            canvas_1.Canvas.context.fillStyle = Players.currentState < 2 ? '#000' : '#fff';
            if (Players.currentState < 2) {
                canvas_1.Canvas.context.fillText(Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]], 120, 29);
            }
            else {
                canvas_1.Canvas.context.fillText(Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]], 120, 29);
            }
        }
        if (Players.showsSkipButton) {
            canvas_1.Canvas.context.font = '25px serif';
            canvas_1.Canvas.context.fillStyle = 'white';
            canvas_1.Canvas.context.fillText('Skip', 320, 30);
        }
        var onlinePlayersName = Players.onlinePlayersName, canSurrenderPlayer = Players.canSurrenderPlayer, playersNamesMap = Players.playersNamesMap;
        var localUser = backgammonStateManager_1.BackgammonStateManager.localUser;
        var isCurrentUserSurrendered = localUser && localUser.name === onlinePlayersName[playersNamesMap[canSurrenderPlayer]];
        if (canSurrenderPlayer > -1 && isCurrentUserSurrendered) {
            canvas_1.Canvas.context.font = '25px serif';
            canvas_1.Canvas.context.fillStyle = '#f4f700';
            canvas_1.Canvas.context.fillText('Surrender', this.surrenderCoordinates.x, this.surrenderCoordinates.y);
        }
        if (this.winningPlayer >= 0) {
            this.showWinningPlayer(this.winningPlayer);
        }
    };
    Players.destroy = function () {
        Players.currentState = 0;
        Players.showsSkipButton = false;
        Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.Black]] = '';
        Players.onlinePlayersName[Players.playersNamesMap[Players.playersMap.White]] = '';
    };
    Players.canSurrenderPlayer = -1;
    Players.playersMap = {
        Black: 1,
        White: 3
    };
    Players.playersNamesMap = (_a = {},
        _a[Players.playersMap.Black] = 'Black',
        _a[Players.playersMap.White] = 'White',
        _a);
    Players.onlinePlayersName = (_b = {},
        _b[Players.playersNamesMap[Players.playersMap.Black]] = '',
        _b[Players.playersNamesMap[Players.playersMap.White]] = '',
        _b);
    Players.currentState = 0;
    Players.showsSkipButton = false;
    return Players;
}());
exports.Players = Players;
var _a, _b;

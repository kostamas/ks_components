"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var players_1 = require("./players");
var uiHelper_1 = require("./helpers/uiHelper");
var OutsideBoard = (function () {
    function OutsideBoard() {
        this.checkers = (_a = {},
            _a[players_1.Players.playersNamesMap[players_1.Players.playersMap.White]] = [],
            _a[players_1.Players.playersNamesMap[players_1.Players.playersMap.Black]] = [],
            _a);
        this.showArrow = (_b = {},
            _b[players_1.Players.playersNamesMap[players_1.Players.playersMap.Black]] = false,
            _b[players_1.Players.playersNamesMap[players_1.Players.playersMap.White]] = false,
            _b);
        this.position = (_c = {},
            _c[players_1.Players.playersNamesMap[players_1.Players.playersMap.Black]] = { x: 643, y: 322 },
            _c[players_1.Players.playersNamesMap[players_1.Players.playersMap.White]] = { x: 643, y: 42 },
            _c);
        this.dimensions = {
            width: 35,
            height: 210
        };
        this.init();
        var _a, _b, _c;
    }
    OutsideBoard.prototype.getNextCheckerPosition = function (playerType) {
        var x, y;
        x = this.position[players_1.Players.playersNamesMap[playerType]].x;
        y = this.position[players_1.Players.playersNamesMap[playerType]].y;
        return { x: x, y: y + this.checkers[players_1.Players.playersNamesMap[playerType]].length * 7 };
    };
    OutsideBoard.prototype.getPosition = function (playerType) {
        return this.position[players_1.Players.playersNamesMap[playerType]];
    };
    OutsideBoard.prototype.getDimensions = function () {
        return this.dimensions;
    };
    OutsideBoard.prototype.draw = function () {
        var x, y;
        canvas_1.Canvas.context.lineWidth = 1;
        canvas_1.Canvas.context.strokeStyle = '#003b0d';
        if (this.showArrow[players_1.Players.playersNamesMap[players_1.Players.playersMap.Black]]) {
            x = this.position[players_1.Players.playersNamesMap[players_1.Players.playersMap.Black]].x;
            y = this.position[players_1.Players.playersNamesMap[players_1.Players.playersMap.Black]].y;
            uiHelper_1.drawArrow([660, 280], [660, 310]);
            canvas_1.Canvas.context.rect(x, y, this.dimensions.width, this.dimensions.height);
            canvas_1.Canvas.context.stroke();
        }
        if (this.showArrow[players_1.Players.playersNamesMap[players_1.Players.playersMap.White]]) {
            x = this.position[players_1.Players.playersNamesMap[players_1.Players.playersMap.White]].x;
            y = this.position[players_1.Players.playersNamesMap[players_1.Players.playersMap.White]].y;
            uiHelper_1.drawArrow([660, 290], [660, 260]);
            canvas_1.Canvas.context.rect(x, y, this.dimensions.width, this.dimensions.height);
            canvas_1.Canvas.context.stroke();
            canvas_1.Canvas.context.stroke();
        }
    };
    OutsideBoard.prototype.init = function () {
        this.draw();
    };
    return OutsideBoard;
}());
exports.OutsideBoard = OutsideBoard;

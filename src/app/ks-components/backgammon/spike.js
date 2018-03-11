"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var backgammonConstants_1 = require("./helpers/backgammonConstants");
var uiHelper_1 = require("./helpers/uiHelper");
var Spike = (function () {
    function Spike(x, y, direction) {
        this.spikeIndex = Spike.spikesCount;
        Spike.spikesCount++;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.checkers = [];
    }
    Spike.prototype.addChecker = function (checker) {
        this.checkers.push(checker);
    };
    Spike.prototype.getNextCheckerPosition = function (index) {
        var yOffset;
        if (index || index === 0) {
            yOffset = index * backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE;
        }
        else {
            yOffset = this.checkers.length < 5 ?
                this.checkers.length * backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE :
                (this.checkers.length % 5) * backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE + 10;
        }
        var y = this.y;
        y += this.direction === 'down' ? yOffset : -yOffset;
        return { x: this.x, y: y };
    };
    Spike.prototype.draw = function () {
        if (this.showValidMove) {
            var p1 = void 0, p2 = void 0;
            if (this.direction === 'down') {
                p1 = [this.x + backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2 + 3, this.y + 248];
                p2 = [this.x + backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2 + 3, this.y + 218];
            }
            else {
                p1 = [this.x + backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y - 210];
                p2 = [this.x + backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2, this.y - 180];
            }
            uiHelper_1.drawArrow(p1, p2);
        }
    };
    Spike.prototype.getShowValidMove = function () {
        return this.showValidMove;
    };
    Spike.prototype.setShowValidMove = function (showValidMove) {
        this.showValidMove = showValidMove;
    };
    Spike.prototype.clearCheckers = function () {
        this.checkers = [];
    };
    Spike.destroy = function () {
        Spike.spikesCount = 0;
    };
    Spike.spikesCount = 0;
    return Spike;
}());
exports.Spike = Spike;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var backgammonStateManager_1 = require("./backgammonStateManager");
var backgammonConstants_1 = require("./helpers/backgammonConstants");
var backgammonUtils_1 = require("./helpers/backgammonUtils");
var uiHelper_1 = require("./helpers/uiHelper");
var players_1 = require("./players");
var Checker = (function () {
    function Checker(x, y, type, currentSpike) {
        var _this = this;
        this.isOffBoard = false;
        this.subscribeToMouseEvents = function () {
            backgammonStateManager_1.BackgammonStateManager.onMouseClick(_this.mouseClickHandler, _this.id);
            backgammonStateManager_1.BackgammonStateManager.onMouseMove(_this.mouseMoveHandler, _this.id);
        };
        this.mouseMoveHandler = function (_a) {
            var x = _a.x, y = _a.y;
            if (_this.type !== players_1.Players.currentState || !players_1.Players.isCurrentOnlinePlayer()) {
                return;
            }
            if (_this.isClicked) {
                backgammonStateManager_1.BackgammonStateManager.notifySelectedCheckerMove({ x: x, y: y, checker: _this });
                backgammonStateManager_1.BackgammonStateManager.notifyRedraw();
                _this.x = x - _this.radius * 1.5;
                _this.y = y - _this.radius * 1.5;
            }
            if (backgammonUtils_1.isOverlap(x, y, _this.x, _this.y, backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE, backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
                if (!_this.isHovered) {
                    canvas_1.Canvas.context.beginPath();
                    canvas_1.Canvas.context.arc(_this.x + _this.radius, _this.y + _this.radius, _this.radius, 0, 2 * Math.PI, false);
                    canvas_1.Canvas.context.fillStyle = 'rgba(255, 0, 0, 0.6)';
                    canvas_1.Canvas.context.fill();
                    _this.isHovered = true;
                }
            }
            else {
                if (_this.isHovered) {
                    _this.draw();
                }
                _this.isHovered = false;
            }
        };
        this.mouseClickHandler = function (_a) {
            var x = _a.x, y = _a.y;
            if (_this.type !== players_1.Players.currentState || _this.isOffBoard || !players_1.Players.isCurrentOnlinePlayer()) {
                return;
            }
            if (_this.isClicked) {
                backgammonStateManager_1.BackgammonStateManager.notifySelectedCheckerDrop({ x: x, y: y, checker: _this });
                _this.isClicked = false;
                Checker.selectedCheckers[_this.type] = false;
                window.cancelAnimationFrame(Checker.animFrame);
                clearTimeout(Checker.timeout);
                Checker.animFrame = null;
                _this.draw();
            }
            else {
                if (!Checker.selectedCheckers[_this.type] &&
                    backgammonUtils_1.isOverlap(x, y, _this.x, _this.y, backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE, backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE)) {
                    _this.isClicked = true;
                    Checker.selectedCheckers[_this.type] = true;
                    _this.animateSelectedChecker();
                    backgammonStateManager_1.BackgammonStateManager.notifySelectChecker({ x: x, y: y, checker: _this });
                }
            }
        };
        this.animateSelectedChecker = function () {
            var degrees = 0;
            var animatFn = function () {
                _this.draw();
                canvas_1.Canvas.context.save();
                canvas_1.Canvas.context.translate(_this.x + _this.radius, _this.y + _this.radius);
                canvas_1.Canvas.context.rotate(degrees * (Math.PI / 180));
                uiHelper_1.calcPointsCircle(0, 0, _this.radius - 1, 1);
                canvas_1.Canvas.context.rotate(-degrees * (Math.PI / 180));
                canvas_1.Canvas.context.translate((_this.x + _this.radius) * -1, (_this.y + _this.radius) * -1);
                canvas_1.Canvas.context.restore();
                degrees += 20;
                Checker.timeout = setTimeout(function () { return Checker.animFrame = window.requestAnimationFrame(animatFn); }, 100);
            };
            Checker.animFrame = window.requestAnimationFrame(animatFn);
        };
        Checker.checkersCount++;
        this.id = Checker.checkersCount;
        this.checkerSvgImg = new Image();
        this.type = type; // black or white
        this.x = x;
        this.y = y;
        this.currentSpike = currentSpike;
        this.radius = backgammonConstants_1.BACKGAMMON_CONSTANTS.CHECKERS_SIZE / 2;
        this.init();
    }
    Checker.prototype.init = function () {
        this.initPosition();
        this.subscribeToMouseEvents();
    };
    Checker.prototype.setPosition = function (_a) {
        var x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
    };
    Checker.prototype.initPosition = function () {
        var _this = this;
        var svgAsString = uiHelper_1.getCheckerSvg(players_1.Players.playersNamesMap[this.type]);
        var _window = window;
        var DOMURL = _window.URL || _window.webkitURL || _window;
        var svgBlob = new Blob([svgAsString], { type: 'image/svg+xml' });
        var url = DOMURL.createObjectURL(svgBlob);
        this.svgData = { svgBlob: url };
        this.checkerSvgImg.onload = function () {
            _this.draw();
        };
        this.checkerSvgImg.src = url;
    };
    Checker.prototype.draw = function (x, y) {
        var _window = window;
        var DOMURL = _window.URL || _window.webkitURL || _window;
        canvas_1.Canvas.context.drawImage(this.checkerSvgImg, x || this.x, y || this.y);
        DOMURL.revokeObjectURL(this.svgData.url);
    };
    Checker.prototype.getCheckerId = function () {
        return this.id;
    };
    Checker.destroy = function () {
        Checker.checkersCount = 0;
        Checker.selectedCheckers = {};
        window.cancelAnimationFrame(Checker.animFrame);
        clearTimeout(Checker.timeout);
        Checker.animFrame = null;
    };
    Checker.checkersCount = 0;
    Checker.selectedCheckers = {};
    Checker.animFrame = null;
    Checker.timeout = null;
    return Checker;
}());
exports.Checker = Checker;

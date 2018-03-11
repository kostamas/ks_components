"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var canvas_1 = require("./canvas");
var core_1 = require("@angular/core");
var BackgammonStateManager = (function () {
    function BackgammonStateManager() {
    }
    BackgammonStateManager_1 = BackgammonStateManager;
    BackgammonStateManager.init = function (isOnline, localUser) {
        if (isOnline) {
            BackgammonStateManager_1.isOnline = isOnline;
            BackgammonStateManager_1.localUser = localUser;
        }
        BackgammonStateManager_1.mouseMove$ = new Subject_1.Subject();
        BackgammonStateManager_1.mouseClick$ = new Subject_1.Subject();
        BackgammonStateManager_1.redraw$ = new Subject_1.Subject();
        BackgammonStateManager_1.selectedCheckerMove$ = new Subject_1.Subject();
        BackgammonStateManager_1.mouseDrop$ = new Subject_1.Subject();
        BackgammonStateManager_1.selectChecker$ = new Subject_1.Subject();
        BackgammonStateManager_1.skipPlayer$ = new Subject_1.Subject();
        BackgammonStateManager_1.game$ = new Subject_1.Subject();
        BackgammonStateManager_1.rollClick$ = new Subject_1.Subject();
        BackgammonStateManager_1.surrender$ = new Subject_1.Subject();
        BackgammonStateManager_1.subscriptions = [];
        canvas_1.Canvas.canvas.addEventListener('mousemove', BackgammonStateManager_1.mouseMoveHandler);
        canvas_1.Canvas.canvas.addEventListener('click', BackgammonStateManager_1.mouseClickHandler);
    };
    BackgammonStateManager.onMouseMove = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.mouseMove$.subscribe(cb) });
    };
    BackgammonStateManager.onMouseClick = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.mouseClick$.subscribe(cb) });
    };
    BackgammonStateManager.notifyRedraw = function () {
        BackgammonStateManager_1.redraw$.next();
    };
    BackgammonStateManager.onRedraw = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.redraw$.subscribe(cb) });
    };
    BackgammonStateManager.notifySelectedCheckerMove = function (data) {
        BackgammonStateManager_1.selectedCheckerMove$.next(data);
    };
    BackgammonStateManager.onSelectedCheckerMove = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({
            id: id,
            subscription: BackgammonStateManager_1.selectedCheckerMove$.subscribe(cb)
        });
    };
    BackgammonStateManager.notifySelectedCheckerDrop = function (data) {
        BackgammonStateManager_1.mouseDrop$.next(data);
    };
    BackgammonStateManager.onSelectedCheckerDrop = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.mouseDrop$.subscribe(cb) });
    };
    BackgammonStateManager.notifySelectChecker = function (data) {
        BackgammonStateManager_1.selectChecker$.next(data);
    };
    BackgammonStateManager.onSelectChecker = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.selectChecker$.subscribe(cb) });
    };
    BackgammonStateManager.notifySkipPlayer = function () {
        BackgammonStateManager_1.skipPlayer$.next();
    };
    BackgammonStateManager.onSkipPlayer = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.skipPlayer$.subscribe(cb) });
    };
    BackgammonStateManager.notifySurrender = function (player) {
        BackgammonStateManager_1.surrender$.next(player);
    };
    BackgammonStateManager.onSurrender = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.surrender$.subscribe(cb) });
    };
    BackgammonStateManager.notifyRollClick = function () {
        BackgammonStateManager_1.rollClick$.next();
    };
    BackgammonStateManager.onRollClick = function (cb, id) {
        BackgammonStateManager_1.subscriptions.push({ id: id, subscription: BackgammonStateManager_1.rollClick$.subscribe(cb) });
    };
    BackgammonStateManager.removeSubscriptions = function () {
        if (BackgammonStateManager_1.subscriptions) {
            BackgammonStateManager_1.subscriptions.forEach(function (subscriptionData) {
                subscriptionData.subscription.unsubscribe();
            });
        }
        if (canvas_1.Canvas.canvas) {
            canvas_1.Canvas.canvas.removeEventListener('mousemove', BackgammonStateManager_1.mouseMoveHandler);
            canvas_1.Canvas.canvas.removeEventListener('click', BackgammonStateManager_1.mouseClickHandler);
        }
        BackgammonStateManager_1.isOnline = false;
        BackgammonStateManager_1.localUser = null;
        BackgammonStateManager_1.gameState = {};
    };
    BackgammonStateManager.mouseMoveHandler = function ($event) {
        var clientRect = canvas_1.Canvas.canvas.getBoundingClientRect();
        var cords = { x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top };
        if (!BackgammonStateManager_1.isOnline || !BackgammonStateManager_1.gameState
            || !BackgammonStateManager_1.gameState.players) {
            BackgammonStateManager_1.mouseMove$.next(cords);
            return;
        }
        if (BackgammonStateManager_1.gameState.players.black === BackgammonStateManager_1.localUser.name) {
            if (BackgammonStateManager_1.gameState.currentState < 2) {
                BackgammonStateManager_1.mouseMove$.next(cords);
            }
        }
        else {
            if (BackgammonStateManager_1.gameState.currentState > 1) {
                BackgammonStateManager_1.mouseMove$.next(cords);
            }
        }
    };
    BackgammonStateManager.mouseClickHandler = function ($event) {
        var clientRect = canvas_1.Canvas.canvas.getBoundingClientRect();
        var cords = { x: $event.clientX - clientRect.left, y: $event.clientY - clientRect.top };
        if (!BackgammonStateManager_1.isOnline || !BackgammonStateManager_1.gameState
            || !BackgammonStateManager_1.gameState.players) {
            BackgammonStateManager_1.mouseClick$.next(cords);
            return;
        }
        if (BackgammonStateManager_1.gameState.players.black === BackgammonStateManager_1.localUser.name) {
            if (BackgammonStateManager_1.gameState.currentState < 2) {
                BackgammonStateManager_1.mouseClick$.next(cords);
            }
        }
        else {
            if (BackgammonStateManager_1.gameState.currentState > 1) {
                BackgammonStateManager_1.mouseClick$.next(cords);
            }
        }
    };
    BackgammonStateManager = BackgammonStateManager_1 = __decorate([
        core_1.Injectable()
    ], BackgammonStateManager);
    return BackgammonStateManager;
    var BackgammonStateManager_1;
}());
exports.BackgammonStateManager = BackgammonStateManager;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var canvas_1 = require("./canvas");
var backgammonStateManager_1 = require("./backgammonStateManager");
var dirty_required_validator_validator_1 = require("../../shared/vaildators/dirty-required-validator.validator");
var Subject_1 = require("rxjs/Subject");
var BackgammonComponent = (function () {
    function BackgammonComponent(zone, gameController, changeDetector, backgammonDBService, fBuilder, activatedRoute, router, location) {
        var _this = this;
        this.zone = zone;
        this.gameController = gameController;
        this.changeDetector = changeDetector;
        this.backgammonDBService = backgammonDBService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.location = location;
        this.showCanvas = true;
        this.signInError = '';
        this.onlineViewStates = {
            'localGame': 'localGame',
            'onlineGame': 'onlineGame',
            'signIn': 'signIn',
            'register': 'register',
            'onlineMenu': 'onlineMenu'
        };
        this.currentViewState = this.onlineViewStates.localGame;
        this.submitButtonsText = (_a = {},
            _a[this.onlineViewStates.signIn] = 'Sign In',
            _a[this.onlineViewStates.register] = 'Register',
            _a[this.onlineViewStates.onlineGame] = 'Send Request',
            _a);
        this.buttonsNames = {
            'playOnline': 'playOnline',
            'playLocal': 'playLocal',
            'logout': 'logout',
            'menu': 'menu'
        };
        this.displayedButtonsByCurrState = (_b = {},
            _b[this.onlineViewStates.localGame] = [this.buttonsNames.playOnline],
            _b[this.onlineViewStates.onlineGame] = [this.buttonsNames.menu, this.buttonsNames.logout],
            _b[this.onlineViewStates.signIn] = [this.buttonsNames.playLocal],
            _b[this.onlineViewStates.register] = [this.buttonsNames.playLocal],
            _b[this.onlineViewStates.onlineMenu] = [this.buttonsNames.playLocal, this.buttonsNames.logout],
            _b);
        this.formErrorMessagesBuilder = {
            name: { dirtyRequired: 'This is a required field' },
            password: { dirtyRequired: 'This is a required field' }
        };
        this.formErrorMessages = { name: '', password: '' };
        this.onlineMenuHandler = function () {
            if (_this.currentViewState !== _this.onlineViewStates.onlineGame) {
                _this.currentViewState = _this.onlineViewStates.onlineMenu;
            }
            _this.onlinePlayers$ = _this.backgammonDBService.getAllUsers(_this.localUser)
                .takeUntil(_this.logout$)
                .do(function (players) {
                if (_this.selectedPlayer) {
                    var updatedSelectedPlayer = players.filter(function (player) { return player.name === _this.selectedPlayer.name; })[0];
                    if (updatedSelectedPlayer) {
                        _this.selectedPlayer = updatedSelectedPlayer;
                    }
                    else {
                        _this.selectedPlayer = players[0];
                    }
                }
                else {
                    _this.selectedPlayer = players[0];
                }
                if (_this.localUser.gameIds) {
                    _this.openedGames = [];
                    Object.keys(_this.localUser.gameIds).forEach(function (gameId) {
                        var secondPlayer = players.filter(function (player) { return player.gameIds && player.gameIds[gameId]; })[0];
                        if (secondPlayer) {
                            _this.openedGames.push({ gameId: gameId, secondPlayer: secondPlayer });
                        }
                    });
                }
            });
        };
        this.formGroup = fBuilder.group({
            name: [null, dirty_required_validator_validator_1.DirtyRequired],
            password: [null, dirty_required_validator_validator_1.DirtyRequired]
        });
        var _a, _b;
    }
    BackgammonComponent.prototype.ngAfterViewInit = function () {
        this.logout$ = new Subject_1.Subject();
        this.init();
    };
    BackgammonComponent.prototype.init = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.localUser = JSON.parse(localStorage.getItem('backgammonUser'));
            _this.formGroup.statusChanges.subscribe(function (status) {
                Object.keys(_this.formErrorMessages).forEach(function (controlName) { return _this.formErrorMessages[controlName] = ''; });
                if (status === 'INVALID') {
                    _this.formErrorHandler();
                }
            });
            if (params['gameId'] && _this.localUser) {
                var isOnline = true;
                _this.startGame(null, isOnline, params['gameId']);
                _this.changeDetector.detectChanges();
                return;
            }
            if (params['menu']) {
                _this.location.go('backgammon');
                var _a = _this.localUser, name_1 = _a.name, password = _a.password;
                _this.signIn(name_1, password);
                _this.changeDetector.detectChanges();
                return;
            }
            var gameData = _this.backgammonDBService.getLocalGame();
            _this.startGame(gameData);
            _this.changeDetector.detectChanges();
        });
    };
    BackgammonComponent.prototype.startGame = function (gameData, isOnline, gameId) {
        var _this = this;
        this.showCanvas = true;
        backgammonStateManager_1.BackgammonStateManager.removeSubscriptions();
        this.gameController.destroy();
        this.zone.runOutsideAngular(function () {
            canvas_1.Canvas.canvas = _this.canvas.nativeElement;
            canvas_1.Canvas.context = _this.canvas.nativeElement.getContext('2d');
            if (isOnline) {
                _this.currentViewState = _this.onlineViewStates.onlineGame;
                backgammonStateManager_1.BackgammonStateManager.init(isOnline, _this.localUser);
                _this.gameController.init(null, isOnline, gameId);
            }
            else {
                _this.currentViewState = _this.onlineViewStates.localGame;
                backgammonStateManager_1.BackgammonStateManager.init();
                _this.gameController.init(gameData);
            }
        });
    };
    BackgammonComponent.prototype.logOut = function () {
        this.router.navigate(['/backgammon/']);
        localStorage.removeItem('backgammonUser');
        this.clearGame();
        this.logout$.next();
    };
    BackgammonComponent.prototype.goToMenu = function () {
        this.router.navigate(['/backgammon/', { menu: true }]);
        backgammonStateManager_1.BackgammonStateManager.removeSubscriptions();
        this.gameController.destroy();
        this.currentViewState = this.onlineViewStates.onlineMenu;
        this.showCanvas = false;
    };
    BackgammonComponent.prototype.formErrorHandler = function () {
        var _this = this;
        var control, validatorName;
        Object.keys(this.formGroup.controls).forEach(function (controlName) {
            control = _this.formGroup.controls[controlName];
            if (control.errors) {
                validatorName = Object.keys(control.errors)[0];
                _this.formErrorMessages[controlName] = _this.formErrorMessagesBuilder[controlName][validatorName];
            }
        });
    };
    BackgammonComponent.prototype.isDisabled = function () {
        return !this.formGroup.valid || !this.formGroup.value.name || !this.formGroup.value.password;
    };
    BackgammonComponent.prototype.submit = function () {
        if (this.currentViewState === this.onlineViewStates.signIn) {
            this.signIn();
        }
        if (this.currentViewState === this.onlineViewStates.register) {
            this.register();
        }
    };
    BackgammonComponent.prototype.toggleSignInRegister = function () {
        if (this.currentViewState === this.onlineViewStates.register) {
            this.currentViewState = this.onlineViewStates.signIn;
        }
        else {
            this.currentViewState = this.onlineViewStates.register;
        }
    };
    BackgammonComponent.prototype.signIn = function (_name, _password) {
        var _this = this;
        var name = !!_name ? _name : this.formGroup.value.name;
        var password = !!_password ? _password : this.formGroup.value.password;
        this.backgammonDBService.getUser(name, password).subscribe(function (user) {
            if (user) {
                localStorage.removeItem('backgammonUser');
                localStorage.setItem('backgammonUser', JSON.stringify({ name: user.name, password: user.password }));
                _this.localUser = user;
                _this.onlineMenuHandler();
            }
            else {
                _this.signInError = 'error - user does not exists';
                setTimeout(function () { return _this.signInError = ''; }, 2000);
            }
        });
    };
    BackgammonComponent.prototype.register = function () {
        var _this = this;
        var _a = this.formGroup.value, name = _a.name, password = _a.password;
        this.logout$.next();
        this.backgammonDBService.createNewUser(name, password)
            .subscribe(function (err) {
            if (err) {
                alert(err.error || 'something went wrong');
            }
            else {
                _this.signIn();
            }
        });
    };
    BackgammonComponent.prototype.checkIfOpenGameExists = function (selectedPlayer) {
        if (!this.localUser || !this.localUser.gameIds || !selectedPlayer || !selectedPlayer.gameIds) {
            return false;
        }
        return Object.keys(this.localUser.gameIds)
            .filter(function (gameId) { return !!selectedPlayer.gameIds[gameId]; })
            .length > 0;
    };
    BackgammonComponent.prototype.checkIfCanInvite = function (selectedPlayer) {
        return !this.checkIfOpenGameExists(selectedPlayer) &&
            (!selectedPlayer || !selectedPlayer.invitations || (this.localUser &&
                (!selectedPlayer.invitations.sent || !selectedPlayer.invitations.sent[this.localUser.name]) &&
                (!selectedPlayer.invitations.received || !selectedPlayer.invitations.received[this.localUser.name])));
    };
    BackgammonComponent.prototype.sendInvitation = function () {
        this.backgammonDBService.sendInvitation(this.localUser, this.selectedPlayer);
    };
    BackgammonComponent.prototype.acceptInvitation = function (secondPlayerName) {
        var _this = this;
        this.backgammonDBService.createNewGame(this.localUser.name, secondPlayerName)
            .subscribe(function (gameId) {
            _this.router.navigate(['/backgammon/', { gameId: gameId }]);
        });
    };
    BackgammonComponent.prototype.continue = function (playerName) {
        var openedGame = this.openedGames.filter(function (_openedGame) { return _openedGame.secondPlayer.name === playerName; })[0];
        this.router.navigate(['/backgammon/', { gameId: openedGame.gameId }]);
    };
    BackgammonComponent.prototype.displayButtonHandler = function (btnName) {
        return this.displayedButtonsByCurrState[this.currentViewState].indexOf(btnName) > -1;
    };
    BackgammonComponent.prototype.playOnline = function () {
        var localUser = JSON.parse(localStorage.getItem('backgammonUser'));
        if (localUser) {
            this.localUser = localUser;
            this.showCanvas = false;
            this.signIn(localUser.name, localUser.password);
        }
        else {
            this.showCanvas = false;
            this.currentViewState = this.onlineViewStates.signIn;
        }
    };
    BackgammonComponent.prototype.playLocal = function () {
        if (this.currentViewState === this.onlineViewStates.onlineGame) {
            this.gameController.destroy();
            backgammonStateManager_1.BackgammonStateManager.removeSubscriptions();
        }
        this.showCanvas = true;
        this.currentViewState = this.onlineViewStates.localGame;
        this.openedGames = [];
        var gameData = this.backgammonDBService.getLocalGame();
        this.startGame(gameData);
    };
    BackgammonComponent.prototype.clearGame = function () {
        this.localUser = undefined;
        this.openedGames = [];
        this.formGroup.reset();
    };
    BackgammonComponent.prototype.ngOnDestroy = function () {
        backgammonStateManager_1.BackgammonStateManager.removeSubscriptions();
        this.gameController.destroy();
    };
    __decorate([
        core_1.ViewChild('canvas')
    ], BackgammonComponent.prototype, "canvas", void 0);
    BackgammonComponent = __decorate([
        core_1.Component({
            selector: 'app-backgammon',
            templateUrl: './backgammon.component.html',
            styleUrls: ['./backgammon.component.scss']
        })
    ], BackgammonComponent);
    return BackgammonComponent;
}());
exports.BackgammonComponent = BackgammonComponent;

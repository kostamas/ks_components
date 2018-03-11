"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var backgammon_component_1 = require("./backgammon.component");
var gameController_1 = require("./gameController");
var backgammonDB_service_1 = require("../../adapters/backgammon-adapter/backgammonDB.service");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var database_1 = require("angularfire2/database");
var sharedModule_module_1 = require("../../core/sharedModule.module");
var BackgammonModule = (function () {
    function BackgammonModule() {
    }
    BackgammonModule_1 = BackgammonModule;
    BackgammonModule.config = function (backgammonSrv) {
        return {
            ngModule: BackgammonModule_1,
            providers: [{
                    provide: backgammonDB_service_1.BackgammonDBService,
                    useClass: backgammonSrv,
                    deps: [database_1.AngularFireDatabase]
                }]
        };
    };
    BackgammonModule = BackgammonModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_2.FormsModule,
                sharedModule_module_1.SharedModule
            ],
            declarations: [
                backgammon_component_1.BackgammonComponent
            ],
            entryComponents: [],
            exports: [
                backgammon_component_1.BackgammonComponent
            ],
            providers: [gameController_1.GameController]
        })
    ], BackgammonModule);
    return BackgammonModule;
    var BackgammonModule_1;
}());
exports.BackgammonModule = BackgammonModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var keys_pipe_1 = require("../../pipes/keys.pipe");
var ellipsis_pipe_1 = require("../../pipes/ellipsis.pipe");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [
                ellipsis_pipe_1.EllipsisPipe,
                keys_pipe_1.KeysPipe
            ],
            entryComponents: [],
            exports: [
                ellipsis_pipe_1.EllipsisPipe,
                keys_pipe_1.KeysPipe
            ],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;

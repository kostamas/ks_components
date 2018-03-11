"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var common_1 = require("@angular/common");
var window_ref_service_1 = require("../../core/window-ref.service");
var transparent_shape_modal_component_1 = require("./transparent-shape-modal.component");
var transparent_shape_modal_service_1 = require("./transparent-shape-modal.service");
var TransparentShapeModalModule = (function () {
    function TransparentShapeModalModule() {
    }
    TransparentShapeModalModule = __decorate([
        core_1.NgModule({
            imports: [
                dialog_1.MatDialogModule,
                common_1.CommonModule
            ],
            declarations: [
                transparent_shape_modal_component_1.TransparentShapeModalComponent
            ],
            entryComponents: [
                transparent_shape_modal_component_1.TransparentShapeModalComponent
            ],
            exports: [
                transparent_shape_modal_component_1.TransparentShapeModalComponent
            ],
            providers: [
                transparent_shape_modal_service_1.TransparentShapeModalService,
                window_ref_service_1.WindowRef
            ]
        })
    ], TransparentShapeModalModule);
    return TransparentShapeModalModule;
}());
exports.TransparentShapeModalModule = TransparentShapeModalModule;

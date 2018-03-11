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
var window_ref_service_1 = require("../../core/window-ref.service");
var gallery_component_1 = require("./gallery.component");
var GalleryModule = (function () {
    function GalleryModule() {
    }
    GalleryModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                gallery_component_1.GalleryComponent
            ],
            exports: [
                gallery_component_1.GalleryComponent
            ],
            providers: [
                window_ref_service_1.WindowRef
            ]
        })
    ], GalleryModule);
    return GalleryModule;
}());
exports.GalleryModule = GalleryModule;

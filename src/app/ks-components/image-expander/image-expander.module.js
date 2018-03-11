"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var image_expander_directive_1 = require("./image-expander.directive");
var dialog_1 = require("@angular/material/dialog");
var expanded_image_modal_component_1 = require("./expanded-image-modal/expanded-image-modal.component");
var common_1 = require("@angular/common");
var ImageExpanderModule = (function () {
    function ImageExpanderModule() {
    }
    ImageExpanderModule = __decorate([
        core_1.NgModule({
            imports: [
                dialog_1.MatDialogModule,
                common_1.CommonModule
            ],
            declarations: [
                image_expander_directive_1.ImageExpanderDirective,
                expanded_image_modal_component_1.ExpandedImageModalComponent
            ],
            entryComponents: [
                expanded_image_modal_component_1.ExpandedImageModalComponent
            ],
            exports: [
                image_expander_directive_1.ImageExpanderDirective
            ],
            providers: []
        })
    ], ImageExpanderModule);
    return ImageExpanderModule;
}());
exports.ImageExpanderModule = ImageExpanderModule;

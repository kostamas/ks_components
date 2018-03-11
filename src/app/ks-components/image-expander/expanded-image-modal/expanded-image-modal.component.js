"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var ExpandedImageModalComponent = (function () {
    function ExpandedImageModalComponent(data) {
        this.data = data;
    }
    ExpandedImageModalComponent.prototype.ngOnInit = function () {
        if (this.data && this.data.img) {
            this.imgData = {
                src: this.data.img.src,
                width: (this.data.img.style.width || this.data.img.clientWidth) * 2,
                height: (this.data.img.style.height || this.data.img.height) * 2
            };
        }
    };
    ExpandedImageModalComponent = __decorate([
        core_1.Component({
            selector: 'app-expanded-image-modal',
            templateUrl: './expanded-image-modal.component.html',
            styleUrls: ['./expanded-image-modal.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Optional()), __param(0, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], ExpandedImageModalComponent);
    return ExpandedImageModalComponent;
}());
exports.ExpandedImageModalComponent = ExpandedImageModalComponent;

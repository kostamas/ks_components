"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TransparentShapeModalComponent = (function () {
    function TransparentShapeModalComponent() {
        this.backgroundClickHandler = function () { return null; };
        this.shape = 'circle';
    }
    TransparentShapeModalComponent.prototype.ngAfterViewInit = function () {
        this.shapeElement = this.svg.nativeElement.getElementById("t-s-" + this.shape);
        this.setPosition(this.shape, this.shapeElement, this.position.top, this.position.left, this.radius);
    };
    TransparentShapeModalComponent.prototype.setPosition = function (shapeType, shapeElement, top, left, radius) {
        switch (shapeType) {
            case 'circle': {
                this.circlePosition(shapeElement, top, left, radius);
                break;
            }
            case 'square': {
                this.squarePosition(shapeElement, top, left, radius);
                break;
            }
            case 'star': {
                this.starPosition(shapeElement, top, left, radius);
                break;
            }
        }
    };
    TransparentShapeModalComponent.prototype.circlePosition = function (shapeElement, top, left, radius) {
        shapeElement.style.cy = top;
        shapeElement.style.cx = left;
        shapeElement.style.r = radius;
    };
    TransparentShapeModalComponent.prototype.squarePosition = function (shapeElement, top, left, radius) {
        shapeElement.style.y = top;
        shapeElement.style.x = left;
        shapeElement.style.width = radius;
        shapeElement.style.height = radius;
    };
    TransparentShapeModalComponent.prototype.starPosition = function (shapeElement, top, left, radius) {
        var viewBox = (96 / radius) * 96;
        var leftOffset = (100 / (viewBox - 2)) * 100;
        var topOffset = (125 / (viewBox + 13)) * 125;
        shapeElement.setAttribute('viewBox', "0 0 " + viewBox + " " + viewBox);
        shapeElement.setAttribute('x', left - leftOffset);
        shapeElement.setAttribute('y', top - topOffset);
    };
    __decorate([
        core_1.Input()
    ], TransparentShapeModalComponent.prototype, "position", void 0);
    __decorate([
        core_1.Input()
    ], TransparentShapeModalComponent.prototype, "radius", void 0);
    __decorate([
        core_1.Input()
    ], TransparentShapeModalComponent.prototype, "backgroundClickHandler", void 0);
    __decorate([
        core_1.Input()
    ], TransparentShapeModalComponent.prototype, "shape", void 0);
    __decorate([
        core_1.ViewChild('svg')
    ], TransparentShapeModalComponent.prototype, "svg", void 0);
    TransparentShapeModalComponent = __decorate([
        core_1.Component({
            selector: 'app-transparent-shape-modal',
            templateUrl: './transparent-shape-modal.component.html',
            styleUrls: ['./transparent-shape-modal.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], TransparentShapeModalComponent);
    return TransparentShapeModalComponent;
}());
exports.TransparentShapeModalComponent = TransparentShapeModalComponent;

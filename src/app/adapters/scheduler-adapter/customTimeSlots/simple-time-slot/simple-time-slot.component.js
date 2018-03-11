"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SimpleTimeSlotComponent = (function () {
    function SimpleTimeSlotComponent() {
        this.backgroundColor = '#90EC42';
        this.color = 'white';
    }
    SimpleTimeSlotComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], SimpleTimeSlotComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input()
    ], SimpleTimeSlotComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], SimpleTimeSlotComponent.prototype, "backgroundColor", void 0);
    __decorate([
        core_1.Input()
    ], SimpleTimeSlotComponent.prototype, "color", void 0);
    SimpleTimeSlotComponent = __decorate([
        core_1.Component({
            selector: 'app-simple-time-slot',
            templateUrl: './simple-time-slot.html',
            styleUrls: ['./simple-time-slot.component.scss']
        })
    ], SimpleTimeSlotComponent);
    return SimpleTimeSlotComponent;
}());
exports.SimpleTimeSlotComponent = SimpleTimeSlotComponent;

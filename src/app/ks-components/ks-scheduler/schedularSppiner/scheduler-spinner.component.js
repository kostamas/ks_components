"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SchedulerSpinnerComponent = (function () {
    function SchedulerSpinnerComponent() {
    }
    __decorate([
        core_1.Input()
    ], SchedulerSpinnerComponent.prototype, "timeSlotData", void 0);
    SchedulerSpinnerComponent = __decorate([
        core_1.Component({
            selector: 'scheduler-spinner',
            template: "\n      <div class=\"sk-circle\">\n        <div class=\"sk-circle1 sk-child\"></div>\n        <div class=\"sk-circle2 sk-child\"></div>\n        <div class=\"sk-circle3 sk-child\"></div>\n        <div class=\"sk-circle4 sk-child\"></div>\n        <div class=\"sk-circle5 sk-child\"></div>\n        <div class=\"sk-circle6 sk-child\"></div>\n        <div class=\"sk-circle7 sk-child\"></div>\n        <div class=\"sk-circle8 sk-child\"></div>\n        <div class=\"sk-circle9 sk-child\"></div>\n        <div class=\"sk-circle10 sk-child\"></div>\n        <div class=\"sk-circle11 sk-child\"></div>\n        <div class=\"sk-circle12 sk-child\"></div>\n      </div>",
            styleUrls: ['./scheduler-spinner.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], SchedulerSpinnerComponent);
    return SchedulerSpinnerComponent;
}());
exports.SchedulerSpinnerComponent = SchedulerSpinnerComponent;

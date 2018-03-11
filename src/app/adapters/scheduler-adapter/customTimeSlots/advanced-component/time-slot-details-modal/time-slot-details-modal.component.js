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
var core_2 = require("@angular/core");
var material_1 = require("@angular/material");
/**
 * @title Dialog with header, scrollable content and actions
 */
var TimeSlotDetailsModalComponent = (function () {
    function TimeSlotDetailsModalComponent(data) {
        this.data = data;
    }
    TimeSlotDetailsModalComponent.prototype.ngOnInit = function () {
        this.event = this.data.event;
    };
    TimeSlotDetailsModalComponent = __decorate([
        core_1.Component({
            selector: 'time-slot-details-modal',
            styleUrls: ['./time-slot-details-modal.component.scss'],
            templateUrl: './time-slot-details-modal.component.html',
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_2.Inject(material_1.MAT_DIALOG_DATA))
    ], TimeSlotDetailsModalComponent);
    return TimeSlotDetailsModalComponent;
}());
exports.TimeSlotDetailsModalComponent = TimeSlotDetailsModalComponent;

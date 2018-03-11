"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SchedulerHoursPipe = (function () {
    function SchedulerHoursPipe() {
    }
    SchedulerHoursPipe.prototype.transform = function (hour) {
        var result;
        if (hour === 0) {
            result = 12;
        }
        if (0 < hour && hour <= 12) {
            result = hour;
        }
        if (12 < hour && hour < 24) {
            result = (hour % 12);
        }
        result += ((12 <= hour && hour < 24) ? ' PM' : ' AM');
        return result;
    };
    SchedulerHoursPipe = __decorate([
        core_1.Pipe({ name: 'SchedulerHoursPipe' })
    ], SchedulerHoursPipe);
    return SchedulerHoursPipe;
}());
exports.SchedulerHoursPipe = SchedulerHoursPipe;

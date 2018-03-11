"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/observable/of");
require("rxjs/add/operator/delay");
var SchedulerService = (function () {
    function SchedulerService() {
    }
    SchedulerService.prototype.isDateExistByParams = function (obj, year, month, dayInMonth, hour) {
        return (obj[year]
            && obj[year][month]
            && obj[year][month][dayInMonth]
            && obj[year][month][dayInMonth][hour]);
    };
    SchedulerService.prototype.getDateDetails = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var dayOfMonth = date.getDate();
        var hours = date.getHours();
        return { year: year, month: month, dayOfMonth: dayOfMonth, hours: hours };
    };
    SchedulerService = __decorate([
        core_1.Injectable()
    ], SchedulerService);
    return SchedulerService;
}());
exports.SchedulerService = SchedulerService;

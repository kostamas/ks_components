"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var SchedulingMockData = (function () {
    function SchedulingMockData() {
        this.schedules = this.buildMockData('schedules');
        this.availability = this.buildMockData('availability');
    }
    SchedulingMockData.prototype.buildMockData = function (type) {
        var _this = this;
        var obj = {};
        obj[new Date().getFullYear() - 1] = {};
        obj[new Date().getFullYear()] = {};
        obj[new Date().getFullYear() + 1] = {};
        Object.keys(obj).forEach(function (year) {
            obj[year] = {};
            for (var i = 0; i < 12; i++) {
                obj[year][i] = {};
            }
            Object.keys(obj[year]).forEach(function (month) {
                var numOfDays = new Date(+year, +month + 1, 0).getDate();
                obj[year][month] = {};
                for (var day = 1; day <= numOfDays; day++) {
                    if (Math.floor((Math.random() * 2)) || type === 'availability') {
                        obj[year][month][day] = {};
                        for (var hour = 0; hour < 24; hour++) {
                            if (type === 'schedules') {
                                obj[year][month][day][hour] = { data: Math.floor((Math.random() * 2)) ? _this.getRandomText() : '' };
                            }
                            if (type === 'availability') {
                                if ((_this.schedules && _this.schedules[year] && _this.schedules[year][month] &&
                                    _this.schedules[year][month][day] && _this.schedules[year][month][day][hour] && _this.schedules[year][month][day][hour].data)) {
                                    obj[year][month][day][hour] = {
                                        data: {
                                            isAvailable: false,
                                            textToShow: _this.schedules[year][month][day][hour].data
                                        }
                                    };
                                }
                                else {
                                    obj[year][month][day][hour] = { data: { isAvailable: Math.floor((Math.random() * 2)) > 0 } };
                                }
                            }
                        }
                    }
                }
            });
        });
        return obj;
    };
    SchedulingMockData.prototype.getRandomText = function () {
        var text = ['11111', '222222', 'aabbcc', 'hello world', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum ', 'neque quam', 'ipsum purus'];
        return text[Math.floor((Math.random() * 10) + 1)];
    };
    SchedulingMockData.prototype.getEventById = function (id) {
        var eventList = [
            {
                id: 'event1',
                title: 'Event No. 1',
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \n          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \n          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \n          deserunt mollit anim id est laborum.",
                icon: 'star rate'
            },
            {
                id: 'event2',
                title: 'Event No. 2',
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \n          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \n          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \n          deserunt mollit anim id est laborum.",
                icon: 'flight'
            },
        ];
        return Observable_1.Observable.of(eventList.filter(function (event) {
            return event.id === id;
        })[0]).delay(Math.random() * 1000 + 600);
    };
    SchedulingMockData = __decorate([
        core_1.Injectable()
    ], SchedulingMockData);
    return SchedulingMockData;
}());
exports.SchedulingMockData = SchedulingMockData;

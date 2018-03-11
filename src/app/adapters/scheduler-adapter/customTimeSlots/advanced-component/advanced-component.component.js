"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var time_slot_details_modal_component_1 = require("./time-slot-details-modal/time-slot-details-modal.component");
var AdvancedComponentComponent = (function () {
    function AdvancedComponentComponent(dialog, schedulingMockData) {
        var _this = this;
        this.dialog = dialog;
        this.schedulingMockData = schedulingMockData;
        this.detailsHandler = function () {
            _this.event = _this.schedulingMockData.getEventById(_this.eventId);
            _this.dialog.open(time_slot_details_modal_component_1.TimeSlotDetailsModalComponent, {
                height: '550px',
                width: '500px',
                data: { event: _this.event }
            });
        };
    }
    __decorate([
        core_1.Input()
    ], AdvancedComponentComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], AdvancedComponentComponent.prototype, "eventId", void 0);
    AdvancedComponentComponent = __decorate([
        core_1.Component({
            selector: 'app-advanced-component',
            templateUrl: './advanced-component.component.html',
            styleUrls: ['./advanced-component.component.scss']
        })
    ], AdvancedComponentComponent);
    return AdvancedComponentComponent;
}());
exports.AdvancedComponentComponent = AdvancedComponentComponent;

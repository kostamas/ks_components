"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeSlotConstant = (function () {
    function TimeSlotConstant() {
    }
    TimeSlotConstant.TIME_SLOT_VIEWS = {
        EMPTY: 1,
        AVAILABLE_TIME_SLOT_VIEW: 2,
        UNAVAILABLE_TIME_SLOT_VIEW: 3,
        SCHEDULE: 4
    };
    TimeSlotConstant.TIME_SLOTS_TYPES = {
        REGULAR: 1,
        CUSTOM: 2
    };
    TimeSlotConstant.DYNAMIC_DEFAULT_VIEWS = {
        EMPTY: 1,
        UNAVAILABLE: 2
    };
    return TimeSlotConstant;
}());
exports.TimeSlotConstant = TimeSlotConstant;

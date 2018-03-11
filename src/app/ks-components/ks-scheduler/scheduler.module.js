"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var core_2 = require("@ngx-translate/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var scheduler_service_1 = require("./services/scheduler.service");
var timeSlot_constant_1 = require("./constants/timeSlot.constant");
var scheduler_constant_1 = require("./constants/scheduler.constant");
var schedulerHoursPipe_pipe_1 = require("./pipes/schedulerHoursPipe.pipe");
var scheduler_store_service_1 = require("./services/scheduler-store.service");
var scheduler_spinner_component_1 = require("./schedularSppiner/scheduler-spinner.component");
var scheduler_component_1 = require("./scheduler/scheduler.component");
var time_slot_component_1 = require("./time-slot/time-slot.component");
var schedulingMockData_1 = require("../../adapters/scheduler-adapter/schedulingMockData");
var sharedModule_module_1 = require("../../core/sharedModule.module");
var SchedulerModule = (function () {
    function SchedulerModule() {
    }
    SchedulerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                core_2.TranslateModule,
                material_1.MatDatepickerModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatNativeDateModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatIconModule,
                sharedModule_module_1.SharedModule
            ],
            declarations: [
                scheduler_component_1.SchedulerComponent,
                time_slot_component_1.TimeSlotComponent,
                schedulerHoursPipe_pipe_1.SchedulerHoursPipe,
                scheduler_spinner_component_1.SchedulerSpinnerComponent
            ],
            exports: [
                core_2.TranslateModule,
                scheduler_component_1.SchedulerComponent
            ],
            providers: [
                timeSlot_constant_1.TimeSlotConstant,
                scheduler_service_1.SchedulerService,
                scheduler_constant_1.SchedulerConstant,
                scheduler_store_service_1.SchedulerStoreService,
                schedulingMockData_1.SchedulingMockData
            ]
        })
    ], SchedulerModule);
    return SchedulerModule;
}());
exports.SchedulerModule = SchedulerModule;

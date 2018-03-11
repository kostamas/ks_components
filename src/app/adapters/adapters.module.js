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
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var forms_1 = require("@angular/forms");
var schedulingMockData_1 = require("./scheduler-adapter/schedulingMockData");
var scheduler_adapter_component_1 = require("./scheduler-adapter/scheduler-adapter.component");
var simple_time_slot_component_1 = require("./scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component");
var advanced_component_component_1 = require("./scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component");
var time_slot_details_modal_component_1 = require("./scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component");
var chat_adapter_component_1 = require("./chat-adapter/chat-adapter.component");
var chat_mock_1 = require("./chat-adapter/chat-mock");
var chat_service_1 = require("../ks-components/chat/services/chat.service");
var chat_wrapper_component_1 = require("./chat-adapter/chat-wrapper.component");
var image_expander_adapter_component_1 = require("./image-expander-adapter/image-expander-adapter.component");
var backgammon_adapter_component_1 = require("./backgammon-adapter/backgammon-adapter.component");
var gallery_adapter_component_1 = require("./gallery-adapter/gallery-adapter.component");
var transparent_shape_modal_adapter_component_1 = require("./transparent-shape-modal-adapter/transparent-shape-modal-adapter.component");
var backgammonDB_service_1 = require("./backgammon-adapter/backgammonDB.service");
var scheduler_module_1 = require("../ks-components/ks-scheduler/scheduler.module");
var backgammon_module_1 = require("../ks-components/backgammon/backgammon.module");
var chat_module_1 = require("../ks-components/chat/chat.module");
var gallery_module_1 = require("../ks-components/gallery/gallery.module");
var image_expander_module_1 = require("../ks-components/image-expander/image-expander.module");
var transparent_shape_modal_module_1 = require("../ks-components/transparent-shape-modal/transparent-shape-modal.module");
var AdaptersModulesModule = (function () {
    function AdaptersModulesModule() {
    }
    AdaptersModulesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                animations_1.BrowserAnimationsModule,
                material_1.MatDialogModule,
                material_2.MatIconModule,
                material_2.MatProgressBarModule,
                material_2.MatButtonModule,
                material_2.MatSliderModule,
                forms_1.FormsModule,
                scheduler_module_1.SchedulerModule,
                chat_module_1.ChatModule.config(),
                backgammon_module_1.BackgammonModule.config(backgammonDB_service_1.BackgammonDBService),
                gallery_module_1.GalleryModule,
                image_expander_module_1.ImageExpanderModule,
                transparent_shape_modal_module_1.TransparentShapeModalModule
            ],
            declarations: [
                scheduler_adapter_component_1.SchedulerAdapterComponent,
                simple_time_slot_component_1.SimpleTimeSlotComponent,
                advanced_component_component_1.AdvancedComponentComponent,
                time_slot_details_modal_component_1.TimeSlotDetailsModalComponent,
                chat_adapter_component_1.ChatAdapterComponent,
                chat_wrapper_component_1.ChatAdapterWrapperComponent,
                image_expander_adapter_component_1.ImageExpanderAdapterComponent,
                transparent_shape_modal_adapter_component_1.TransparentShapeModalAdapterComponent,
                backgammon_adapter_component_1.BackgammonAdapterComponent,
                gallery_adapter_component_1.GalleryAdapterComponent
            ],
            exports: [],
            entryComponents: [
                simple_time_slot_component_1.SimpleTimeSlotComponent,
                advanced_component_component_1.AdvancedComponentComponent,
                time_slot_details_modal_component_1.TimeSlotDetailsModalComponent
            ],
            providers: [
                schedulingMockData_1.SchedulingMockData,
                {
                    provide: chat_service_1.ChatService,
                    useFactory: chatServiceConfigFn
                }
            ],
        })
    ], AdaptersModulesModule);
    return AdaptersModulesModule;
}());
exports.AdaptersModulesModule = AdaptersModulesModule;
function chatServiceConfigFn() {
    return new chat_service_1.ChatService(chat_mock_1.ChatMock.chatDataHandler());
}
exports.chatServiceConfigFn = chatServiceConfigFn;

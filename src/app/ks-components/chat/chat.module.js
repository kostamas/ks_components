"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chatter_component_1 = require("./chatter/chatter.component");
var chat_participants_component_1 = require("./chat-participants/chat-participants.component");
var chat_pane_component_1 = require("./chat-pane/chat-pane.component");
var chat_message_component_1 = require("./chat-message/chat-message.component");
var chat_component_1 = require("./chat.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var chatData_interface_1 = require("./services/chatData.interface");
var ChatModule = (function () {
    function ChatModule() {
    }
    ChatModule_1 = ChatModule;
    ChatModule.config = function (backgammonSrv) {
        return {
            ngModule: ChatModule_1,
            providers: [{
                    provide: chatData_interface_1.IChatServiceCtor,
                    useClass: backgammonSrv,
                    deps: []
                }]
        };
    };
    ChatModule = ChatModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatIconModule
            ],
            declarations: [
                chat_message_component_1.ChatMessageComponent,
                chat_pane_component_1.ChatPaneComponent,
                chat_participants_component_1.ChatParticipantsComponent,
                chatter_component_1.ChatterComponent,
                chat_component_1.KsChatComponent
            ],
            exports: [
                chat_message_component_1.ChatMessageComponent,
                chat_pane_component_1.ChatPaneComponent,
                chat_participants_component_1.ChatParticipantsComponent,
                chatter_component_1.ChatterComponent,
                chat_component_1.KsChatComponent
            ],
            providers: []
        })
    ], ChatModule);
    return ChatModule;
    var ChatModule_1;
}());
exports.ChatModule = ChatModule;

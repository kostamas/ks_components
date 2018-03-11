"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var chat_component_1 = require("./chat.component");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var chatter_component_1 = require("./chatter/chatter.component");
var chat_participants_component_1 = require("./chat-participants/chat-participants.component");
var chat_pane_component_1 = require("./chat-pane/chat-pane.component");
var chat_message_component_1 = require("./chat-message/chat-message.component");
var chat_service_1 = require("./services/chat.service");
var adapters_module_1 = require("../../adapters/adapters.module");
var chat_store_service_1 = require("./services/chat-store.service");
var http_1 = require("@angular/http");
describe('KsChatComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MatIconModule,
                http_1.HttpModule
            ],
            declarations: [
                chat_component_1.KsChatComponent,
                chat_message_component_1.ChatMessageComponent,
                chat_pane_component_1.ChatPaneComponent,
                chat_participants_component_1.ChatParticipantsComponent,
                chatter_component_1.ChatterComponent
            ],
            providers: [
                chat_store_service_1.ChatStoreService,
                {
                    provide: chat_service_1.ChatService,
                    useFactory: adapters_module_1.chatServiceConfigFn
                }
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(chat_component_1.KsChatComponent);
        component = fixture.componentInstance;
        component.localUser = {
            name: 'MR. Bean',
            id: 'User1',
            chatIds: ['chatId1', 'chatId2', 'chatId3', 'chatId7', 'chatId8']
        };
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ks_chat_constant_1 = require("./ks-chat.constant");
var KsChatComponent = (function () {
    function KsChatComponent(chatService, chatStoreService, matIconRegistry, sanitizer) {
        var _this = this;
        this.chatService = chatService;
        this.chatStoreService = chatStoreService;
        this.matIconRegistry = matIconRegistry;
        this.sanitizer = sanitizer;
        this.MAX_UN_SEEN_MESSAGES = ks_chat_constant_1.MAX_UN_SEEN_MESSAGES;
        this.CHAT_VIEWS = { CHAT_BUTTON_VIEW: 1, CHAT_VIEW: 2 };
        this.numOfUnseenMessages = 0;
        this.actions = {};
        this.chatViewsClassMap = (_a = {},
            _a[this.CHAT_VIEWS.CHAT_VIEW] = 'chat-view',
            _a[this.CHAT_VIEWS.CHAT_BUTTON_VIEW] = 'button-view',
            _a);
        this.generalMessageHandler = function () {
            _this.numOfUnseenMessages++;
        };
        matIconRegistry.addSvgIcon('chat-icon', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/chat-icon.svg'));
        var _a;
    }
    KsChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentChatView = this.CHAT_VIEWS.CHAT_VIEW;
        this.getChatParticipantsSubscription = this.chatService.getChatParticipants(this.localUser.id)
            .map(function (chatParticipants) {
            chatParticipants.map(function (chatter) { return chatter.chat = {}; });
            return chatParticipants;
        })
            .subscribe(function (chatParticipants) {
            _this.chatStoreService.notifyChatParticipants(chatParticipants);
        });
    };
    KsChatComponent.prototype.closeChat = function () {
        var _this = this;
        this.currentChatView = this.CHAT_VIEWS.CHAT_BUTTON_VIEW;
        this.chatStoreService.onGeneralChatMessage(this.generalMessageHandler);
        this.numOfUnseenMessages = 0;
        this.chatParticipants.forEach(function (chatter) {
            _this.numOfUnseenMessages += chatter.numOfUnseenMessages;
        });
    };
    KsChatComponent.prototype.openChat = function () {
        this.currentChatView = this.CHAT_VIEWS.CHAT_VIEW;
        this.chatStoreService.unSubscribe(this.generalMessageHandler);
    };
    KsChatComponent.prototype.onChatParticipants = function (chatParticipants) {
        this.chatParticipants = chatParticipants;
    };
    KsChatComponent.prototype.ngOnDestroy = function () {
        this.chatService.onDestroy();
        this.getChatParticipantsSubscription.unsubscribe();
    };
    __decorate([
        core_1.Input()
    ], KsChatComponent.prototype, "localUser", void 0);
    KsChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.scss']
        })
    ], KsChatComponent);
    return KsChatComponent;
}());
exports.KsChatComponent = KsChatComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChatParticipantsComponent = (function () {
    function ChatParticipantsComponent(chatStoreService, chatService) {
        this.chatStoreService = chatStoreService;
        this.chatService = chatService;
        this.activeChatter = {};
        this.chatParticipants = new core_1.EventEmitter();
    }
    ChatParticipantsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatStoreService.onChatParticipants(function (participants) {
            _this.chattersArray = participants;
            _this.changeCurrentChat(participants[0]);
            _this.chatParticipants.emit(participants);
        });
    };
    ChatParticipantsComponent.prototype.changeCurrentChat = function (chatter) {
        this.activeChatter.isActive = false;
        this.activeChatter = chatter;
        this.activeChatter.isActive = true;
        this.activeChatter.numOfUnseenMessages = 0;
        var chatId = this.chatService.getChatIdByTwoIdsArray(chatter.chatIds, this.localUser.chatIds);
        if (chatId) {
            this.chatStoreService.notifyActiveChatter(chatter);
        }
        else {
            // connect between local user with this chatter
        }
    };
    __decorate([
        core_1.Input()
    ], ChatParticipantsComponent.prototype, "localUser", void 0);
    __decorate([
        core_1.Output()
    ], ChatParticipantsComponent.prototype, "chatParticipants", void 0);
    ChatParticipantsComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-participants',
            templateUrl: './chat-participants.component.html',
            styleUrls: ['./chat-participants.component.scss']
        })
    ], ChatParticipantsComponent);
    return ChatParticipantsComponent;
}());
exports.ChatParticipantsComponent = ChatParticipantsComponent;

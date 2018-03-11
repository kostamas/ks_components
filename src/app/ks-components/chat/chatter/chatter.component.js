"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var chat_constant_1 = require("../chat.constant");
var ChatterComponent = (function () {
    function ChatterComponent(chatService, chatStoreService) {
        var _this = this;
        this.chatService = chatService;
        this.chatStoreService = chatStoreService;
        this.MAX_UN_SEEN_MESSAGES = chat_constant_1.MAX_UN_SEEN_MESSAGES;
        this.onlineIndicatorMap = (_a = {},
            _a['2'] = 'online',
            _a['1'] = 'idle',
            _a['0'] = 'offline',
            _a);
        this.newMessagesHandler = function (_a) {
            var newMessages = _a.newMessages, chatId = _a.chatId;
            _this.chatStoreService.notifyGeneralChatMessage(newMessages);
            newMessages.sort(function (m1, m2) { return m1.timestamp - m2.timestamp; });
            if (_this.chatter.isActive) {
                _this.chatter.chat.lastSeenMessages[_this.localUser.id] = newMessages[newMessages.length - 1];
                _this.chatService.updateLastSeenMessages(_this.chatter.chat.lastSeenMessages, chatId);
                _this.chatter.numOfUnseenMessages = 0;
            }
            else {
                _this.chatter.numOfUnseenMessages++;
            }
            _this.chatter.chat.messages = newMessages;
        };
        var _a;
    }
    ChatterComponent.prototype.ngOnInit = function () {
        this.initChatListeners();
    };
    ChatterComponent.prototype.initChatListeners = function () {
        var _this = this;
        var chatId = this.chatService.getChatIdByTwoIdsArray(this.chatter.chatIds, this.localUser.chatIds);
        if (chatId) {
            this.chatService.getChatById(chatId).subscribe(function (chat) {
                _this.chatter.chat = chat;
                if (!_this.chatter.isActive) {
                    var lastSeenMessage_1 = _this.chatter.chat.lastSeenMessages[_this.localUser.id];
                    var numOfUnseenMessages_1 = 0;
                    _this.chatter.chat.messages.forEach(function (message) {
                        numOfUnseenMessages_1 = lastSeenMessage_1.timestamp < message.timestamp ? numOfUnseenMessages_1 + 1 : numOfUnseenMessages_1;
                    });
                    _this.chatter.numOfUnseenMessages = numOfUnseenMessages_1;
                }
            });
            this.listenToMessages(chatId);
        }
        else {
            //listen to new  chat
        }
    };
    ChatterComponent.prototype.listenToMessages = function (chatId) {
        this.chatService.listenToMessages(chatId, this.localUser.id)
            .subscribe(this.newMessagesHandler);
    };
    __decorate([
        core_1.Input()
    ], ChatterComponent.prototype, "chatter", void 0);
    __decorate([
        core_1.Input()
    ], ChatterComponent.prototype, "localUser", void 0);
    ChatterComponent = __decorate([
        core_1.Component({
            selector: 'app-chatter',
            templateUrl: './chatter.component.html',
            styleUrls: ['./chatter.component.scss']
        })
    ], ChatterComponent);
    return ChatterComponent;
}());
exports.ChatterComponent = ChatterComponent;

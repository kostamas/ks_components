"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChatPaneComponent = (function () {
    function ChatPaneComponent(chatStoreService, chatService) {
        this.chatStoreService = chatStoreService;
        this.chatService = chatService;
        this.actions = {};
    }
    ChatPaneComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatStoreService.onActiveChatter(function (activeChatter) {
            _this.activeChatter = activeChatter;
        });
        this.actions.scrollToBottom = this.scrollToBottom;
    };
    ChatPaneComponent.prototype.keyPressHandler = function ($event) {
        if ($event.keyCode === 13 && this.message.length > 0) {
            $event.preventDefault();
            this.chatService.updateMessages(this.message, this.activeChatter.chat, this.localUser);
            this.message = '';
        }
    };
    ChatPaneComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    ChatPaneComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
        }
    };
    __decorate([
        core_1.Input()
    ], ChatPaneComponent.prototype, "localUser", void 0);
    __decorate([
        core_1.Input()
    ], ChatPaneComponent.prototype, "actions", void 0);
    __decorate([
        core_1.ViewChild('chatScrollBar')
    ], ChatPaneComponent.prototype, "myScrollContainer", void 0);
    ChatPaneComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-pane',
            templateUrl: './chat-pane.component.html',
            styleUrls: ['./chat-pane.component.scss']
        })
    ], ChatPaneComponent);
    return ChatPaneComponent;
}());
exports.ChatPaneComponent = ChatPaneComponent;

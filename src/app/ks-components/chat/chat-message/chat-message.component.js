"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChatMessageComponent = (function () {
    function ChatMessageComponent() {
    }
    ChatMessageComponent.prototype.ngOnInit = function () {
        this.messageStyleClass = this.localUser.id === this.message.userId ? 'myMessage' : 'otherMessage';
    };
    __decorate([
        core_1.Input()
    ], ChatMessageComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input()
    ], ChatMessageComponent.prototype, "localUser", void 0);
    ChatMessageComponent = __decorate([
        core_1.Component({
            selector: 'app-chat-message',
            templateUrl: './chat-message.component.html',
            styleUrls: ['./chat-message.component.scss']
        })
    ], ChatMessageComponent);
    return ChatMessageComponent;
}());
exports.ChatMessageComponent = ChatMessageComponent;

webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/adapters/adapters.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdaptersModulesModule; });
/* unused harmony export chatServiceConfigFn */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_scheduler_module__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/scheduler.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scheduler_adapter_schedulingMockData__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/schedulingMockData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__scheduler_adapter_scheduler_adapter_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scheduler_adapter_customTimeSlots_simple_time_slot_simple_time_slot_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scheduler_adapter_customTimeSlots_advanced_component_advanced_component_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__scheduler_adapter_customTimeSlots_advanced_component_time_slot_details_modal_time_slot_details_modal_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__chat_adapter_chat_adapter_component__ = __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-adapter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ks_components_ks_chat_ks_chat_module__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__chat_adapter_chat_mock__ = __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-mock.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ks_components_ks_chat_services_chat_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__chat_adapter_chat_wrapper_component__ = __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-wrapper.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AdaptersModulesModule = (function () {
    function AdaptersModulesModule() {
    }
    return AdaptersModulesModule;
}());
AdaptersModulesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_scheduler_module__["a" /* SchedulerModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MatDialogModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["f" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["j" /* MatProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_11__ks_components_ks_chat_ks_chat_module__["a" /* KsChat */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__scheduler_adapter_scheduler_adapter_component__["a" /* SchedulerAdapterComponent */],
            __WEBPACK_IMPORTED_MODULE_7__scheduler_adapter_customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
            __WEBPACK_IMPORTED_MODULE_8__scheduler_adapter_customTimeSlots_advanced_component_advanced_component_component__["a" /* AdvancedComponentComponent */],
            __WEBPACK_IMPORTED_MODULE_9__scheduler_adapter_customTimeSlots_advanced_component_time_slot_details_modal_time_slot_details_modal_component__["a" /* TimeSlotDetailsModalComponent */],
            __WEBPACK_IMPORTED_MODULE_10__chat_adapter_chat_adapter_component__["a" /* ChatAdapterComponent */],
            __WEBPACK_IMPORTED_MODULE_14__chat_adapter_chat_wrapper_component__["a" /* ChatAdapterWrapperComponent */]
        ],
        exports: [],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__scheduler_adapter_customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
            __WEBPACK_IMPORTED_MODULE_8__scheduler_adapter_customTimeSlots_advanced_component_advanced_component_component__["a" /* AdvancedComponentComponent */],
            __WEBPACK_IMPORTED_MODULE_9__scheduler_adapter_customTimeSlots_advanced_component_time_slot_details_modal_time_slot_details_modal_component__["a" /* TimeSlotDetailsModalComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__scheduler_adapter_schedulingMockData__["a" /* SchedulingMockData */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_13__ks_components_ks_chat_services_chat_service__["a" /* ChatService */],
                useFactory: chatServiceConfigFn
            }
        ],
    })
], AdaptersModulesModule);

function chatServiceConfigFn() {
    return new __WEBPACK_IMPORTED_MODULE_13__ks_components_ks_chat_services_chat_service__["a" /* ChatService */](__WEBPACK_IMPORTED_MODULE_12__chat_adapter_chat_mock__["a" /* ChatMock */].chatDataHandler());
}
//# sourceMappingURL=adapters.module.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/chat-adapter/chat-adapter.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"chat-adapter-container\">\r\n  <div class=\"ks-chat-wrapper\" *ngFor=\"let localUser of localUsers\">\r\n    <app-chat-adapter-wrapper [localUser]=\"localUser\"></app-chat-adapter-wrapper>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/adapters/chat-adapter/chat-adapter.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".chat-adapter-container {\n  margin: 80px auto;\n  width: 1100px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .chat-adapter-container .ks-chat-wrapper {\n    margin-top: 20px; }\n    .chat-adapter-container .ks-chat-wrapper .ks-chat-container.button-view {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: reverse;\n          -ms-flex-direction: row-reverse;\n              flex-direction: row-reverse;\n      width: 530px;\n      height: 374px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/adapters/chat-adapter/chat-adapter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatAdapterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chat_mock__ = __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-mock.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ChatAdapterComponent = (function () {
    function ChatAdapterComponent() {
        this.localUsers = __WEBPACK_IMPORTED_MODULE_1__chat_mock__["a" /* ChatMock */].mockUsers;
    }
    return ChatAdapterComponent;
}());
ChatAdapterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-chat-adapter',
        template: __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-adapter.component.html"),
        styles: [__webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-adapter.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None
    })
], ChatAdapterComponent);

//# sourceMappingURL=chat-adapter.component.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/chat-adapter/chat-mock.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMock; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatMock = ChatMock_1 = (function () {
    function ChatMock() {
    }
    ChatMock.buildMockChat = function (chatId, users, numOfMessages) {
        var mockChat = {
            id: chatId,
            users: users,
            messages: ChatMock_1.buildChatMessages(numOfMessages, users)
        };
        mockChat.lastSeenMessages = ChatMock_1.buildLastSeenMessages(mockChat);
        return mockChat;
    };
    ChatMock.buildLastSeenMessages = function (mockChat) {
        var lastSeenMessages = {}, randomMessage, lastMessage;
        mockChat.users.forEach(function (userId) {
            randomMessage = mockChat.messages[Math.floor(Math.random() * (mockChat.messages.length - 1))];
            lastMessage = mockChat.messages[mockChat.messages.length - 1];
            lastSeenMessages[userId] = Math.random() > 0.4 ? lastMessage : randomMessage;
        });
        return lastSeenMessages;
    };
    ChatMock.buildChatMessages = function (numOfMessages, users) {
        var messages = [];
        var message;
        for (var i = 0; i < numOfMessages; i++) {
            message = ChatMock_1.mockMessages[Math.floor(Math.random() * 6)];
            messages.push({
                timestamp: new Date().setDate(ChatMock_1.currentDate.getDate() - (numOfMessages) + i),
                text: message,
                userId: users[Math.floor(Math.random() * 2)]
            });
        }
        return messages;
    };
    ChatMock.updateLastSeenMessages = function (lastSeenMessage, chatId) {
        var chat = ChatMock_1.chats.filter(function (chat) { return chat.id === chatId; })[0];
        chat.updateLastSeenMessages = lastSeenMessage;
    };
    ChatMock.chatDataHandler = function () {
        return {
            getChatById: ChatMock_1.getChatById,
            getChatParticipants: ChatMock_1.getChatParticipants,
            updateMessages: ChatMock_1.updateMessages,
            listenToMessages: ChatMock_1.listenToMessages,
            onDestroy: ChatMock_1.onDestroy,
            updateLastSeenMessages: ChatMock_1.updateLastSeenMessages
        };
    };
    return ChatMock;
}());
ChatMock.currentDate = new Date();
ChatMock.messagesSubjectsMap = {};
ChatMock.mockMessages = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt ut labore',
    'et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat. Duis'
];
ChatMock.chats = [
    ChatMock_1.buildMockChat('chatId1', ['User1', 'User2'], 3),
    ChatMock_1.buildMockChat('chatId2', ['User1', 'User3'], 7),
    ChatMock_1.buildMockChat('chatId3', ['User1', 'User4'], 1),
    ChatMock_1.buildMockChat('chatId4', ['User2', 'User3'], 5),
    ChatMock_1.buildMockChat('chatId5', ['User2', 'User4'], 20),
    ChatMock_1.buildMockChat('chatId6', ['User3', 'User4'], 2),
    ChatMock_1.buildMockChat('chatId7', ['User1', 'User2', 'User3', 'User4'], 4),
    ChatMock_1.buildMockChat('chatId8', ['User1', 'User3'], 4),
];
ChatMock.mockUsers = [
    {
        name: 'MR. Bean',
        id: 'User1',
        chatIds: ['chatId1', 'chatId2', 'chatId3', 'chatId7', 'chatId8']
    },
    {
        name: 'Charlie Chaplin',
        id: 'User2',
        chatIds: ['chatId1', 'chatId4', 'chatId5', 'chatId7'],
    },
    {
        name: 'Jim Carrey',
        id: 'User3',
        chatIds: ['chatId2', 'chatId4', 'chatId6', 'chatId7', 'chatId8'],
    },
    {
        name: 'van damme',
        id: 'User4',
        chatIds: ['chatId6', 'chatId5', 'chatId3', 'chatId7'],
    },
];
ChatMock.chatParticipants = {
    User1: [
        Object.assign({}, ChatMock_1.mockUsers[1]),
        Object.assign({}, ChatMock_1.mockUsers[2]),
        {
            name: 'Chat Group 1',
            id: 'Chat Group 1',
            chatIds: ['chatId7']
        },
        {
            name: 'Chat Group 2',
            id: 'Chat Group 2',
            chatIds: ['chatId8']
        }
    ],
    User2: [
        Object.assign({}, ChatMock_1.mockUsers[0]),
        Object.assign({}, ChatMock_1.mockUsers[2]),
        Object.assign({}, ChatMock_1.mockUsers[3]),
        {
            name: 'Chat Group 1',
            id: 'Chat Group 1',
            chatIds: ['chatId7']
        }
    ],
    User3: [
        Object.assign({}, ChatMock_1.mockUsers[0]),
        Object.assign({}, ChatMock_1.mockUsers[1]),
        Object.assign({}, ChatMock_1.mockUsers[3]),
        {
            name: 'Chat Group 1',
            id: 'Chat Group 1',
            chatIds: ['chatId7']
        }, {
            name: 'Chat Group 2',
            id: 'Chat Group 2',
            chatIds: ['chatId8']
        }
    ],
    User4: [
        Object.assign({}, ChatMock_1.mockUsers[1]),
        Object.assign({}, ChatMock_1.mockUsers[2]),
        {
            name: 'Chat Group 1',
            id: 'Chat Group 1',
            chatIds: ['chatId7']
        }
    ]
};
// *************************** chatDataHandler **********************************/
ChatMock.getChatById = function (chatId) {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(ChatMock_1.chats.filter(function (chat) { return chat.id === chatId; })[0]);
};
ChatMock.getChatParticipants = function (userId) {
    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(ChatMock_1.chatParticipants[userId]);
};
ChatMock.updateMessages = function (newMessage, chat, localUser) {
    var chatToUpdate = ChatMock_1.chats.filter(function (_chat) { return _chat.id === chat.id; })[0];
    var chatToUpdateIndex = ChatMock_1.chats.indexOf(chatToUpdate);
    chatToUpdate = Object.assign({}, chatToUpdate);
    ChatMock_1.chats.splice(chatToUpdateIndex, 1, chatToUpdate);
    chatToUpdate.messages = chatToUpdate.messages.concat([{
            timestamp: Date.now(),
            text: newMessage,
            userId: localUser.id
        }]);
    chat.users.forEach(function (userId) {
        ChatMock_1.messagesSubjectsMap[userId + "_" + chatToUpdate.id].next({
            newMessages: chatToUpdate.messages,
            chatId: chatToUpdate.id
        });
    });
};
ChatMock.listenToMessages = function (chatId, userId) {
    var chatterChatKey = userId + "_" + chatId;
    if (!ChatMock_1.messagesSubjectsMap[chatterChatKey]) {
        ChatMock_1.messagesSubjectsMap[chatterChatKey] = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        return ChatMock_1.messagesSubjectsMap[chatterChatKey];
    }
};
ChatMock.onDestroy = function () {
    ChatMock_1.messagesSubjectsMap = {};
};
ChatMock = ChatMock_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], ChatMock);

var ChatMock_1;
//# sourceMappingURL=chat-mock.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/chat-adapter/chat-wrapper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatAdapterWrapperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_chat_services_chat_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_mock__ = __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-mock.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatAdapterWrapperComponent = (function () {
    function ChatAdapterWrapperComponent(chatStoreService) {
        this.chatStoreService = chatStoreService;
        this.chatParticipants = __WEBPACK_IMPORTED_MODULE_2__chat_mock__["a" /* ChatMock */].mockUsers;
    }
    ChatAdapterWrapperComponent.prototype.ngOnInit = function () {
        // this.chatStoreService.notifyActiveChatter(undefined);
    };
    return ChatAdapterWrapperComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatAdapterWrapperComponent.prototype, "localUser", void 0);
ChatAdapterWrapperComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-chat-adapter-wrapper',
        template: "\n    <app-ks-chat [localUser]=\"localUser\"></app-ks-chat>",
        styles: [__webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-adapter.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__ks_components_ks_chat_services_chat_store_service__["a" /* ChatStoreService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_chat_services_chat_store_service__["a" /* ChatStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_chat_services_chat_store_service__["a" /* ChatStoreService */]) === "function" && _a || Object])
], ChatAdapterWrapperComponent);

var _a;
//# sourceMappingURL=chat-wrapper.component.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"advanced-component-container\">\r\n  <div class=\"title\">{{title}}</div>\r\n\r\n  <div class=\"details-btn\" (click)=\"detailsHandler()\">Details</div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.advanced-component-container {\n  position: absolute;\n  top: 0;\n  width: 118px;\n  height: 48px;\n  background: #ECE9E6;\n  /* fallback for old browsers */\n  background: linear-gradient(to left, #FFFFFF, #ECE9E6); }\n  .advanced-component-container .title {\n    font-size: 16px;\n    color: #688ae4;\n    font-family: Lato;\n    width: 85px;\n    margin: 0 8px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden; }\n  .advanced-component-container .details-btn {\n    font-size: 13px;\n    color: #ffffff;\n    font-family: Lato;\n    width: 48px;\n    height: 17px;\n    margin-left: 8px;\n    margin-top: 7px;\n    border: 1px solid #acacac;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    background-color: #08D822;\n    border-radius: 5px;\n    cursor: pointer; }\n    .advanced-component-container .details-btn:hover {\n      color: #dfdfdf; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancedComponentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__time_slot_details_modal_time_slot_details_modal_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schedulingMockData__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/schedulingMockData.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdvancedComponentComponent = (function () {
    function AdvancedComponentComponent(dialog, schedulingMockData) {
        var _this = this;
        this.dialog = dialog;
        this.schedulingMockData = schedulingMockData;
        this.detailsHandler = function () {
            _this.event = _this.schedulingMockData.getEventById(_this.eventId);
            _this.dialog.open(__WEBPACK_IMPORTED_MODULE_1__time_slot_details_modal_time_slot_details_modal_component__["a" /* TimeSlotDetailsModalComponent */], {
                height: '550px',
                width: '500px',
                data: { event: _this.event }
            });
        };
    }
    return AdvancedComponentComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], AdvancedComponentComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], AdvancedComponentComponent.prototype, "eventId", void 0);
AdvancedComponentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-advanced-component',
        template: __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.html"),
        styles: [__webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatDialog */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__schedulingMockData__["a" /* SchedulingMockData */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__schedulingMockData__["a" /* SchedulingMockData */]) === "function" && _b || Object])
], AdvancedComponentComponent);

var _a, _b;
//# sourceMappingURL=advanced-component.component.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"time-slot-details-modal-container\">\r\n\r\n  <div class=\"details-tooltip\">\r\n    <div *ngIf=\"event | async; let event; else loading\">\r\n      <h2>{{event.title}}</h2>\r\n      <div class=\"description\">\r\n        <span class=\"desc-style\">description: </span> {{event.description}}</div>\r\n      <div class=\"icon-wrapper\">\r\n      <mat-icon >{{event.icon}}</mat-icon>\r\n    </div>\r\n    </div>\r\n\r\n    <ng-template #loading>\r\n      <div class=\"\">Loading Event Data...</div><br/>\r\n      <mat-progress-bar mode=\"indeterminate\"></mat-progress-bar>\r\n    </ng-template>\r\n\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.time-slot-details-modal-container .details-tooltip .description {\n  font-size: 16px;\n  color: #757a83;\n  font-family: Lato; }\n  .time-slot-details-modal-container .details-tooltip .description .desc-style {\n    font-size: 18px;\n    color: #6195ED;\n    font-family: Lato; }\n\n.time-slot-details-modal-container .details-tooltip .icon-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 400px; }\n  .time-slot-details-modal-container .details-tooltip .icon-wrapper .mat-icon {\n    font-size: 50px;\n    margin-top: 30px;\n    width: 50px;\n    height: 50px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeSlotDetailsModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/**
 * @title Dialog with header, scrollable content and actions
 */
var TimeSlotDetailsModalComponent = (function () {
    function TimeSlotDetailsModalComponent(data) {
        this.data = data;
    }
    TimeSlotDetailsModalComponent.prototype.ngOnInit = function () {
        this.event = this.data.event;
    };
    return TimeSlotDetailsModalComponent;
}());
TimeSlotDetailsModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'time-slot-details-modal',
        styles: [__webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.scss")],
        template: __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component.html"),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
    __metadata("design:paramtypes", [Object])
], TimeSlotDetailsModalComponent);

//# sourceMappingURL=time-slot-details-modal.component.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.simple-time-slot-container {\n  position: absolute;\n  top: 0;\n  width: 118px;\n  height: 48px; }\n  .simple-time-slot-container .title {\n    font-size: 16px;\n    color: #ffffff;\n    font-family: Lato;\n    line-height: 14px;\n    margin: 8px;\n    width: 85px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden; }\n  .simple-time-slot-container .date {\n    font-size: 12px;\n    color: #ffffff;\n    font-family: Lato;\n    margin-left: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimpleTimeSlotComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SimpleTimeSlotComponent = (function () {
    function SimpleTimeSlotComponent() {
        this.backgroundColor = '#90EC42';
        this.color = 'white';
    }
    SimpleTimeSlotComponent.prototype.ngOnInit = function () {
    };
    return SimpleTimeSlotComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], SimpleTimeSlotComponent.prototype, "date", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], SimpleTimeSlotComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], SimpleTimeSlotComponent.prototype, "backgroundColor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], SimpleTimeSlotComponent.prototype, "color", void 0);
SimpleTimeSlotComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-simple-time-slot',
        template: __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.html"),
        styles: [__webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], SimpleTimeSlotComponent);

//# sourceMappingURL=simple-time-slot.component.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"simple-time-slot-container\" [ngStyle]=\"{'background-color':backgroundColor}\">\r\n  <div class=\"title\" [ngStyle]=\"{'color':color}\">{{title}}</div>\r\n  <div class=\"date\" [ngStyle]=\"{'color':color}\">{{ date | date:'shortDate'}}</div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"scheduler-adapter-container\">\r\n\r\n  <div class=\"scheduler-operation-pan\">\r\n    <div class=\"show-schedules-btn\" (click)=\"showSchedules();\">Show Schedules</div>\r\n\r\n    <div class=\"items-to-schedule\">\r\n      <div class=\"items-to-schedule-title\">Items To Schedule</div>\r\n      <div class=\"scroll-container scrollbar-style\">\r\n        <div *ngFor=\"let item of itemsToSchedule; let i = index;\">\r\n          <div class=\"item-to-schedule\" [ngClass]=\"{'selectedItem': i === selectedItemIndex}\" (click)=\"onItemClick(i)\">{{item.title}}</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <app-scheduler [schedulerConfig]=\"schedulerConfig\"></app-scheduler>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.scheduler-adapter-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 90px 70px;\n  width: 1700px; }\n  .scheduler-adapter-container .scheduler-operation-pan {\n    padding-top: 50px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .scheduler-adapter-container .scheduler-operation-pan .show-schedules-btn {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      width: 200px;\n      height: 40px;\n      background-color: #688ae4;\n      border: 1px solid #b7b7b7;\n      color: #ffffff;\n      border-radius: 5px;\n      cursor: pointer;\n      transition: 0.3s; }\n      .scheduler-adapter-container .scheduler-operation-pan .show-schedules-btn:hover {\n        background-color: #77A2E9; }\n      .scheduler-adapter-container .scheduler-operation-pan .show-schedules-btn:active {\n        opacity: 0.7; }\n    .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      width: 320px;\n      height: 453px;\n      border: 1px solid #95959C;\n      margin-top: 25px;\n      margin-right: 150px;\n      background-color: #ffffff; }\n      .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule .items-to-schedule-title {\n        font-size: 21px;\n        color: #ffffff;\n        font-family: Lato;\n        background-color: #688ae4;\n        height: 35px;\n        text-align: center;\n        padding-top: 8px; }\n      .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule .scroll-container {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        -ms-flex-pack: distribute;\n            justify-content: space-around;\n        overflow-y: auto;\n        height: 410px;\n        padding-bottom: 10px;\n        background-color: #b3c7fb;\n        box-sizing: border-box; }\n        .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule .scroll-container .item-to-schedule {\n          font-size: 21px;\n          color: #688ae4;\n          font-family: Lato;\n          width: 130px;\n          height: 60px;\n          margin: 30px 0;\n          background-color: #ffffff;\n          color: #688ae4;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.75);\n          cursor: pointer;\n          transition: 0.2s;\n          box-sizing: border-box;\n          position: relative;\n          text-align: center; }\n          .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule .scroll-container .item-to-schedule:hover {\n            background-color: #c2c2c2; }\n          .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule .scroll-container .item-to-schedule:active {\n            opacity: 0.4; }\n          .scheduler-adapter-container .scheduler-operation-pan .items-to-schedule .scroll-container .item-to-schedule.selectedItem {\n            transition: 0.1s;\n            border: 3px solid;\n            -webkit-animation: 0.3s mymove ease infinite;\n                    animation: 0.3s mymove ease infinite;\n            box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.75);\n            background-color: #FFFFB2; }\n  .scheduler-adapter-container .scheduler-component {\n    position: relative; }\n\n@-webkit-keyframes mymove {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    left: 1px; }\n  25% {\n    -webkit-transform: rotate(4deg);\n            transform: rotate(4deg);\n    top: 1px; }\n  50% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    top: 0;\n    left: -1px; }\n  75% {\n    -webkit-transform: rotate(-4deg);\n            transform: rotate(-4deg);\n    top: -1px;\n    left: 0; } }\n\n@keyframes mymove {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    left: 1px; }\n  25% {\n    -webkit-transform: rotate(4deg);\n            transform: rotate(4deg);\n    top: 1px; }\n  50% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n    top: 0;\n    left: -1px; }\n  75% {\n    -webkit-transform: rotate(-4deg);\n            transform: rotate(-4deg);\n    top: -1px;\n    left: 0; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerAdapterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schedulingMockData__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/schedulingMockData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ks_components_ks_scheduler_services_scheduler_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__customTimeSlots_simple_time_slot_simple_time_slot_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ks_components_ks_scheduler_constants_timeSlot_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/constants/timeSlot.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__customTimeSlots_advanced_component_advanced_component_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var regularTimeSlot = __WEBPACK_IMPORTED_MODULE_6__ks_components_ks_scheduler_constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.REGULAR;
var customTimeSlot = __WEBPACK_IMPORTED_MODULE_6__ks_components_ks_scheduler_constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.CUSTOM;
var SchedulerAdapterComponent = (function () {
    function SchedulerAdapterComponent(schedulerStoreService, schedulingMockData, schedulerService) {
        var _this = this;
        this.schedulerStoreService = schedulerStoreService;
        this.schedulingMockData = schedulingMockData;
        this.schedulerService = schedulerService;
        this.itemsToSchedule = [
            { title: 'Item 1', data: 'Item 1', timeSlotType: regularTimeSlot },
            {
                title: 'Dentist',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_5__customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
                inputs: [{ title: 'Dentist' }, { backgroundColor: '#D44444' }]
            },
            {
                title: 'Course',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_5__customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
                inputs: [{ title: 'CS Course' }, { backgroundColor: 'yellow' }, { color: 'black' }]
            },
            {
                title: 'Event (1)',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_7__customTimeSlots_advanced_component_advanced_component_component__["a" /* AdvancedComponentComponent */],
                inputs: [{ title: 'Event 1' }, { eventId: 'event1' }]
            },
            { title: 'Item 2', data: 'Item 2', timeSlotType: regularTimeSlot, classToAdd: 'custom-class-1' },
            {
                title: 'Wedding (NYC)',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_5__customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
                inputs: [{ title: 'Wedding' }, { backgroundColor: '#12bb05' }]
            },
            {
                title: 'Event (2)',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_7__customTimeSlots_advanced_component_advanced_component_component__["a" /* AdvancedComponentComponent */],
                inputs: [{ title: 'Event 2' }, { eventId: 'event2' }]
            },
            { title: 'Item 3', data: 'Item 3', timeSlotType: regularTimeSlot },
            {
                title: 'Work (morning)',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_5__customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
                inputs: [{ title: 'Work' }]
            },
            { title: 'Item 6', data: 'Item 6', timeSlotType: regularTimeSlot, classToAdd: 'custom-class-2' },
            {
                title: 'Work (night)',
                timeSlotType: customTimeSlot,
                component: __WEBPACK_IMPORTED_MODULE_5__customTimeSlots_simple_time_slot_simple_time_slot_component__["a" /* SimpleTimeSlotComponent */],
                inputs: [{ title: 'Work' }, { backgroundColor: '#9239BB' }]
            }
        ];
        this.onItemClick = function (itemIndex) {
            if (_this.selectedItemIndex !== itemIndex) {
                _this.schedulerStoreService.notifyAvailability(__WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].OUT);
                var availabilityHandler_1 = function (availability) {
                    if (availability === __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].IN) {
                        _this.selectedItemIndex = itemIndex;
                    }
                    _this.schedulerStoreService.unSubscribe(availabilityHandler_1);
                };
                _this.schedulerStoreService.onAvailability(availabilityHandler_1);
            }
            else {
                _this.showSchedules();
            }
        };
        this.getAvailability = function (startDate, endDate) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(_this.schedulingMockData.availability)
                .delay(Math.floor(Math.random() * 700));
        };
        this.getSchedules = function (startDate, endDate) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(_this.schedulingMockData.schedules)
                .delay(Math.floor(Math.random() * 700));
        };
        this.scheduleItem = function (_a) {
            var metaData = _a.metaData, data = _a.data;
            var selectedItem = _this.itemsToSchedule[_this.selectedItemIndex];
            _this.itemsToSchedule.splice(_this.selectedItemIndex, 1);
            _this.selectedItemIndex = -1;
            var insertedItem;
            _this.updateDB(metaData.date, { isAvailable: false, textToShow: selectedItem.title }, 'availability');
            if (selectedItem.timeSlotType === __WEBPACK_IMPORTED_MODULE_6__ks_components_ks_scheduler_constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.REGULAR) {
                insertedItem = _this.updateDB(metaData.date, selectedItem.data, 'schedules');
            }
            else {
                var timeSlotData = selectedItem;
                insertedItem = _this.updateDB(metaData.date, timeSlotData, 'schedules');
            }
            _this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
        };
        this.deleteItem = function (_a) {
            var metaData = _a.metaData, timeSlotData = _a.timeSlotData;
            var itemToSchedule;
            if (metaData.timeSlotType === __WEBPACK_IMPORTED_MODULE_6__ks_components_ks_scheduler_constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.CUSTOM) {
                itemToSchedule = timeSlotData.data;
            }
            else {
                itemToSchedule = { title: timeSlotData.data, data: timeSlotData.data, timeSlotType: regularTimeSlot };
            }
            _this.itemsToSchedule.push(itemToSchedule);
            var insertedItem = _this.updateDB(metaData.date, { isAvailable: true }, 'availability');
            _this.updateDB(metaData.date, '', 'schedules');
            _this.schedulerStoreService.notifyUpdateTimeSlot(insertedItem);
        };
        this.showSchedules = function () {
            _this.selectedItemIndex = -1;
            _this.schedulerStoreService.notifySchedules(__WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].OUT);
        };
    }
    SchedulerAdapterComponent.prototype.ngOnInit = function () {
        this.schedulerConfig = {
            getAvailability: this.getAvailability,
            getSchedules: this.getSchedules,
            scheduleItem: this.scheduleItem,
            deleteItem: this.deleteItem
        };
    };
    SchedulerAdapterComponent.prototype.updateDB = function (date, data, collection) {
        var dateDetails = this.schedulerService.getDateDetails(date);
        if (!this.schedulingMockData[collection][dateDetails.year][dateDetails.month]) {
            this.schedulingMockData[collection][dateDetails.year][dateDetails.month] = {};
        }
        if (!this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth]) {
            this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth] = {};
            for (var i = 0; i < 24; i++) {
                this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth][i] = {};
            }
        }
        this.schedulingMockData[collection][dateDetails.year][dateDetails.month][dateDetails.dayOfMonth][dateDetails.hours].data = data;
        return _a = {},
            _a[dateDetails.year] = (_b = {}, _b[dateDetails.month] = (_c = {}, _c[dateDetails.dayOfMonth] = (_d = {}, _d[dateDetails.hours] = { data: data }, _d), _c), _b),
            _a;
        var _a, _b, _c, _d;
    };
    return SchedulerAdapterComponent;
}());
SchedulerAdapterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-scheduler-adapter',
        template: __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.html"),
        styles: [__webpack_require__("../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None,
        providers: [__WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__["b" /* SchedulerStoreService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__["b" /* SchedulerStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ks_components_ks_scheduler_services_scheduler_store_service__["b" /* SchedulerStoreService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__schedulingMockData__["a" /* SchedulingMockData */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__schedulingMockData__["a" /* SchedulingMockData */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ks_components_ks_scheduler_services_scheduler_service__["a" /* SchedulerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ks_components_ks_scheduler_services_scheduler_service__["a" /* SchedulerService */]) === "function" && _c || Object])
], SchedulerAdapterComponent);

var _a, _b, _c;
//# sourceMappingURL=scheduler-adapter.component.js.map

/***/ }),

/***/ "../../../../../src/app/adapters/scheduler-adapter/schedulingMockData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulingMockData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SchedulingMockData = (function () {
    function SchedulingMockData() {
        this.schedules = this.buildMockData('schedules');
        this.availability = this.buildMockData('availability');
    }
    SchedulingMockData.prototype.buildMockData = function (type) {
        var _this = this;
        var obj = {};
        obj[new Date().getFullYear() - 1] = {};
        obj[new Date().getFullYear()] = {};
        obj[new Date().getFullYear() + 1] = {};
        Object.keys(obj).forEach(function (year) {
            obj[year] = {};
            for (var i = 0; i < 12; i++) {
                obj[year][i] = {};
            }
            Object.keys(obj[year]).forEach(function (month) {
                var numOfDays = new Date(+year, +month + 1, 0).getDate();
                obj[year][month] = {};
                for (var day = 1; day <= numOfDays; day++) {
                    if (Math.floor((Math.random() * 2)) || type === 'availability') {
                        obj[year][month][day] = {};
                        for (var hour = 0; hour < 24; hour++) {
                            if (type === 'schedules') {
                                obj[year][month][day][hour] = { data: Math.floor((Math.random() * 2)) ? _this.getRandomText() : '' };
                            }
                            if (type === 'availability') {
                                if ((_this.schedules && _this.schedules[year] && _this.schedules[year][month] &&
                                    _this.schedules[year][month][day] && _this.schedules[year][month][day][hour] && _this.schedules[year][month][day][hour].data)) {
                                    obj[year][month][day][hour] = {
                                        data: {
                                            isAvailable: false,
                                            textToShow: _this.schedules[year][month][day][hour].data
                                        }
                                    };
                                }
                                else {
                                    obj[year][month][day][hour] = { data: { isAvailable: Math.floor((Math.random() * 2)) > 0 } };
                                }
                            }
                        }
                    }
                }
            });
        });
        return obj;
    };
    SchedulingMockData.prototype.getRandomText = function () {
        var text = ['11111', '222222', 'aabbcc', 'hello world', 'Lorem ipsum', 'dolor sit amet', 'aliquam est sapien eros', 'arcu, risus ', 'vestibulum ', 'neque quam', 'ipsum purus'];
        return text[Math.floor((Math.random() * 10) + 1)];
    };
    SchedulingMockData.prototype.getEventById = function (id) {
        var eventList = [
            {
                id: 'event1',
                title: 'Event No. 1',
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \n          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \n          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \n          deserunt mollit anim id est laborum.",
                icon: 'star rate'
            },
            {
                id: 'event2',
                title: 'Event No. 2',
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor \n          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \n          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \n          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia \n          deserunt mollit anim id est laborum.",
                icon: 'flight'
            },
        ];
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(eventList.filter(function (event) {
            return event.id === id;
        })[0]).delay(Math.random() * 1000 + 600);
    };
    return SchedulingMockData;
}());
SchedulingMockData = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SchedulingMockData);

//# sourceMappingURL=schedulingMockData.js.map

/***/ }),

/***/ "../../../../../src/app/app-core/store/ks-store.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KsStore; });
var KsStore = (function () {
    function KsStore() {
        var _this = this;
        this.subscriptions = [];
        this.unSubscribe = function (cb, id) {
            for (var i = 0; i < _this.subscriptions.length; i++) {
                if (id && _this.subscriptions[i].id === id) {
                    _this.removeSubscription(i);
                    break;
                }
                else if (_this.subscriptions[i].cb === cb) {
                    _this.removeSubscription(i);
                    break;
                }
            }
        };
        this.unSubscribeAll = function () {
            _this.subscriptions.forEach(function (subscriptionData) {
                subscriptionData.subscription.unsubscribe();
            });
            _this.subscriptions = [];
        };
    }
    KsStore.prototype.addSubscription = function (subscription, cb, id) {
        this.subscriptions.push({ subscription: subscription, cb: cb, id: id });
    };
    KsStore.prototype.removeSubscription = function (index) {
        this.subscriptions[index].subscription.unsubscribe();
        this.subscriptions.splice(index, 1);
    };
    return KsStore;
}());

//# sourceMappingURL=ks-store.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(translate) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: "\n    <div class=\"home-navigation\" routerLink=\"/home\" [routerLinkActive]=\"['home']\">Home</div>\n    <router-outlet></router-outlet>",
        styles: [".home-navigation {\n    width: 100px;\n    height: 50px;\n    background-color: #22d470;\n    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.75);\n    color: white;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    left: 80px;\n    top: 20px;\n    position: absolute;\n    font-size: 20px;\n  }\n\n  .home-navigation:hover {\n    opacity: 0.8;\n  }\n\n  .home-navigation.home {\n    display: none;\n  }\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__adapters_adapters_module__ = __webpack_require__("../../../../../src/app/adapters/adapters.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ks_components_ks_chat_ks_chat_module__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, '../assets/locale/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_6__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: HttpLoaderFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Http */]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_10__adapters_adapters_module__["a" /* AdaptersModulesModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* Routing */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_11__ks_components_ks_chat_ks_chat_module__["a" /* KsChat */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_not_found_page_not_found_component__ = __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__adapters_scheduler_adapter_scheduler_adapter_component__ = __webpack_require__("../../../../../src/app/adapters/scheduler-adapter/scheduler-adapter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__adapters_chat_adapter_chat_adapter_component__ = __webpack_require__("../../../../../src/app/adapters/chat-adapter/chat-adapter.component.ts");





var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_0__home_home_component__["a" /* HomeComponent */], },
    { path: 'scheduler', component: __WEBPACK_IMPORTED_MODULE_3__adapters_scheduler_adapter_scheduler_adapter_component__["a" /* SchedulerAdapterComponent */] },
    { path: 'chat', component: __WEBPACK_IMPORTED_MODULE_4__adapters_chat_adapter_chat_adapter_component__["a" /* ChatAdapterComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_2__page_not_found_page_not_found_component__["a" /* PageNotFoundComponent */] }
];
var Routing = __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<img class=\"ks-img\" src=\"../../assets/images/kosta.jpg\">\r\n\r\n<div class=\"components-container\">\r\n  <div *ngFor=\"let component of components;\">\r\n    <div class=\"component\" [routerLink]=\"component.link\">{{component.text}}</div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.ks-img {\n  width: 250px;\n  height: 250px;\n  border-radius: 100%;\n  position: fixed;\n  top: 25px;\n  left: 25px; }\n\n.components-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 600px;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  margin: 100px auto; }\n  .components-container .component {\n    font-size: 22px;\n    color: #6195ED;\n    font-family: Lato;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 200px;\n    height: 200px;\n    background-color: white;\n    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.75);\n    margin: 30px;\n    cursor: pointer; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.components = [
            { text: 'Scheduler', link: '/scheduler' },
            { text: 'Chat', link: '/chat' }
        ];
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-message/chat-message.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"chat-message-container\" [ngClass]=\"messageStyleClass\">\r\n  <div class=\"message-wrapper\" >\r\n    <div class=\"message\">\r\n      {{message.text}}\r\n      <div class=\"bottom-triangle\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-message/chat-message.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.chat-message-container .message-wrapper {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400;\n  text-align: center;\n  box-sizing: border-box; }\n  .chat-message-container .message-wrapper .message {\n    max-width: 200px;\n    padding: 10px 10px;\n    border-radius: 15px;\n    word-wrap: break-word;\n    position: relative;\n    display: inline-block; }\n    .chat-message-container .message-wrapper .message .bottom-triangle {\n      width: 0;\n      height: 0;\n      position: absolute;\n      bottom: -7px; }\n  .chat-message-container .message-wrapper .message-date {\n    font-size: 12px;\n    color: #c2c2c2;\n    font-family: Lato;\n    font-weight: 400; }\n\n.chat-message-container.myMessage .message-wrapper .message {\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  background-color: #87ca4d;\n  float: right; }\n  .chat-message-container.myMessage .message-wrapper .message .bottom-triangle {\n    border-top: 12px solid #87ca4d;\n    -webkit-transform: rotate(-25deg);\n            transform: rotate(-25deg);\n    right: 8px;\n    border-left: 8px solid transparent;\n    border-right: 3px solid transparent; }\n\n.chat-message-container.otherMessage .message-wrapper .message {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400;\n  background-color: #ebebeb;\n  float: left; }\n  .chat-message-container.otherMessage .message-wrapper .message .bottom-triangle {\n    border-top: 12px solid #ebebeb;\n    left: 8px;\n    -webkit-transform: rotate(25deg);\n            transform: rotate(25deg);\n    border-left: 3px solid transparent;\n    border-right: 8px solid transparent; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-message/chat-message.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChatMessageComponent = (function () {
    function ChatMessageComponent() {
    }
    ChatMessageComponent.prototype.ngOnInit = function () {
        this.messageStyleClass = this.localUser.id === this.message.userId ? 'myMessage' : 'otherMessage';
    };
    return ChatMessageComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatMessageComponent.prototype, "message", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatMessageComponent.prototype, "localUser", void 0);
ChatMessageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-chat-message',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-message/chat-message.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-message/chat-message.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], ChatMessageComponent);

//# sourceMappingURL=chat-message.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-pane/chat-pane.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"chat-pane-wrapper\">\r\n  <div class=\"chat-pane-header\">\r\n    {{activeChatter.name}}\r\n  </div>\r\n  <div class=\"pane-wrapper\">\r\n    <div class=\"messages-container\">\r\n      <div class=\"messages-wrapper scrollbar-style\" #chatScrollBar>\r\n        <!--orderBy:'time'-->\r\n        <div class=\"message-repeater\" *ngFor=\"let message of activeChatter.chat.messages\">\r\n          <app-chat-message [localUser]=\"localUser\" [message]=\"message\"></app-chat-message>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <textarea (keypress)=\"keyPressHandler($event.keyCode)\" [(ngModel)]=\"message\" class=\"chat-textarea\"></textarea>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-pane/chat-pane.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n:host(app-chat-pane) {\n  width: 100%; }\n\n.chat-pane-wrapper {\n  text-align: center;\n  width: 100%; }\n  .chat-pane-wrapper .chat-pane-header {\n    background-color: #ffffff;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    border-bottom: 1px solid #ebebeb;\n    height: 45px; }\n    .chat-pane-wrapper .chat-pane-header .znk-chat-close-icon {\n      position: absolute;\n      top: 5px;\n      right: 5px;\n      cursor: pointer; }\n      .chat-pane-wrapper .chat-pane-header .znk-chat-close-icon svg line {\n        stroke: #757a83;\n        stroke-width: 6px; }\n    .chat-pane-wrapper .chat-pane-header chatter .chatter-wrapper .chatter-name {\n      font-size: 18px;\n      color: #4f4d4d;\n      font-family: Quicksand;\n      font-weight: 600;\n      height: 26px; }\n  .chat-pane-wrapper .pane-wrapper {\n    background-color: #ffffff; }\n    .chat-pane-wrapper .pane-wrapper .messages-container {\n      padding-right: 5px; }\n      .chat-pane-wrapper .pane-wrapper .messages-container .messages-wrapper {\n        width: 100%;\n        height: 276px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        overflow-y: auto; }\n        .chat-pane-wrapper .pane-wrapper .messages-container .messages-wrapper .message-repeater {\n          margin: 9px;\n          opacity: 1;\n          height: auto; }\n        .chat-pane-wrapper .pane-wrapper .messages-container .messages-wrapper .message-repeater.ng-enter {\n          transition: 0.5s;\n          opacity: 0; }\n        .chat-pane-wrapper .pane-wrapper .messages-container .messages-wrapper .message-repeater.ng-enter-active {\n          opacity: 1; }\n    .chat-pane-wrapper .pane-wrapper textarea {\n      width: 100%;\n      height: 50px;\n      font-size: 14px;\n      color: #4f4d4d;\n      font-family: Lato;\n      font-weight: 400;\n      padding: 5px;\n      border: none;\n      border-top: 1px solid #ebebeb;\n      box-sizing: border-box;\n      resize: none;\n      border-radius: 0 0 10px 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-pane/chat-pane.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPaneComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_chat_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_chat_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatPaneComponent = (function () {
    function ChatPaneComponent(chatStoreService, chatService) {
        this.chatStoreService = chatStoreService;
        this.chatService = chatService;
    }
    ChatPaneComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatStoreService.onActiveChatter(function (activeChatter) {
            _this.activeChatter = activeChatter;
        });
        this.actions.scrollToBottom = this.scrollToBottom;
    };
    ChatPaneComponent.prototype.keyPressHandler = function (keyCode) {
        if (keyCode === 13 && this.message.length > 0) {
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
    return ChatPaneComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatPaneComponent.prototype, "localUser", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatPaneComponent.prototype, "actions", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('chatScrollBar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], ChatPaneComponent.prototype, "myScrollContainer", void 0);
ChatPaneComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-chat-pane',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-pane/chat-pane.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-pane/chat-pane.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_chat_store_service__["a" /* ChatStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_chat_store_service__["a" /* ChatStoreService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */]) === "function" && _c || Object])
], ChatPaneComponent);

var _a, _b, _c;
//# sourceMappingURL=chat-pane.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-participants/chat-participants.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"chat-participants\">\r\n  <div class=\"my-chat-title\">{{localUser.name}}</div>\r\n\r\n  <div class=\"chatter-repeater-wrapper znk-scrollbar\">\r\n    <div class=\"chatter-repeater\"  (click)=\"changeCurrentChat(chatter)\" *ngFor=\"let chatter of chattersArray\">\r\n      <div class=\"chatter-wrapper\" [ngClass]=\"{'active-chatter':chatter === activeChatter}\">\r\n        <app-chatter\r\n          [chatter]=\"chatter\"\r\n          [localUser]=\"localUser\">\r\n        </app-chatter>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-participants/chat-participants.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.chat-participants {\n  width: 200px;\n  height: 372px;\n  padding-top: 15px;\n  box-sizing: border-box;\n  border-radius: 15px 0 0 0;\n  background-color: #f7f7f7;\n  border-right: 3px solid #ebebeb; }\n  .chat-participants .my-chat-title {\n    font-size: 15px;\n    color: #2244F5;\n    font-family: Quicksand;\n    font-weight: 400;\n    text-align: center;\n    margin-bottom: 25px; }\n  .chat-participants .chatter-repeater, .chat-participants .support-chat-wrapper {\n    width: 190px;\n    height: 30px;\n    box-sizing: border-box;\n    cursor: pointer; }\n  .chat-participants .support-chat-wrapper.active-chatter {\n    background-color: #e1e1e1; }\n    .chat-participants .support-chat-wrapper.active-chatter .chatter-wrapper .chatter-name {\n      font-size: 16px;\n      color: #161616;\n      font-family: Lato;\n      font-weight: 400; }\n  .chat-participants .chatter-repeater-wrapper {\n    overflow-y: auto;\n    overflow-x: hidden;\n    height: 265px; }\n    .chat-participants .chatter-repeater-wrapper .chatter-repeater {\n      width: 202px; }\n      .chat-participants .chatter-repeater-wrapper .chatter-repeater .chatter-wrapper {\n        width: 190px;\n        height: 30px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        background-color: transparent;\n        transition: 0.5s;\n        padding-left: 9px; }\n        .chat-participants .chatter-repeater-wrapper .chatter-repeater .chatter-wrapper.active-chatter {\n          background-color: #e1e1e1; }\n          .chat-participants .chatter-repeater-wrapper .chatter-repeater .chatter-wrapper.active-chatter .chatter-wrapper .chatter-name {\n            font-size: 16px;\n            color: #161616;\n            font-family: Lato;\n            font-weight: 400; }\n      .chat-participants .chatter-repeater-wrapper .chatter-repeater:hover {\n        background-color: #dfdfdf; }\n  .chat-participants .chatter-repeater-wrapper.znk-scrollbar ::-webkit-scrollbar, .chat-participants .chatter-repeater-wrapper.znk-scrollbar::-webkit-scrollbar {\n    width: 6px; }\n  .chat-participants .support-chat-wrapper {\n    width: 190px;\n    height: 30px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    background-color: transparent;\n    transition: 0.5s;\n    padding-left: 9px;\n    position: relative;\n    margin-bottom: 7px; }\n    .chat-participants .support-chat-wrapper .chatter-wrapper .chatter-name {\n      width: 137px; }\n    .chat-participants .support-chat-wrapper::after {\n      width: 175px;\n      height: 2px;\n      left: 10px;\n      top: 33px;\n      position: absolute;\n      content: '';\n      background-color: #e1e1e1;\n      margin: 0 auto; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chat-participants/chat-participants.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatParticipantsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_chat_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_chat_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatParticipantsComponent = (function () {
    function ChatParticipantsComponent(chatStoreService, chatService) {
        this.chatStoreService = chatStoreService;
        this.chatService = chatService;
        this.activeChatter = {};
        this.chatParticipants = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    ;
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
    return ChatParticipantsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatParticipantsComponent.prototype, "localUser", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]) === "function" && _a || Object)
], ChatParticipantsComponent.prototype, "chatParticipants", void 0);
ChatParticipantsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-chat-participants',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-participants/chat-participants.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-participants/chat-participants.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_chat_store_service__["a" /* ChatStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_chat_store_service__["a" /* ChatStoreService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */]) === "function" && _c || Object])
], ChatParticipantsComponent);

var _a, _b, _c;
//# sourceMappingURL=chat-participants.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chatter/chatter.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"chatter-wrapper\"\r\n     [ngClass]=\"onlineIndicatorMap[chatter.presence]\">\r\n  <div class=\"online-indicator\"></div>\r\n  <div class=\"chatter-name\">{{chatter.name}}</div>\r\n  <div class=\"message-not-seen\"\r\n       [ngClass]=\"{'ten-or-more-unseen-messages': chatter.numOfUnseenMessages >= MAX_UN_SEEN_MESSAGES}\"\r\n       *ngIf=\"chatter.numOfUnseenMessages > 0\">\r\n    {{chatter.numOfUnseenMessages >= MAX_UN_SEEN_MESSAGES ? '10' : chatter.numOfUnseenMessages}}\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chatter/chatter.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.chatter-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n  .chatter-wrapper .online-indicator {\n    width: 7px;\n    height: 7px;\n    border: 1px solid #757a83;\n    border-radius: 6px;\n    box-sizing: border-box;\n    margin-right: 13px; }\n  .chatter-wrapper.online .online-indicator {\n    background: #87ca4d; }\n  .chatter-wrapper.idle .online-indicator {\n    background: #DBB910; }\n  .chatter-wrapper.offline .chatter-name {\n    font-family: #4f4d4d;\n    border: none; }\n  .chatter-wrapper.offline .online-indicator {\n    background: #B33520; }\n  .chatter-wrapper .chatter-name {\n    font-size: 16px;\n    color: #4f4d4d;\n    font-family: Lato;\n    font-weight: 400;\n    height: 23px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden; }\n  .chatter-wrapper .message-not-seen {\n    width: auto;\n    height: 15px;\n    font-size: 10px;\n    color: #ffffff;\n    font-family: Lato;\n    font-weight: 400;\n    min-width: 15px;\n    padding: 5px;\n    box-sizing: border-box;\n    line-height: 15px;\n    transition: 0.2s;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    color: white;\n    border-radius: 50px;\n    background-color: #E55958;\n    margin-left: 3px; }\n  .chatter-wrapper .message-not-seen.ten-or-more-unseen-messages::after {\n    content: ' +'; }\n  .chatter-wrapper .ten-or-more-unseen-messages {\n    right: -10px; }\n  .chatter-wrapper .message-not-seen.ng-enter,\n  .chatter-wrapper .message-not-seen.ng-leave.ng-leave-active {\n    opacity: 0; }\n  .chatter-wrapper .message-not-seen.ng-leave,\n  .chatter-wrapper .message-not-seen.ng-enter.ng-enter-active {\n    opacity: 1; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/chatter/chatter.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ks_chat_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_chat_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_chat_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat-store.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatterComponent = (function () {
    function ChatterComponent(chatService, chatStoreService) {
        var _this = this;
        this.chatService = chatService;
        this.chatStoreService = chatStoreService;
        this.MAX_UN_SEEN_MESSAGES = __WEBPACK_IMPORTED_MODULE_1__ks_chat_constant__["a" /* MAX_UN_SEEN_MESSAGES */];
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
    return ChatterComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatterComponent.prototype, "chatter", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], ChatterComponent.prototype, "localUser", void 0);
ChatterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-chatter',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-chat/chatter/chatter.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-chat/chatter/chatter.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_chat_store_service__["a" /* ChatStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_chat_store_service__["a" /* ChatStoreService */]) === "function" && _b || Object])
], ChatterComponent);

var _a, _b;
//# sourceMappingURL=chatter.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/ks-chat.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ks-chat-container\" [ngClass]=\"chatViewsClassMap[currentChatView]\">\r\n\r\n  <mat-icon (click)=\"closeChat()\" class=\"clear\">clear</mat-icon>\r\n\r\n  <div [hidden]=\"currentChatView !== CHAT_VIEWS.CHAT_BUTTON_VIEW\">\r\n    <div class=\"chat-button-wrapper\" (click)=\"openChat()\">\r\n      <div class=\"unseen-messages\"\r\n           *ngIf=\"numOfUnseenMessages > 0\"\r\n           [ngClass]=\"{'ten-or-more-unseen-messages': numOfUnseenMessages >=  MAX_UN_SEEN_MESSAGES}\">\r\n        {{numOfUnseenMessages >= MAX_UN_SEEN_MESSAGES ? '10' : numOfUnseenMessages}}\r\n      </div>\r\n      <mat-icon svgIcon=\"chat-icon\" class=\"chat-icon\"></mat-icon>\r\n    </div>\r\n  </div>\r\n\r\n  <div [hidden]=\"currentChatView !== CHAT_VIEWS.CHAT_VIEW\">\r\n    <div class=\"chat-container\">\r\n      <app-chat-participants (chatParticipants)=\"onChatParticipants($event)\"\r\n                             [localUser]=\"localUser\"></app-chat-participants>\r\n      <app-chat-pane [actions]=\"actions\" [localUser]=\"localUser\"></app-chat-pane>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/ks-chat.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.ks-chat-container {\n  position: relative; }\n  .ks-chat-container .mat-icon.clear {\n    font-size: 20px;\n    color: #4f4d4d;\n    position: absolute;\n    right: 2px;\n    top: 3px;\n    cursor: pointer; }\n  .ks-chat-container .chat-button-wrapper {\n    width: 45px;\n    height: 45px;\n    position: relative;\n    cursor: pointer;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border-radius: 35px;\n    background-color: #ebebeb;\n    border: 1px solid #757a83; }\n    .ks-chat-container .chat-button-wrapper .unseen-messages {\n      width: auto;\n      height: 15px;\n      font-size: 12px;\n      color: #ffffff;\n      font-family: Lato;\n      font-weight: 400;\n      transition: 0.5s;\n      min-width: 15px;\n      padding: 5px;\n      box-sizing: border-box;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      border-radius: 50px;\n      position: absolute;\n      top: -1px;\n      right: 1px;\n      background-color: #ff6766; }\n    .ks-chat-container .chat-button-wrapper .unseen-messages.ten-or-more-unseen-messages::after {\n      content: '+'; }\n    .ks-chat-container .chat-button-wrapper .ten-or-more-unseen-messages {\n      right: -10px; }\n    .ks-chat-container .chat-button-wrapper svg path {\n      fill: #757a83; }\n  .ks-chat-container .chat-container {\n    width: 525px;\n    height: 372px;\n    overflow: hidden;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    border-radius: 15px 15px 0 0;\n    border: 1px solid #e1e1e1;\n    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.37); }\n    .ks-chat-container .chat-container .chat-messages-board {\n      width: 200px;\n      height: 275px;\n      border-radius: 15px; }\n\n.ks-chat-container.button-view .mat-icon.clear {\n  display: none; }\n\n.animate-chat .button-wrapper {\n  transition: linear 0.13s; }\n\n.animate-chat .chat-container {\n  width: 525px;\n  height: 372px;\n  transition: linear 0.2s; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/ks-chat.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KsChatComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ks_chat_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_chat_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_chat_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/services/chat-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var KsChatComponent = (function () {
    function KsChatComponent(chatService, chatStoreService, matIconRegistry, sanitizer) {
        var _this = this;
        this.chatService = chatService;
        this.chatStoreService = chatStoreService;
        this.matIconRegistry = matIconRegistry;
        this.sanitizer = sanitizer;
        this.MAX_UN_SEEN_MESSAGES = __WEBPACK_IMPORTED_MODULE_1__ks_chat_constant__["a" /* MAX_UN_SEEN_MESSAGES */];
        this.CHAT_VIEWS = { CHAT_BUTTON_VIEW: 1, CHAT_VIEW: 2 };
        this.numOfUnseenMessages = 0;
        this.actions = {};
        this.chatViewsClassMap = (_a = {},
            _a[this.CHAT_VIEWS.CHAT_VIEW] = 'chat-view',
            _a[this.CHAT_VIEWS.CHAT_BUTTON_VIEW] = 'button-view',
            _a);
        this.generalMessageHandler = function (message) {
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
    return KsChatComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], KsChatComponent.prototype, "localUser", void 0);
KsChatComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-ks-chat',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_chat_service__["a" /* ChatService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_chat_store_service__["a" /* ChatStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_chat_store_service__["a" /* ChatStoreService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["g" /* MatIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["g" /* MatIconRegistry */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _d || Object])
], KsChatComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=ks-chat.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/ks-chat.constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MAX_UN_SEEN_MESSAGES; });
var MAX_UN_SEEN_MESSAGES = 10;
//# sourceMappingURL=ks-chat.constant.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/ks-chat.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KsChat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chatter_chatter_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/chatter/chatter.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_participants_chat_participants_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-participants/chat-participants.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_pane_chat_pane_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-pane/chat-pane.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_message_chat_message_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/chat-message/chat-message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ks_chat_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-chat/ks-chat.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var KsChat = (function () {
    function KsChat() {
    }
    return KsChat;
}());
KsChat = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_6__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_material__["f" /* MatIconModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__chat_message_chat_message_component__["a" /* ChatMessageComponent */],
            __WEBPACK_IMPORTED_MODULE_3__chat_pane_chat_pane_component__["a" /* ChatPaneComponent */],
            __WEBPACK_IMPORTED_MODULE_2__chat_participants_chat_participants_component__["a" /* ChatParticipantsComponent */],
            __WEBPACK_IMPORTED_MODULE_1__chatter_chatter_component__["a" /* ChatterComponent */],
            __WEBPACK_IMPORTED_MODULE_5__ks_chat_component__["a" /* KsChatComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__chat_message_chat_message_component__["a" /* ChatMessageComponent */],
            __WEBPACK_IMPORTED_MODULE_3__chat_pane_chat_pane_component__["a" /* ChatPaneComponent */],
            __WEBPACK_IMPORTED_MODULE_2__chat_participants_chat_participants_component__["a" /* ChatParticipantsComponent */],
            __WEBPACK_IMPORTED_MODULE_1__chatter_chatter_component__["a" /* ChatterComponent */],
            __WEBPACK_IMPORTED_MODULE_5__ks_chat_component__["a" /* KsChatComponent */]
        ],
        providers: []
    })
], KsChat);

//# sourceMappingURL=ks-chat.module.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/services/chat-store.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatStoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__ = __webpack_require__("../../../../rxjs/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_core_store_ks_store_service__ = __webpack_require__("../../../../../src/app/app-core/store/ks-store.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ChatStoreService = (function (_super) {
    __extends(ChatStoreService, _super);
    function ChatStoreService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chatParticipants$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        _this.activeChatter$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        _this.generalChatMessage$ = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        return _this;
    }
    ChatStoreService.prototype.notifyChatParticipants = function (chatParticipants) {
        this.chatParticipants$.next(chatParticipants);
    };
    ChatStoreService.prototype.onChatParticipants = function (cb) {
        var subscription = this.chatParticipants$
            .filter(function (data) { return Array.isArray(data); })
            .subscribe(cb);
        this.addSubscription(subscription, cb);
        return subscription;
    };
    ChatStoreService.prototype.notifyActiveChatter = function (chatter) {
        this.activeChatter$.next(chatter);
    };
    ChatStoreService.prototype.onActiveChatter = function (cb) {
        var subscription = this.activeChatter$.filter(function (data) { return data && data !== null; }).subscribe(cb);
        this.addSubscription(subscription, cb);
        return subscription;
    };
    ChatStoreService.prototype.notifyGeneralChatMessage = function (generalMessage) {
        this.generalChatMessage$.next(generalMessage);
    };
    ChatStoreService.prototype.onGeneralChatMessage = function (cb) {
        var subscription = this.generalChatMessage$.subscribe(cb);
        this.addSubscription(subscription, cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    ChatStoreService.prototype.ngOnDestroy = function () {
        this.unSubscribeAll();
        this.subscriptions = [];
    };
    return ChatStoreService;
}(__WEBPACK_IMPORTED_MODULE_6__app_core_store_ks_store_service__["a" /* KsStore */]));
ChatStoreService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], ChatStoreService);

//# sourceMappingURL=chat-store.service.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-chat/services/chat.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__ = __webpack_require__("../../../../rxjs/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatService = (function () {
    function ChatService(chatDataHandler) {
        this.chatDataHandler = {};
        this.chatDataHandler = chatDataHandler;
    }
    ChatService.prototype.getChatById = function (chatId) {
        return this.chatDataHandler.getChatById(chatId);
    };
    ChatService.prototype.getChatParticipants = function (userId) {
        return this.chatDataHandler.getChatParticipants(userId);
    };
    ChatService.prototype.updateMessages = function (newMessage, chat, localUser) {
        this.chatDataHandler.updateMessages(newMessage, chat, localUser);
    };
    ChatService.prototype.updateLastSeenMessages = function (lastSeenMessage, chatId) {
        this.chatDataHandler.updateLastSeenMessages(lastSeenMessage, chatId);
    };
    ChatService.prototype.getChatIdByTwoIdsArray = function (chatIdsArr1, chatIdsArr2) {
        for (var i = 0; i < chatIdsArr1.length; i++) {
            for (var j = 0; j < chatIdsArr2.length; j++) {
                if (chatIdsArr1[i] === chatIdsArr2[j]) {
                    return chatIdsArr1[i];
                }
            }
        }
    };
    ;
    ChatService.prototype.listenToMessages = function (chatId, userID) {
        return this.chatDataHandler.listenToMessages(chatId, userID);
    };
    ChatService.prototype.onDestroy = function () {
        return this.chatDataHandler.onDestroy();
    };
    return ChatService;
}());
ChatService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [Object])
], ChatService);

//# sourceMappingURL=chat.service.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/constants/scheduler.constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SchedulerConstant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OperationTypes; });
var SchedulerConstant = (function () {
    function SchedulerConstant() {
    }
    return SchedulerConstant;
}());

SchedulerConstant.HOURS_IN_DAYS = 24;
SchedulerConstant.DAYS_IN_WEEK = 7;
var OperationTypes = (function () {
    function OperationTypes() {
    }
    return OperationTypes;
}());

OperationTypes.AVAILABILITY = 1;
OperationTypes.SCHEDULES = 2;
//# sourceMappingURL=scheduler.constant.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/constants/timeSlot.constant.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeSlotConstant; });
var TimeSlotConstant = (function () {
    function TimeSlotConstant() {
    }
    return TimeSlotConstant;
}());

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
//# sourceMappingURL=timeSlot.constant.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/pipes/schedulerHoursPipe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerHoursPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SchedulerHoursPipe = (function () {
    function SchedulerHoursPipe() {
    }
    SchedulerHoursPipe.prototype.transform = function (hour) {
        var result;
        if (hour === 0) {
            result = 12;
        }
        if (0 < hour && hour <= 12) {
            result = hour;
        }
        if (12 < hour && hour < 24) {
            result = (hour % 12);
        }
        result += ((12 <= hour && hour < 24) ? ' PM' : ' AM');
        return result;
    };
    return SchedulerHoursPipe;
}());
SchedulerHoursPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Pipe */])({ name: 'SchedulerHoursPipe' })
], SchedulerHoursPipe);

//# sourceMappingURL=schedulerHoursPipe.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/schedularSppiner/scheduler-spinner.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.scheduler-wrapper.show-spinner {\n  transition: 0.5s;\n  opacity: 0.7; }\n  .scheduler-wrapper.show-spinner:before {\n    content: '';\n    position: absolute;\n    z-index: 2;\n    width: 900px;\n    height: 418px;\n    background-color: #ebebeb;\n    opacity: 0.5;\n    top: 37px;\n    border-radius: 0 0 15px 15px; }\n  .scheduler-wrapper.show-spinner .sk-circle {\n    margin: 100px auto;\n    width: 40px;\n    height: 40px;\n    position: absolute;\n    top: 33%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    z-index: 3; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-child {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-child:before {\n    content: '';\n    display: block;\n    margin: 0 auto;\n    width: 15%;\n    height: 15%;\n    background-color: #333;\n    border-radius: 100%;\n    -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\n    animation: sk-circleBounceDelay 1.2s infinite ease-in-out both; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle2 {\n    -webkit-transform: rotate(30deg);\n    transform: rotate(30deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle3 {\n    -webkit-transform: rotate(60deg);\n    transform: rotate(60deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle4 {\n    -webkit-transform: rotate(90deg);\n    transform: rotate(90deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle5 {\n    -webkit-transform: rotate(120deg);\n    transform: rotate(120deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle6 {\n    -webkit-transform: rotate(150deg);\n    transform: rotate(150deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle7 {\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle8 {\n    -webkit-transform: rotate(210deg);\n    transform: rotate(210deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle9 {\n    -webkit-transform: rotate(240deg);\n    transform: rotate(240deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle10 {\n    -webkit-transform: rotate(270deg);\n    transform: rotate(270deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle11 {\n    -webkit-transform: rotate(300deg);\n    transform: rotate(300deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle12 {\n    -webkit-transform: rotate(330deg);\n    transform: rotate(330deg); }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle2:before {\n    -webkit-animation-delay: -1.1s;\n    animation-delay: -1.1s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle3:before {\n    -webkit-animation-delay: -1s;\n    animation-delay: -1s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle4:before {\n    -webkit-animation-delay: -0.9s;\n    animation-delay: -0.9s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle5:before {\n    -webkit-animation-delay: -0.8s;\n    animation-delay: -0.8s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle6:before {\n    -webkit-animation-delay: -0.7s;\n    animation-delay: -0.7s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle7:before {\n    -webkit-animation-delay: -0.6s;\n    animation-delay: -0.6s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle8:before {\n    -webkit-animation-delay: -0.5s;\n    animation-delay: -0.5s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle9:before {\n    -webkit-animation-delay: -0.4s;\n    animation-delay: -0.4s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle10:before {\n    -webkit-animation-delay: -0.3s;\n    animation-delay: -0.3s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle11:before {\n    -webkit-animation-delay: -0.2s;\n    animation-delay: -0.2s; }\n  .scheduler-wrapper.show-spinner .sk-circle .sk-circle12:before {\n    -webkit-animation-delay: -0.1s;\n    animation-delay: -0.1s; }\n\n@-webkit-keyframes sk-circleBounceDelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes sk-circleBounceDelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0); }\n  40% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/schedularSppiner/scheduler-spinner.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerSpinnerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SchedulerSpinnerComponent = (function () {
    function SchedulerSpinnerComponent() {
    }
    return SchedulerSpinnerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], SchedulerSpinnerComponent.prototype, "timeSlotData", void 0);
SchedulerSpinnerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'scheduler-spinner',
        template: "\n      <div class=\"sk-circle\">\n        <div class=\"sk-circle1 sk-child\"></div>\n        <div class=\"sk-circle2 sk-child\"></div>\n        <div class=\"sk-circle3 sk-child\"></div>\n        <div class=\"sk-circle4 sk-child\"></div>\n        <div class=\"sk-circle5 sk-child\"></div>\n        <div class=\"sk-circle6 sk-child\"></div>\n        <div class=\"sk-circle7 sk-child\"></div>\n        <div class=\"sk-circle8 sk-child\"></div>\n        <div class=\"sk-circle9 sk-child\"></div>\n        <div class=\"sk-circle10 sk-child\"></div>\n        <div class=\"sk-circle11 sk-child\"></div>\n        <div class=\"sk-circle12 sk-child\"></div>\n      </div>",
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-scheduler/schedularSppiner/scheduler-spinner.component.scss")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None
    }),
    __metadata("design:paramtypes", [])
], SchedulerSpinnerComponent);

//# sourceMappingURL=scheduler-spinner.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/scheduler.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_scheduler_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_timeSlot_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/constants/timeSlot.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constants_scheduler_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/constants/scheduler.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_schedulerHoursPipe_pipe__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/pipes/schedulerHoursPipe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pipes_keys_pipe__ = __webpack_require__("../../../../../src/pipes/keys.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_ellipsis_pipe__ = __webpack_require__("../../../../../src/pipes/ellipsis.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_scheduler_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__schedularSppiner_scheduler_spinner_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/schedularSppiner/scheduler-spinner.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__scheduler_scheduler_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/scheduler/scheduler.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__time_slot_time_slot_component__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/time-slot/time-slot.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var SchedulerModule = (function () {
    function SchedulerModule() {
    }
    return SchedulerModule;
}());
SchedulerModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatDatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["e" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["h" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["i" /* MatNativeDateModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["f" /* MatIconModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_13__scheduler_scheduler_component__["a" /* SchedulerComponent */],
            __WEBPACK_IMPORTED_MODULE_14__time_slot_time_slot_component__["a" /* TimeSlotComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pipes_schedulerHoursPipe_pipe__["a" /* SchedulerHoursPipe */],
            __WEBPACK_IMPORTED_MODULE_9__pipes_keys_pipe__["a" /* KeysPipe */],
            __WEBPACK_IMPORTED_MODULE_10__pipes_ellipsis_pipe__["a" /* EllipsisPipe */],
            __WEBPACK_IMPORTED_MODULE_12__schedularSppiner_scheduler_spinner_component__["a" /* SchedulerSpinnerComponent */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_13__scheduler_scheduler_component__["a" /* SchedulerComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__constants_timeSlot_constant__["a" /* TimeSlotConstant */],
            __WEBPACK_IMPORTED_MODULE_5__services_scheduler_service__["a" /* SchedulerService */],
            __WEBPACK_IMPORTED_MODULE_7__constants_scheduler_constant__["b" /* SchedulerConstant */],
            __WEBPACK_IMPORTED_MODULE_11__services_scheduler_store_service__["b" /* SchedulerStoreService */]
        ]
    })
], SchedulerModule);

//# sourceMappingURL=scheduler.module.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/scheduler/scheduler.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"scheduler-component\">\r\n\r\n  <div class=\"scheduler-controls\">\r\n    <div class=\"change-week-section\">\r\n      <div class=\"change-week-title\"> change week</div>\r\n\r\n      <div class=\"change-week-arrows\">\r\n        <div style=\"cursor: pointer;\" (click)=\"changeActiveWeek(-1)\">\r\n          <div class=\"arrow-right\"></div>\r\n        </div>\r\n        <div style=\"cursor: pointer;\" (click)=\"changeActiveWeek(1)\">\r\n          <div class=\"arrow-left\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <span class=\"current-date-title\">{{currentDate | date:'MM/yyyy '}}</span>\r\n\r\n    <mat-form-field>\r\n      <input\r\n        [(ngModel)]=\"mdDate\"\r\n        (dateChange)=\"changeWeekSlidesByDate($event.value)\"\r\n        matInput\r\n        [matDatepicker]=\"picker\"\r\n        placeholder=\"Choose a date\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n  <div class=\"scheduler-wrapper\" [ngClass]=\"{'show-spinner': showSpinner}\">\r\n    <scheduler-spinner></scheduler-spinner>\r\n\r\n    <div class=\"scheduler-header\">\r\n      <div class=\"scheduler-header-column quicksand-14-b\" *ngFor=\"let headerDate of headerDates; let i = index;\">\r\n        {{headerDates[i] | date:'EEE d' }}\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"scheduler-content\">\r\n      <div class=\"scheduler-cells-wrapper scrollbar-style\">\r\n        <div class=\"scheduler-container-flex\">\r\n          <div\r\n            *ngFor=\"let weekName of schedulerWeeks\"\r\n            class=\"scheduler-weeks-container\"\r\n            [ngStyle]=\"weeksStyles[weekName]\"\r\n            [ngClass]=\"weekName\">\r\n            <div class=\"scheduler-hours-wrapper\">\r\n              <div class=\"scheduler-hours\">\r\n                <div class=\"hour lato-12-n\" *ngFor=\"let hour  of hours;\">{{(hour) | SchedulerHoursPipe}}</div>\r\n              </div>\r\n            </div>\r\n\r\n            <div *ngFor=\"let b  of schedulerColumns; let column = index;\">\r\n              <div *ngFor=\"let a of schedulerRows; let row = index;\">\r\n                <app-time-slot\r\n                  [timeSlotData]=\"timeSlotData[weekName][column][hours[row]]\">\r\n                </app-time-slot>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"scheduler-footer\"></div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/scheduler/scheduler.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.scheduler-component {\n  width: 1200px;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  padding-top: 60px;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  .scheduler-component .scheduler-controls {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    width: 900px; }\n    .scheduler-component .scheduler-controls .change-week-section {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      margin-right: 10px;\n      width: 260px; }\n      .scheduler-component .scheduler-controls .change-week-section .change-week-title {\n        font-size: 23px;\n        color: #6a6f95;\n        font-family: Lato;\n        font-weight: 400; }\n      .scheduler-component .scheduler-controls .change-week-section .change-week-arrows {\n        position: relative;\n        width: 30px;\n        height: 30px;\n        bottom: 4px; }\n        .scheduler-component .scheduler-controls .change-week-section .change-week-arrows .arrow-right, .scheduler-component .scheduler-controls .change-week-section .change-week-arrows .arrow-left {\n          cursor: pointer;\n          position: absolute; }\n        .scheduler-component .scheduler-controls .change-week-section .change-week-arrows .arrow-left {\n          left: 20px; }\n        .scheduler-component .scheduler-controls .change-week-section .change-week-arrows .arrow-right {\n          left: 60px; }\n    .scheduler-component .scheduler-controls .current-date-title {\n      font-size: 27px;\n      color: #6a6f95;\n      font-family: Lato;\n      font-weight: 400; }\n    .scheduler-component .scheduler-controls .mat-input-container {\n      margin-left: 50px;\n      bottom: 13px; }\n  .scheduler-component .scheduler-wrapper {\n    position: relative;\n    width: 900px;\n    height: 578px;\n    overflow: hidden; }\n    .scheduler-component .scheduler-wrapper .buttons-and-filters-wrapper {\n      height: 50px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: reverse;\n          -ms-flex-direction: row-reverse;\n              flex-direction: row-reverse; }\n      .scheduler-component .scheduler-wrapper .buttons-and-filters-wrapper .scheduler_cancel-btn {\n        background-color: #fbfafb;\n        color: #80cdd6;\n        border: 1px solid #80cdd6;\n        margin-left: 8px; }\n        .scheduler-component .scheduler-wrapper .buttons-and-filters-wrapper .scheduler_cancel-btn:hover {\n          opacity: 0.5;\n          color: #0a9bad; }\n    .scheduler-component .scheduler-wrapper .scheduler-header {\n      background-color: #688ae4;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      width: 900px;\n      height: 38px;\n      padding-left: 45px;\n      box-sizing: border-box;\n      border-radius: 10px 10px 0 0; }\n      .scheduler-component .scheduler-wrapper .scheduler-header .scheduler-header-column {\n        -webkit-box-flex: 0;\n            -ms-flex-positive: 0;\n                flex-grow: 0;\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n        width: 120px;\n        height: 30px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        color: white; }\n    .scheduler-component .scheduler-wrapper .scheduler-content {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      width: calc(3 * 886px);\n      height: 400px;\n      background-color: #ffffff; }\n      .scheduler-component .scheduler-wrapper .scheduler-content .scheduler-hours-wrapper .scheduler-hours {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        border-bottom: 1px solid #dfdfdf;\n        box-sizing: border-box;\n        background-color: white; }\n        .scheduler-component .scheduler-wrapper .scheduler-content .scheduler-hours-wrapper .scheduler-hours .hour {\n          padding-top: 2px;\n          height: 47.95px;\n          width: 45px;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          color: #acacac;\n          -webkit-box-flex: 1;\n              -ms-flex: 1;\n                  flex: 1;\n          border-left: 1px solid #f7f7f7; }\n      .scheduler-component .scheduler-wrapper .scheduler-content .scheduler-cells-wrapper {\n        overflow-x: hidden;\n        overflow-y: scroll;\n        width: 900px;\n        padding-bottom: 50px; }\n        .scheduler-component .scheduler-wrapper .scheduler-content .scheduler-cells-wrapper .scheduler-container-flex {\n          width: 5000px;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          position: relative; }\n          .scheduler-component .scheduler-wrapper .scheduler-content .scheduler-cells-wrapper .scheduler-container-flex .scheduler-weeks-container {\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            padding-bottom: 40px;\n            position: absolute;\n            -webkit-transform: translate3d(0, 0, 0);\n                    transform: translate3d(0, 0, 0);\n            width: 900px; }\n    .scheduler-component .scheduler-wrapper .scheduler-footer {\n      background-color: #f7f7f7;\n      border-radius: 0 0 15px 15px;\n      width: 900px;\n      height: 18px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/scheduler/scheduler.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/constants/timeSlot.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/constants/scheduler.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_scheduler_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler-store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_combineLatest__ = __webpack_require__("../../../../rxjs/add/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_combineLatest__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SchedulerComponent = (function () {
    function SchedulerComponent(schedulerService, schedulerStoreService) {
        var _this = this;
        this.schedulerService = schedulerService;
        this.schedulerStoreService = schedulerStoreService;
        this.DYNAMIC_DEFAULT_VIEWS = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].DYNAMIC_DEFAULT_VIEWS;
        this.currentOperationId = __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].SCHEDULES;
        this.showSpinner = false;
        this.startHour = 8;
        this.headerDates = [];
        this.hours = [];
        this.timeSlotData = {};
        this.dynamicDefaultView = { timeSlotClass: '' };
        this.dynamicDefaultViewsMap = (_a = {},
            _a[__WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].DYNAMIC_DEFAULT_VIEWS.EMPTY] = 'empty-slot',
            _a[__WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE] = 'unavailable-slot',
            _a);
        this.schedulerRows = new Array(__WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].HOURS_IN_DAYS);
        this.schedulerColumns = new Array(__WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
        this.schedulerWeeks = ['week_slide_0', 'week_slide_1', 'week_slide_2'];
        this.weeksStyles = {
            week_slide_0: { left: '-900px', transition: '1sec' },
            week_slide_1: { left: '0px', transition: '1sec' },
            week_slide_2: { left: '900px', transition: '1sec' }
        };
        this.availabilityHandler = function (startDate, endDate, startWeekSlide, availabilityStoreType) {
            _this.currentOperationId = __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].AVAILABILITY;
            _this.dynamicDefaultView.timeSlotClass = _this.dynamicDefaultViewsMap[__WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].DYNAMIC_DEFAULT_VIEWS.UNAVAILABLE];
            if (availabilityStoreType === __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].OUT) {
                _this.showSpinner = true;
                var subscription_1 = _this.schedulerConfig.getAvailability(startDate, endDate)
                    .switchMap(function (data) {
                    if (typeof startWeekSlide === 'function') {
                        startWeekSlide = startWeekSlide.apply(_this);
                    }
                    return _this.updateTimeSlotsWithData(data, startDate, endDate, startWeekSlide, __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].AVAILABILITY);
                })
                    .subscribe(function () {
                    _this.schedulerStoreService.notifyAvailability(__WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].IN);
                    _this.showSpinner = false;
                    subscription_1.unsubscribe();
                });
            }
        };
        this.schedulesHandler = function (startDate, endDate, startWeekSlide) {
            _this.showSpinner = true;
            _this.currentOperationId = __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].SCHEDULES;
            _this.dynamicDefaultView.timeSlotClass = _this.dynamicDefaultViewsMap[__WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].DYNAMIC_DEFAULT_VIEWS.EMPTY];
            var subscription = _this.schedulerConfig.getSchedules(startDate, endDate).subscribe(function (schedules) {
                if (typeof startWeekSlide === 'function') {
                    startWeekSlide = startWeekSlide.apply(_this);
                }
                _this.updateTimeSlotsWithData(schedules, startDate, endDate, startWeekSlide, __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].SCHEDULES);
                subscription.unsubscribe();
            });
        };
        this.updateTimeSlotsWithData = function (data, startData, endDate, weekSlide, operationType) {
            var runningDate = new Date(startData);
            var dateDetails, timeSlotData, i, hour;
            while (runningDate <= endDate) {
                for (i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK; i++) {
                    for (hour = 0; hour < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].HOURS_IN_DAYS; hour++) {
                        dateDetails = _this.schedulerService.getDateDetails(runningDate);
                        timeSlotData = _this.timeSlotData[_this.schedulerWeeks[weekSlide]][i][hour];
                        timeSlotData.data = _this.extractData(data, dateDetails.year, dateDetails.month, dateDetails.dayOfMonth, hour);
                        timeSlotData.metaData = _this.metaDataGetterByTimeSlot(timeSlotData, operationType);
                        timeSlotData.metaData.date = new Date(dateDetails.year, dateDetails.month, dateDetails.dayOfMonth, hour);
                        timeSlotData.dynamicDefaultView = _this.dynamicDefaultView;
                    }
                    runningDate.setDate(runningDate.getDate() + 1);
                }
                weekSlide = (weekSlide + 1) % 3;
            }
            _this.showSpinner = false;
            return __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"].of({});
        };
        this.timeSlotHandler = function (_a) {
            var timeSlotStoreType = _a.timeSlotStoreType, metaData = _a.metaData, timeSlotData = _a.timeSlotData;
            switch (timeSlotStoreType) {
                case __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["c" /* TIME_SLOT_STORE_TYPE */].SCHEDULE:
                    _this.schedulerConfig.scheduleItem({ metaData: metaData, timeSlotData: timeSlotData });
                    break;
                case __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["c" /* TIME_SLOT_STORE_TYPE */].DELETE:
                    _this.schedulerConfig.deleteItem({ metaData: metaData, timeSlotData: timeSlotData });
            }
        };
        var _a;
    }
    SchedulerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showSpinner = true;
        for (var i = 0, hour = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].HOURS_IN_DAYS; i++) {
            hour = (i + this.startHour) % __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].HOURS_IN_DAYS;
            this.hours.push(hour);
        }
        this.headerDates = [];
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK; i++) {
            this.headerDates.push((_a = {}, _a[i] = '', _a));
        }
        this.currentDate = new Date();
        this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay());
        this.mdDate = this.currentDate;
        this.current_week_slide = 1;
        this.updateHeaderDates(this.currentDate);
        this.initTimeSlots();
        this.schedulerStoreService.onAvailability(function (availabilityStoreType) {
            var startAndEndDates = _this.getStartAndEndDates(-1 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 2 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
            _this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, _this.getRegularStartWeekSlide, availabilityStoreType);
        });
        this.schedulerStoreService.onSchedules(function () {
            var startAndEndDates = _this.getStartAndEndDates(-1 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 2 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
            _this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, _this.getRegularStartWeekSlide);
        });
        this.schedulerStoreService.onTimeSlot(this.timeSlotHandler.bind(this));
        this.schedulerStoreService.onUpdateTimeSlot(this.scheduleHandler.bind(this));
        var startAndEndDates = this.getStartAndEndDates(-1 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 2 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
        var startWeekSlide = this.current_week_slide - 1;
        this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide);
        var _a;
    };
    SchedulerComponent.prototype.updateDynamicDefaultView = function (defaultViewType) {
        this.dynamicDefaultView.timeSlotClass = this.dynamicDefaultViewsMap[defaultViewType];
    };
    SchedulerComponent.prototype.updateHeaderDates = function (dateObj) {
        var runningDate = new Date(dateObj);
        var currentDay = runningDate.getDay();
        runningDate.setDate(runningDate.getDate() - currentDay);
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK; i++) {
            this.headerDates[i] = new Date(runningDate.getTime());
            runningDate.setDate(runningDate.getDate() + 1);
        }
    };
    SchedulerComponent.prototype.changeActiveWeek = function (weekDirection) {
        var _this = this;
        this.showSpinner = true;
        var newActiveWeek = (this.current_week_slide - weekDirection) % this.schedulerWeeks.length;
        this.current_week_slide = newActiveWeek < 0 ? this.schedulerWeeks.length - 1 : newActiveWeek;
        this.currentDate.setDate(this.currentDate.getDate() - weekDirection * 7);
        this.currentDate = new Date(this.currentDate);
        this.updateHeaderDates(this.currentDate);
        var left_style_pixels = '';
        Object.keys(this.weeksStyles).forEach(function (week_slide) {
            left_style_pixels = _this.weeksStyles[week_slide].left;
            left_style_pixels = +left_style_pixels.replace('px', '');
            if (left_style_pixels + weekDirection * 900 > (_this.schedulerWeeks.length - 2) * 900) {
                _this.weeksStyles[week_slide].transition = 'none';
                _this.weeksStyles[week_slide].left = '-900px';
            }
            else if (left_style_pixels + weekDirection * 900 < -900) {
                _this.weeksStyles[week_slide].transition = 'none';
                _this.weeksStyles[week_slide].left = (_this.schedulerWeeks.length - 2) * 900 + 'px';
            }
            else {
                _this.weeksStyles[week_slide].transition = '0.6s left ease';
                _this.weeksStyles[week_slide].left = weekDirection * 900 + left_style_pixels + 'px';
            }
        });
        var relevantWeek = new Date(this.currentDate);
        relevantWeek.setDate(relevantWeek.getDate() - relevantWeek.getDay());
        this.mdDate = relevantWeek;
        var startAndEndDates, startWeekSlide;
        if (weekDirection < 0) {
            startAndEndDates = this.getStartAndEndDates(__WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 2 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
            startWeekSlide = (this.current_week_slide + 1) % 3;
        }
        else {
            startWeekSlide = this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
            startAndEndDates = this.getStartAndEndDates((-1) * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 0);
        }
        switch (this.currentOperationId) {
            case __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].SCHEDULES:
                this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide);
                break;
            case __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].AVAILABILITY:
                this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, startWeekSlide, __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].OUT);
                break;
        }
    };
    SchedulerComponent.prototype.initTimeSlots = function () {
        var _this = this;
        this.timeSlotData = { week_slide_0: {}, week_slide_1: {}, week_slide_2: {} };
        this.emptyDay = {};
        for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].HOURS_IN_DAYS; i++) {
            this.emptyDay[i] = {
                data: '',
                dynamicDefaultView: this.dynamicDefaultView,
                metaData: {
                    view: __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS.EMPTY
                }
            };
        }
        Object.keys(this.timeSlotData).forEach(function (weekSlide) {
            for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK; i++) {
                _this.timeSlotData[weekSlide][i] = __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](_this.emptyDay);
            }
        });
    };
    SchedulerComponent.prototype.changeWeekSlidesByDate = function (date) {
        this.currentDate = new Date(date);
        this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay());
        this.updateHeaderDates(this.currentDate);
        var startAndEndDates = this.getStartAndEndDates(-1 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 2 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
        switch (this.currentOperationId) {
            case __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].SCHEDULES:
                this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide);
                break;
            case __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].AVAILABILITY:
                this.availabilityHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide, __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["a" /* SCHEDULER_STORE_TYPE */].OUT);
                break;
        }
    };
    SchedulerComponent.prototype.metaDataGetterByTimeSlot = function (timeSlotData, operationType) {
        var metaData = {};
        if (timeSlotData.data && timeSlotData.data.timeSlotType === __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.CUSTOM) {
            metaData.timeSlotType = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.CUSTOM;
        }
        switch (operationType) {
            case __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].AVAILABILITY:
                if (timeSlotData.data.isAvailable === true) {
                    metaData.view = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW;
                }
                else {
                    metaData.view = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS.UNAVAILABLE_TIME_SLOT_VIEW;
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["a" /* OperationTypes */].SCHEDULES:
                if (!!timeSlotData.data) {
                    metaData.view = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS.SCHEDULE;
                }
                else {
                    metaData.view = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS.EMPTY;
                }
                break;
            default:
                metaData.view = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS.EMPTY;
        }
        return metaData;
    };
    SchedulerComponent.prototype.extractData = function (data, year, month, dayInMonth, hour) {
        if (this.schedulerService.isDateExistByParams(data, year, month, dayInMonth, hour)) {
            return data[year][month][dayInMonth][hour].data;
        }
        else {
            return null;
        }
    };
    SchedulerComponent.prototype.getRegularStartWeekSlide = function () {
        return this.current_week_slide === 0 ? 2 : (this.current_week_slide - 1) % 3;
    };
    SchedulerComponent.prototype.scheduleHandler = function (timeSlotsData) {
        this.updateDynamicDefaultView(this.DYNAMIC_DEFAULT_VIEWS.EMPTY);
        var startAndEndDates = this.getStartAndEndDates((-1) * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK, 2 * __WEBPACK_IMPORTED_MODULE_2__constants_scheduler_constant__["b" /* SchedulerConstant */].DAYS_IN_WEEK);
        this.schedulesHandler(startAndEndDates.startDate, startAndEndDates.endDate, this.getRegularStartWeekSlide);
    };
    SchedulerComponent.prototype.getStartAndEndDates = function (startOffset, endOffset) {
        var startDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + startOffset - this.currentDate.getDay()));
        var endDate = new Date(new Date(this.currentDate).setDate(this.currentDate.getDate() + endOffset - this.currentDate.getDay()));
        return { startDate: startDate, endDate: endDate };
    };
    SchedulerComponent.prototype.ngOnDestroy = function () {
        this.schedulerStoreService.unSubscribeAll();
    };
    return SchedulerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], SchedulerComponent.prototype, "schedulerConfig", void 0);
SchedulerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-scheduler',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/scheduler/scheduler.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-scheduler/scheduler/scheduler.component.scss")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DatePipe */]],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewEncapsulation */].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_scheduler_service__["a" /* SchedulerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_scheduler_service__["a" /* SchedulerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["b" /* SchedulerStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_scheduler_store_service__["b" /* SchedulerStoreService */]) === "function" && _b || Object])
], SchedulerComponent);

var _a, _b;
//# sourceMappingURL=scheduler.component.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/services/scheduler-store.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SchedulerStoreService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SCHEDULER_STORE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TIME_SLOT_STORE_TYPE; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__ = __webpack_require__("../../../../rxjs/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_core_store_ks_store_service__ = __webpack_require__("../../../../../src/app/app-core/store/ks-store.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SchedulerStoreService = (function (_super) {
    __extends(SchedulerStoreService, _super);
    function SchedulerStoreService() {
        var _this = _super.call(this) || this;
        _this.availability$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        _this.schedules$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        _this.timeSlotClick$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        _this.updateTimeSlots$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        return _this;
    }
    SchedulerStoreService.prototype.notifyAvailability = function (storeType) {
        this.availability$.next(storeType);
    };
    SchedulerStoreService.prototype.onAvailability = function (cb, id) {
        this.addSubscription(this.availability$.subscribe(cb), cb, id);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.notifySchedules = function (storeType) {
        return this.schedules$.next(storeType);
    };
    SchedulerStoreService.prototype.onSchedules = function (cb) {
        this.addSubscription(this.schedules$.subscribe(cb), cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.notifyTimeSlot = function (timeSlotStoreType, metaData, timeSlotData) {
        this.timeSlotClick$.next({ timeSlotStoreType: timeSlotStoreType, metaData: metaData, timeSlotData: timeSlotData });
    };
    SchedulerStoreService.prototype.onTimeSlot = function (cb) {
        this.addSubscription(this.timeSlotClick$.subscribe(cb), cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.notifyUpdateTimeSlot = function (data) {
        this.updateTimeSlots$.next(data);
    };
    SchedulerStoreService.prototype.onUpdateTimeSlot = function (cb) {
        this.addSubscription(this.updateTimeSlots$.subscribe(cb), cb);
        return this.subscriptions[this.subscriptions.length - 1].subscription;
    };
    SchedulerStoreService.prototype.ngOnDestroy = function () {
        this.unSubscribeAll();
        this.subscriptions = [];
    };
    return SchedulerStoreService;
}(__WEBPACK_IMPORTED_MODULE_4__app_core_store_ks_store_service__["a" /* KsStore */]));
SchedulerStoreService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SchedulerStoreService);

/*************************************** constants *******************************/
var SCHEDULER_STORE_TYPE = {
    OUT: 1,
    IN: 2
};
var TIME_SLOT_STORE_TYPE = {
    SCHEDULE: 1,
    DELETE: 2,
    CUSTOM: 3
};
//# sourceMappingURL=scheduler-store.service.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/services/scheduler.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__ = __webpack_require__("../../../../rxjs/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_delay__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SchedulerService = (function () {
    function SchedulerService() {
    }
    SchedulerService.prototype.isDateExistByParams = function (obj, year, month, dayInMonth, hour) {
        return (obj[year]
            && obj[year][month]
            && obj[year][month][dayInMonth]
            && obj[year][month][dayInMonth][hour]);
    };
    SchedulerService.prototype.getDateDetails = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var dayOfMonth = date.getDate();
        var hours = date.getHours();
        return { year: year, month: month, dayOfMonth: dayOfMonth, hours: hours };
    };
    return SchedulerService;
}());
SchedulerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SchedulerService);

//# sourceMappingURL=scheduler.service.js.map

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/time-slot/time-slot.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"time-slot-wrapper\"\r\n     [ngClass]=\"[timeSlotData.dynamicDefaultView.timeSlotClass, timeSlotData.classToAdd ? timeSlotData.classToAdd : '']\">\r\n\r\n\r\n  <div *ngIf=\"timeSlotData.metaData.view && timeSlotData.metaData.timeSlotType !== TIME_SLOTS_TYPES.CUSTOM;\">\r\n    <div [ngSwitch]=\"timeSlotData.metaData.view\">\r\n\r\n      <div *ngSwitchCase=\"TIME_SLOT_VIEWS.AVAILABLE_TIME_SLOT_VIEW\"\r\n           class=\"available-time-slot\"\r\n           (click)=\"availableSlotClick()\">\r\n      </div>\r\n\r\n      <div class=\"unavailable\" *ngSwitchCase=\"TIME_SLOT_VIEWS.UNAVAILABLE_TIME_SLOT_VIEW\">\r\n        {{timeSlotData.data.textToShow}}\r\n      </div>\r\n\r\n      <div *ngSwitchCase=\"TIME_SLOT_VIEWS.SCHEDULE\" class=\"schedule\">\r\n        <div class=\"un-schedule-btn\" (click)=\"deleteItem()\"><mat-icon>clear</mat-icon></div>\r\n\r\n        <div class=\"text\">{{timeSlotData.data | elipsis:13 }}\r\n          <div [ngClass]=\"{'hide-tooltip': timeSlotData.data.length < 13}\" class=\"time-slot-data-tooltip\">\r\n            {{timeSlotData.data }}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div #customTimeSlot class=\"custom-time-slot\">\r\n    <div *ngIf=\"timeSlotData.metaData.timeSlotType === TIME_SLOTS_TYPES.CUSTOM;\">\r\n      <div class=\"un-schedule-btn\" (click)=\"deleteItem()\"><mat-icon>clear</mat-icon></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/time-slot/time-slot.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:300italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Lato:400italic);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:300);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/css?family=Quicksand:700);", ""]);

// module
exports.push([module.i, "/* paths*/\n/* fonts size */\n/* paths*/\n/* fonts size */\n.btn-type-1 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-1:hover {\n    background-color: #0a8999; }\n  .btn-type-1:active {\n    background-color: #037684; }\n  .btn-type-1:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-2 {\n  background-color: #ffffff;\n  border-radius: 50px;\n  width: 154px;\n  height: 35px;\n  border: 1px solid #0a9bad;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #0a9bad;\n  font-family: Lato;\n  font-weight: 400;\n  text-transform: uppercase; }\n  .btn-type-2:hover {\n    background-color: #e2f0f2; }\n  .btn-type-2:active {\n    background-color: #c7e0e3; }\n  .btn-type-2:disabled {\n    background-color: #f7f7f7;\n    cursor: default; }\n\n.btn-type-3 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 132px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-3:hover {\n    background-color: #0a8999; }\n  .btn-type-3:active {\n    background-color: #037684; }\n  .btn-type-3:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-4 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 22px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-4:hover {\n    background-color: #0a8999; }\n  .btn-type-4:active {\n    background-color: #037684; }\n  .btn-type-4:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-5 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 90px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 14px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-5:hover {\n    background-color: #0a8999; }\n  .btn-type-5:active {\n    background-color: #037684; }\n  .btn-type-5:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-6 {\n  background-color: #0a9bad;\n  border-radius: 50px;\n  width: 102px;\n  height: 28px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 12px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-6:hover {\n    background-color: #0a8999; }\n  .btn-type-6:active {\n    background-color: #037684; }\n  .btn-type-6:disabled {\n    background-color: #81c4cc;\n    cursor: default; }\n\n.btn-type-7 {\n  background-color: #87ca4d;\n  border-radius: 50px;\n  width: 322px;\n  height: 35px;\n  border: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  cursor: pointer;\n  outline: 0;\n  padding: 0;\n  box-sizing: content-box;\n  font-size: 18px;\n  color: #ffffff;\n  font-family: Lato;\n  font-weight: 400; }\n  .btn-type-7:hover {\n    background-color: #76B63E; }\n  .btn-type-7:active {\n    background-color: #619E2D; }\n  .btn-type-7:disabled {\n    background-color: #AED88A;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n/* Lato fonts*/\n/* Quicksand fonts */\n/*quicksand*/\n.quicksand-32-b {\n  font-size: 32px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-20-b {\n  font-size: 20px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-18-b {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-b {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-b {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n.quicksand-12-b {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 600; }\n\n.quicksand-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Quicksand;\n  font-weight: 400; }\n\n/*lato*/\n.lato-18-n {\n  font-size: 18px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-n {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-16-l {\n  font-size: 16px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-14-n {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-14-l {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-13-n {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-13-l {\n  font-size: 13px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-12-n {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n.lato-12-l {\n  font-size: 12px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100; }\n\n.lato-8-n {\n  font-size: 8px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 400; }\n\n/* Lato fonts*/\n/* Quicksand fonts */\n/* paths*/\n/* fonts size */\nhtml {\n  height: 100%; }\n\nform {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  form .col {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    margin: 25px; }\n    form .col .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      margin-bottom: 20px; }\n    form .col .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .col .form-group .form-control {\n      height: 59px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .col .form-group .form-control select, form .col .form-group .form-control input[type=\"text\"] {\n        width: 320px; }\n  form .row {\n    margin-top: 0;\n    margin-right: 25px;\n    margin-left: 25px; }\n    form .row .title-wrap {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    form .row .link-title {\n      color: #0a9bad;\n      margin-left: 33px; }\n    form .row .form-group {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      form .row .form-group .form-control {\n        height: 59px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        form .row .form-group .form-control select, form .row .form-group .form-control input[type=\"text\"] {\n          width: 320px; }\n  form.form-row {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\ninput[type=\"text\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  width: 180px;\n  height: 37px;\n  border: 1px solid #757a83;\n  outline: 0;\n  box-sizing: content-box;\n  padding-right: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 10px;\n  margin-right: 0;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  /*left: 33px;*/ }\n  input[type=\"text\"]:disabled {\n    background-color: #f7f7f7; }\n\ninput::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput::-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-ms-input-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput:-moz-placeholder {\n  font-size: 14px;\n  color: #b7b7b7;\n  font-family: Lato;\n  font-weight: 100; }\n\ninput[type=\"checkbox\"] {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  height: 14px;\n  width: 14px;\n  border: 1px solid #4f4d4d;\n  outline: 0; }\n\nselect {\n  font-size: 14px;\n  color: #757a83;\n  font-family: Lato;\n  font-weight: 100;\n  border: 1px solid #757a83;\n  height: 37px;\n  padding-left: 10px;\n  box-sizing: content-box; }\n\nlabel {\n  font-size: 14px;\n  color: #4f4d4d;\n  font-family: Lato;\n  font-weight: 100;\n  text-transform: uppercase; }\n\ntextarea {\n  outline: 0; }\n\na {\n  color: #0a9bad;\n  cursor: pointer; }\n  a:hover {\n    color: #0a8999; }\n  a:active {\n    color: #037684; }\n  a:disabled {\n    color: #b7b7b7;\n    cursor: default; }\n\n/* paths*/\n/* fonts size */\n.main-layout {\n  background-color: #ffffff;\n  border-radius: 15px;\n  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.27);\n  padding: 10px; }\n\n.input-group {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  margin-left: 10px; }\n  .input-group label {\n    width: 95px;\n    text-align: right;\n    margin-right: 33px; }\n\n.scrollbar-style::-webkit-scrollbar {\n  height: 20px;\n  width: 7px;\n  background-color: #fbfafb;\n  border-radius: 100px; }\n\n.scrollbar-style::-webkit-scrollbar-thumb {\n  background-color: #ebebeb;\n  -webkit-border-radius: 1ex; }\n\n.time-slot-wrapper {\n  height: 50px;\n  width: 120px;\n  border: 1px solid #dfdfdf;\n  box-sizing: border-box;\n  transition: 0.5s;\n  position: relative; }\n\n.time-slot-wrapper.empty-slot {\n  background-color: #ffffff; }\n\n.time-slot-wrapper.unavailable-slot {\n  background-color: #ebebeb; }\n\n.time-slot-wrapper.disable-time-slot {\n  opacity: 0.6; }\n\n.un-schedule-btn {\n  position: absolute;\n  right: -1px;\n  top: 1px;\n  cursor: pointer;\n  z-index: 5; }\n  .un-schedule-btn:hover {\n    opacity: 0.8;\n    color: #77A2E9; }\n  .un-schedule-btn .mat-icon {\n    font-size: 13px;\n    width: 16px;\n    height: 16px; }\n\n.time-slot-wrapper .available-time-slot {\n  width: 100%;\n  height: 48px;\n  box-sizing: border-box;\n  background-color: #ffffff; }\n\n.time-slot-wrapper .unavailable {\n  font-size: 15px;\n  color: #6a6f95;\n  font-family: Lato;\n  font-weight: 400;\n  position: relative;\n  top: 15px;\n  left: 5px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 110px; }\n\n.time-slot-wrapper .schedule {\n  position: relative; }\n  .time-slot-wrapper .schedule .text {\n    font-size: 15px;\n    color: #6a6f95;\n    font-family: Lato;\n    font-weight: 400;\n    position: relative;\n    top: 15px;\n    left: 5px; }\n  .time-slot-wrapper .schedule .time-slot-data-tooltip {\n    display: none;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    position: absolute;\n    top: 25px;\n    padding: 0 10px;\n    width: auto;\n    min-width: 90px;\n    height: 50px;\n    background-color: white;\n    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.75);\n    z-index: 100;\n    transition: 0.2s; }\n  .time-slot-wrapper .schedule .time-slot-data-tooltip.hide-tooltip {\n    display: none; }\n\n.time-slot-wrapper .text:hover .time-slot-data-tooltip:not(.hide-tooltip) {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.time-slot-wrapper .available-time-slot:hover {\n  transition: ease-out 100ms;\n  background-color: rgba(10, 155, 173, 0.12);\n  border: dashed 2px #0a9bad; }\n\n.time-slot-wrapper .schedule-data {\n  font-size: 15px;\n  color: #6a6f95;\n  font-family: Lato;\n  font-weight: 400;\n  background-color: #FAFFFD;\n  height: 50px; }\n\n.time-slot-wrapper .custom-time-slot {\n  position: relative;\n  padding-top: 8px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ks-components/ks-scheduler/time-slot/time-slot.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeSlotComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/constants/timeSlot.constant.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_scheduler_store_service__ = __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/services/scheduler-store.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimeSlotComponent = (function () {
    function TimeSlotComponent(schedulerStoreService, componentFactoryResolver) {
        this.schedulerStoreService = schedulerStoreService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.TIME_SLOT_VIEWS = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOT_VIEWS;
        this.TIME_SLOTS_TYPES = __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES;
    }
    TimeSlotComponent.prototype.availableSlotClick = function () {
        this.schedulerStoreService.notifyTimeSlot(__WEBPACK_IMPORTED_MODULE_2__services_scheduler_store_service__["c" /* TIME_SLOT_STORE_TYPE */].SCHEDULE, this.timeSlotData.metaData, this.timeSlotData.data);
    };
    TimeSlotComponent.prototype.deleteItem = function () {
        var timeSlotData = this.timeSlotData;
        if (this.timeSlotData.metaData.timeSlotType === this.TIME_SLOTS_TYPES.CUSTOM) {
            timeSlotData.componentRef = this.customTimeSlotCompoRef;
        }
        this.schedulerStoreService.notifyTimeSlot(__WEBPACK_IMPORTED_MODULE_2__services_scheduler_store_service__["c" /* TIME_SLOT_STORE_TYPE */].DELETE, this.timeSlotData.metaData, timeSlotData);
    };
    TimeSlotComponent.prototype.ngDoCheck = function () {
        if (this.timeSlotData.metaData.timeSlotType === __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.CUSTOM) {
        }
        if (this.timeSlotData.metaData.timeSlotType === __WEBPACK_IMPORTED_MODULE_1__constants_timeSlot_constant__["a" /* TimeSlotConstant */].TIME_SLOTS_TYPES.CUSTOM) {
            if (!this.customTimeSlotCompoRef) {
                this.compileComponent();
            }
        }
        else {
            if (!!this.customTimeSlotCompoRef) {
                this.customTimeSlotCompoRef = undefined;
                this.customTimeSlot.remove();
            }
        }
    };
    TimeSlotComponent.prototype.compileComponent = function () {
        var _this = this;
        var factory = this.componentFactoryResolver.resolveComponentFactory(this.timeSlotData.data.component);
        this.customTimeSlotCompoRef = this.customTimeSlot.createComponent(factory);
        this.customTimeSlotCompoRef.instance.date = new Date(this.timeSlotData.metaData.date);
        var inputName;
        if (Array.isArray(this.timeSlotData.data.inputs)) {
            this.timeSlotData.data.inputs.forEach(function (input) {
                inputName = Object.keys(input)[0];
                _this.customTimeSlotCompoRef.instance[inputName] = input[inputName];
            });
        }
        this.customTimeSlotCompoRef.changeDetectorRef.detectChanges();
    };
    return TimeSlotComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], TimeSlotComponent.prototype, "timeSlotData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('customTimeSlot', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* ViewContainerRef */] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* ViewContainerRef */]) === "function" && _a || Object)
], TimeSlotComponent.prototype, "customTimeSlot", void 0);
TimeSlotComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-time-slot',
        template: __webpack_require__("../../../../../src/app/ks-components/ks-scheduler/time-slot/time-slot.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ks-components/ks-scheduler/time-slot/time-slot.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_scheduler_store_service__["b" /* SchedulerStoreService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_scheduler_store_service__["b" /* SchedulerStoreService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ComponentFactoryResolver */]) === "function" && _c || Object])
], TimeSlotComponent);

var _a, _b, _c;
//# sourceMappingURL=time-slot.component.js.map

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\nPAGE NOT FOUND :(\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-page-not-found',
        template: __webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.html"),
        styles: [__webpack_require__("../../../../../src/app/page-not-found/page-not-found.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);

//# sourceMappingURL=page-not-found.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/pipes/ellipsis.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EllipsisPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EllipsisPipe = (function () {
    function EllipsisPipe() {
    }
    EllipsisPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        if (args === undefined) {
            return value;
        }
        if (value.length > args) {
            return value.substring(0, args) + '...';
        }
        else {
            return value;
        }
    };
    return EllipsisPipe;
}());
EllipsisPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Pipe */])({ name: 'elipsis', pure: false })
], EllipsisPipe);

//# sourceMappingURL=ellipsis.pipe.js.map

/***/ }),

/***/ "../../../../../src/pipes/keys.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value);
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Pipe */])({ name: 'keys', pure: false })
], KeysPipe);

//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
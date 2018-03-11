// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/delay';
// import {ChatMock} from './chat-mock';
//
// @Injectable()
// export class ChatDataService {
//
//   constructor() {
//   }
//
//   public getChatById(chatId): Observable<any> {
//     return ChatMock.getChatById(chatId);
//   }
//
//   public getChatParticipants(userId) {
//     return ChatMock.getChatParticipants(userId);
//   }
//
//   public updateMessages(newMessage, chat, localUser) {
//     ChatMock.updateMessages(newMessage, chat, localUser);
//   }
//
//   public updateLastSeenMessages(lastSeenMessage, chatId) {
//     ChatMock.updateLastSeenMessages(lastSeenMessage, chatId);
//   }
//
//   public listenToMessages(chatId, userID): Observable<any> {
//     return ChatMock.listenToMessages(chatId, userID);
//   }
//
//   public getChatIdByTwoIdsArray(chatIdsArr1, chatIdsArr2) {
//     for (let i = 0; i < chatIdsArr1.length; i++) {
//       for (let j = 0; j < chatIdsArr2.length; j++) {
//         if (chatIdsArr1[i] === chatIdsArr2[j]) {
//           return chatIdsArr1[i];
//         }
//       }
//     }
//   };
//
//   public onDestroy() {
//     return ChatMock.onDestroy();
//   }
// }

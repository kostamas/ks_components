import {Inject, Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
import {IChatDataService, ChatData} from './chatData.types';

@Injectable()
export class ChatService implements IChatDataService {

  constructor(@Inject(ChatData) private chatDataService) {
  }

  public getChatById(chatId): Observable<any> {
    return this.chatDataService.getChatById(chatId);
  }

  public getChatParticipants(userId) {
    return this.chatDataService.getChatParticipants(userId);
  }

  public updateMessages(newMessage, chat, localUser) {
    this.chatDataService.updateMessages(newMessage, chat, localUser);
  }

  public updateLastSeenMessages(lastSeenMessage, chatId) {
    this.chatDataService.updateLastSeenMessages(lastSeenMessage, chatId);
  }

  public getChatIdByTwoIdsArray(chatIdsArr1, chatIdsArr2) {
    for (let i = 0; i < chatIdsArr1.length; i++) {
      for (let j = 0; j < chatIdsArr2.length; j++) {
        if (chatIdsArr1[i] === chatIdsArr2[j]) {
          return chatIdsArr1[i];
        }
      }
    }
  };

  public listenToMessages(chatId, userID): Observable<any> {
    return this.chatDataService.listenToMessages(chatId, userID);
  }

  public onDestroy() {
    return this.chatDataService.onDestroy();
  }
}

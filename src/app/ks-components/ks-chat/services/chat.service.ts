import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatService {
  public chatDataHandler: any = {};

  constructor(chatDataHandler: any) {
    this.chatDataHandler = chatDataHandler;
  }

  public getChatById(chatId): Observable<any> {
    return this.chatDataHandler.getChatById(chatId);
  }

  public getChatParticipants(userId) {
    return this.chatDataHandler.getChatParticipants(userId);
  }

  public updateMessages(newMessage, chat, localUser) {
    this.chatDataHandler.updateMessages(newMessage, chat, localUser);
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
    return this.chatDataHandler.listenToMessages(chatId, userID);
  }


}

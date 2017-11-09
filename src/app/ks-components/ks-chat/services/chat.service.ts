import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ChatService {
  public chatDataHandler: any = {};

  // constructor(chatDataHandler: any) {
  //   this.chatDataHandler = chatDataHandler
  // }
  //
  // public getChatById(chatId): Observable<any> {
  //   return this.chatDataHandler.getChatById(chatId);
  // }
  //
  // public getChatGuidByTwoIdsArray(chatIdsArr1, chatIdsArr2) {
  //   for (var i = 0; i < chatIdsArr1.length; i++) {
  //     for (var j = 0; j < chatIdsArr2.length; j++) {
  //       if (chatIdsArr1[i] === chatIdsArr2[j]) {
  //         return this.getChatById(chatIdsArr1[j]);
  //       }
  //     }
  //   }
  // };

  constructor() {

  }

  public getChatById(){

  }

  public getChatGuidByTwoIdsArray(chatIdsArr1, chatIdsArr2) {

  };
}

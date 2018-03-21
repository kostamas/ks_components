import {InjectionToken} from '@angular/core';

export interface IChatDataService {
  getChatById: (chatId: string) => any;
  getChatParticipants: (userId: string) => any;
  updateMessages: (newMessage: any, chat: any, localUser: any) => any;
  updateLastSeenMessages: (lastSeenMessage: any, chatId: string) => any;
  listenToMessages: (chatId: string, userID: any) => any;
  onDestroy: () => any;
}

export interface ChatDataCtor {
  new(args: any): IChatDataService;
}

export const ChatData = new InjectionToken<IChatDataService>('ChatData');

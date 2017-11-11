import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChatMock {
  public static currentDate = new Date();

  public static mockMessages: any = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt ut labore',
    'et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat. Duis'];

  public static chats = [
    ChatMock.buildMockChat('chatId1', ['User1', 'User2'], 3),
    ChatMock.buildMockChat('chatId2', ['User1', 'User3'], 7),
    ChatMock.buildMockChat('chatId3', ['User1', 'User4'], 1),
    ChatMock.buildMockChat('chatId4', ['User2', 'User3'], 5),
    ChatMock.buildMockChat('chatId5', ['User2', 'User4'], 20),
    ChatMock.buildMockChat('chatId6', ['User3', 'User4'], 2),
  ];

  public static mockUsers = [
    {
      name: 'MR. Bean',
      id: 'User1',
      chatIds: ['chatId1', 'chatId2', 'chatId3'],
      messagesNotSeen: 12
    },
    {
      name: 'Charlie Chaplin',
      id: 'User2',
      chatIds: ['chatId1', 'chatId4', 'chatId5'],
      messagesNotSeen: 0
    },
    {
      name: 'Jim Carrey',
      id: 'User3',
      chatIds: ['chatId2', 'chatId4', 'chatId16'],
      messagesNotSeen: 2
    },
    {
      name: 'van damme',
      id: 'User4',
      chatIds: ['chatId6', 'chatId5', 'chatId3'],
      messagesNotSeen: 5
    },
  ];

  private static buildMockChat(chatId, users, numOfMessages) {
    return {
      id: chatId,
      users: users,
      messages: ChatMock.buildChatMessages(numOfMessages, users)
    };
  }

  private static buildChatMessages(numOfMessages, users) {
    const messages = [];
    let message;
    for (let i = 0; i < numOfMessages; i++) {
      message = ChatMock.mockMessages[Math.floor(Math.random() * 6)];

      messages.push({
        timeStamp: new Date().setDate(ChatMock.currentDate.getDate() - numOfMessages - i),
        text: message,
        user: users[Math.floor(Math.random() * 2)]
      });
    }
    return messages;
  }

  public static chatDataHandler() {
    return {
      getChatById: (chatId) => {
        return Observable.of(this.chats.filter(chat => chat.id === chatId)[0]);
      },
      getChatParticipants: (userId) => {
        return Observable.of(ChatMock.mockUsers.filter(user => user.id !== userId));
      }
    };
  }
}




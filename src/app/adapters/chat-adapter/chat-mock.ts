import {Injectable} from '@angular/core';

@Injectable()
export class ChatMock {
  public static chats = [
    ChatMock.buildMockChat('chatId1', ['User1', 'User2'], 3),
    ChatMock.buildMockChat('chatId2', ['User1', 'User3'], 7),
    ChatMock.buildMockChat('chatId3', ['User1', 'User4'], 1),
    ChatMock.buildMockChat('chatId4', ['User2', 'User3'], 5),
    ChatMock.buildMockChat('chatId5', ['User2', 'User4'], 20),
    ChatMock.buildMockChat('chatId6', ['User3', 'User4'], 2),
  ];

  private static currentDate = new Date();
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
      messages: ChatMock.buildChatMessages(numOfMessages)
    };
  }

  private static buildChatMessages(numOfMessages) {
    let messages = [], message;
    for (let i = 0; i < numOfMessages; i++) {
      message = '';

      for (let j = 0; j < Math.random() * 10 + 1; j++) {
        message += i
      }

      messages.push({
        timeStamp: new Date().setDate(ChatMock.currentDate.getDate() - numOfMessages - i),
        text: message
      })
    }
    return messages;
  }

  public static chatDataHandler() {
    return {
      getChatById: (chatId) => {
        return this.chats[chatId];
      }
    }
  }
}




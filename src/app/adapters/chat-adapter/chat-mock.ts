import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChatMock {
  public static currentDate = new Date();
  private static messagesSubjectsMap = {};
  public static mockMessages: any = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt ut labore',
    'et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat. Duis'];


  public static mockUsers = [
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

  private static userNameMap = ChatMock.mockUsers.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  public static chats = [
    ChatMock.buildMockChat('chatId1', ['User1', 'User2'], 3),
    ChatMock.buildMockChat('chatId2', ['User1', 'User3'], 7),
    ChatMock.buildMockChat('chatId3', ['User1', 'User4'], 1),
    ChatMock.buildMockChat('chatId4', ['User2', 'User3'], 5),
    ChatMock.buildMockChat('chatId5', ['User2', 'User4'], 20),
    ChatMock.buildMockChat('chatId6', ['User3', 'User4'], 2),
    ChatMock.buildMockChat('chatId7', ['User1', 'User2', 'User3', 'User4'], 4),
    ChatMock.buildMockChat('chatId8', ['User1', 'User3'], 4),

  ];

  private static chatParticipants = {
    User1: [
      Object.assign({}, ChatMock.mockUsers[1]),
      Object.assign({}, ChatMock.mockUsers[2]),
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
      Object.assign({}, ChatMock.mockUsers[0]),
      Object.assign({}, ChatMock.mockUsers[2]),
      Object.assign({}, ChatMock.mockUsers[3]),
      {
        name: 'Chat Group 1',
        id: 'Chat Group 1',
        chatIds: ['chatId7']
      }
    ],
    User3: [
      Object.assign({}, ChatMock.mockUsers[0]),
      Object.assign({}, ChatMock.mockUsers[1]),
      Object.assign({}, ChatMock.mockUsers[3]),
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
      Object.assign({}, ChatMock.mockUsers[1]),
      Object.assign({}, ChatMock.mockUsers[2]),
      {
        name: 'Chat Group 1',
        id: 'Chat Group 1',
        chatIds: ['chatId7']
      }
    ]
  };

  private static buildMockChat(chatId, users, numOfMessages) {
    const mockChat: any = {
      id: chatId,
      users: users,
      messages: ChatMock.buildChatMessages(numOfMessages, users)
    };

    mockChat.lastSeenMessages = ChatMock.buildLastSeenMessages(mockChat);
    return mockChat;
  }

  private static buildLastSeenMessages(mockChat) {
    const lastSeenMessages = {};
    let randomMessage, lastMessage;
    mockChat.users.forEach(userId => {
      randomMessage = mockChat.messages[Math.floor(Math.random() * (mockChat.messages.length - 1))];
      lastMessage = mockChat.messages[mockChat.messages.length - 1];
      lastSeenMessages[userId] = Math.random() > 0.4 ? lastMessage : randomMessage;
    });
    return lastSeenMessages;
  }

  private static buildChatMessages(numOfMessages, users) {
    const messages = [];
    let message, userId;

    for (let i = 0; i < numOfMessages; i++) {
      message = ChatMock.mockMessages[Math.floor(Math.random() * 6)];

      userId = users[Math.floor(Math.random() * 2)];
      messages.push({
        timestamp: new Date().setDate(ChatMock.currentDate.getDate() - (numOfMessages) + i),
        text: message,
        userId: userId,
        userName: ChatMock.userNameMap[userId]
      });
    }
    return messages;
  }

  // *************************** chatDataHandler **********************************/
  private static getChatById = (chatId) => {
    return Observable.of(ChatMock.chats.filter(chat => chat.id === chatId)[0]);
  };

  private static getChatParticipants = (userId) => {
    return Observable.of(ChatMock.chatParticipants[userId]);
  };

  private static updateMessages = (newMessage, chat, localUser) => {
    let chatToUpdate = ChatMock.chats.filter(_chat => _chat.id === chat.id)[0];
    const chatToUpdateIndex = ChatMock.chats.indexOf(chatToUpdate);
    chatToUpdate = Object.assign({}, chatToUpdate);
    ChatMock.chats.splice(chatToUpdateIndex, 1, chatToUpdate);

    chatToUpdate.messages = [...chatToUpdate.messages, {
      timestamp: Date.now(),
      text: newMessage,
      userId: localUser.id,
      userName: ChatMock.userNameMap[localUser.id]
    }];

    chat.users.forEach(userId => {
      ChatMock.messagesSubjectsMap[`${userId}_${chatToUpdate.id}`].next({
        newMessages: chatToUpdate.messages,
        chatId: chatToUpdate.id
      });
    });
  }

  private static listenToMessages = (chatId, userId) => {
    const chatterChatKey = `${userId}_${chatId}`;
    if (!ChatMock.messagesSubjectsMap[chatterChatKey]) {
      ChatMock.messagesSubjectsMap[chatterChatKey] = new Subject<any[]>();
      return ChatMock.messagesSubjectsMap[chatterChatKey]
    } else {
      return ChatMock.messagesSubjectsMap[chatterChatKey]
    }
  };

  private static updateLastSeenMessages(lastSeenMessage, chatId) {
    const chat = ChatMock.chats.filter(_chat => _chat.id === chatId)[0];
    chat.updateLastSeenMessages = lastSeenMessage;
  }

  private static onDestroy = () => {
    ChatMock.messagesSubjectsMap = {};
  };

  public static chatDataHandler() {
    return {
      getChatById: ChatMock.getChatById,
      getChatParticipants: ChatMock.getChatParticipants,
      updateMessages: ChatMock.updateMessages,
      listenToMessages: ChatMock.listenToMessages,
      onDestroy: ChatMock.onDestroy,
      updateLastSeenMessages: ChatMock.updateLastSeenMessages
    };
  }

  // *************************** chatDataHandler **********************************/

}




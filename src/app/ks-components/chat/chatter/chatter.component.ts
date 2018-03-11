import {Component, Input, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from '../chat.constant';
import {ChatService} from '../services/chat.service';
import {ChatStoreService} from '../services/chat-store.service';

@Component({
  selector: 'app-chatter',
  templateUrl: './chatter.component.html',
  styleUrls: ['./chatter.component.scss']
})
export class ChatterComponent implements OnInit {
  public MAX_UN_SEEN_MESSAGES = MAX_UN_SEEN_MESSAGES;

  public onlineIndicatorMap = {
    ['2']: 'online',
    ['1']: 'idle',
    ['0']: 'offline'
  };

  @Input() chatter;
  @Input() localUser;

  constructor(private chatService: ChatService, private chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    this.initChatListeners();
  }

  private initChatListeners() {
    const chatId = this.chatService.getChatIdByTwoIdsArray(this.chatter.chatIds, this.localUser.chatIds);
    if (chatId) {
      this.chatService.getChatById(chatId).subscribe(chat => {
        this.chatter.chat = chat;
        if (!this.chatter.isActive) {
          const lastSeenMessage = this.chatter.chat.lastSeenMessages[this.localUser.id];
          let numOfUnseenMessages = 0;
          this.chatter.chat.messages.forEach(message => {
            numOfUnseenMessages = lastSeenMessage.timestamp < message.timestamp ? numOfUnseenMessages + 1 : numOfUnseenMessages;
          });
          this.chatter.numOfUnseenMessages = numOfUnseenMessages;
        }
      });
      this.listenToMessages(chatId)
    } else {
      //listen to new  chat
    }
  }

  private listenToMessages(chatId) {
    this.chatService.listenToMessages(chatId, this.localUser.id)
      .subscribe(this.newMessagesHandler)
  }

  private newMessagesHandler = ({newMessages, chatId}) => {
    this.chatStoreService.notifyGeneralChatMessage(newMessages);

    newMessages.sort((m1, m2) => m1.timestamp - m2.timestamp);
    if (this.chatter.isActive) {
      this.chatter.chat.lastSeenMessages[this.localUser.id] = newMessages[newMessages.length - 1];
      this.chatService.updateLastSeenMessages(this.chatter.chat.lastSeenMessages, chatId);
      this.chatter.numOfUnseenMessages = 0;
    } else {
      this.chatter.numOfUnseenMessages++;
    }
    this.chatter.chat.messages = newMessages;
  }
}

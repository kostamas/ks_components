import {Component, Input, NgZone, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from "../ks-chat.constant";
import {ChatService} from "../services/chat.service";
import {ChatStoreService} from "../services/chat-store.service";

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
      setTimeout(() => this.chatService.getChatById(chatId).subscribe(chat => this.chatter.chat = chat)); // todo - fix with another way
      this.listenToMessages(chatId)
    }
  }

  private listenToMessages(chatId) {
    this.chatService.listenToMessages(chatId, this.chatter.id)
      .subscribe(this.newMessagesHandler)
  }

  private newMessagesHandler = (newMessagesArray) => {
    this.chatStoreService.notifyScrollToBottom();
    debugger;
    this.chatter.chat.messages = newMessagesArray;
  }
}

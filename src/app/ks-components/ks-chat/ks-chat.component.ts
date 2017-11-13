import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from './ks-chat.constant';
import {ChatService} from './services/chat.service';
import {ChatStoreService} from './services/chat-store.service';

@Component({
  selector: 'app-ks-chat',
  templateUrl: './ks-chat.component.html',
  styleUrls: ['./ks-chat.component.scss']
})
export class KsChatComponent implements OnInit, OnDestroy {
  public MAX_UN_SEEN_MESSAGES = MAX_UN_SEEN_MESSAGES;
  public numOfUnSeenMessages;
  public CHAT_VIEWS = {CHAT_BUTTON_VIEW: 1, CHAT_VIEW: 2};
  public currentChatView;
  public actions = {};
  public getChatParticipantsSubscription;
  @Input() localUser: any;

  constructor(private chatService: ChatService, private chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    this.currentChatView = this.CHAT_VIEWS.CHAT_VIEW;
    this.getChatParticipantsSubscription = this.chatService.getChatParticipants(this.localUser.id)
      .map(chatParticipants => {
        chatParticipants.map(chatter => chatter.chat = {});
        return chatParticipants;
      })
      .subscribe(chatParticipants => {
        this.chatStoreService.notifyChatParticipants(chatParticipants);
      });
  }

  public openChat() {

  }

  ngOnDestroy() {
    this.chatService.onDestroy();
    this.getChatParticipantsSubscription.unsubscribe();
  }
}
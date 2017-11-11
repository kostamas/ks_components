import {Component, Input, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from './ks-chat.constant';
import {ChatService} from './services/chat.service';
import {ChatStoreService} from './services/chat-store.service';

@Component({
  selector: 'app-ks-chat',
  templateUrl: './ks-chat.component.html',
  styleUrls: ['./ks-chat.component.scss']
})
export class KsChatComponent implements OnInit {
  public MAX_UN_SEEN_MESSAGES = MAX_UN_SEEN_MESSAGES;
  public numOfUnSeenMessages;
  public CHAT_VIEWS = {CHAT_BUTTON_VIEW: 1, CHAT_VIEW: 2};
  public currentChatView;

  @Input() localUser: any;

  constructor(private chatService: ChatService, private chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    this.currentChatView = this.CHAT_VIEWS.CHAT_VIEW;
    this.chatService.getChatParticipants(this.localUser.id).subscribe(chatParticipants => {
      this.chatStoreService.notifyChatParticipants(chatParticipants);
    });
  }

  public openChat() {

  }

}

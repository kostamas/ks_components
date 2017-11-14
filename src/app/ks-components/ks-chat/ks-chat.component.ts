import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from './ks-chat.constant';
import {ChatService} from './services/chat.service';
import {ChatStoreService} from './services/chat-store.service';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-ks-chat',
  templateUrl: './ks-chat.component.html',
  styleUrls: ['./ks-chat.component.scss']
})
export class KsChatComponent implements OnInit, OnDestroy {
  public MAX_UN_SEEN_MESSAGES = MAX_UN_SEEN_MESSAGES;
  public getChatParticipantsSubscription;
  public CHAT_VIEWS = {CHAT_BUTTON_VIEW: 1, CHAT_VIEW: 2};
  public numOfUnseenMessages = 0;
  public currentChatView;
  public actions = {};
  public chatViewsClassMap = {
    [this.CHAT_VIEWS.CHAT_VIEW]: 'chat-view',
    [this.CHAT_VIEWS.CHAT_BUTTON_VIEW]: 'button-view'
  };
  private chatParticipants;
  @Input() localUser: any;

  constructor(private chatService: ChatService, private chatStoreService: ChatStoreService,
              private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('chat-icon', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/chat-icon.svg'));
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

  public closeChat() {
    this.currentChatView = this.CHAT_VIEWS.CHAT_BUTTON_VIEW;
    this.chatStoreService.onGeneralChatMessage(this.generalMessageHandler);
    this.numOfUnseenMessages = 0;
    this.chatParticipants.forEach(chatter => {
      this.numOfUnseenMessages += chatter.numOfUnseenMessages;
    });
  }

  public openChat() {
    this.currentChatView = this.CHAT_VIEWS.CHAT_VIEW;
    this.chatStoreService.unSubscribe(this.generalMessageHandler);
  }

  public onChatParticipants(chatParticipants) {
    this.chatParticipants = chatParticipants;
  }

  private generalMessageHandler = (message) => {
    this.numOfUnseenMessages++;
  };

  ngOnDestroy() {
    this.chatService.onDestroy();
    this.getChatParticipantsSubscription.unsubscribe();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss']
})
export class ChatParticipantsComponent implements OnInit {
  public chattersArray;

  @Input() localUser;

  constructor(public chatStoreService: ChatStoreService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatStoreService.onChatParticipants(participants => {
      this.chattersArray = participants;
      this.changeActiveChat(participants[0]);
    });
  }

  public changeActiveChat(chatter) {
    const chatId = this.chatService.getChatIdByTwoIdsArray(chatter.chatIds, this.localUser.chatIds);
    if (chatId) {
      this.chatService.getChatById(chatId).subscribe(chat => {
        this.chatStoreService.notifyActiveChat(chat);
      });
    }
  }
}

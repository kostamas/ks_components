import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss']
})
export class ChatParticipantsComponent implements OnInit {
  public chattersArray;
  public activeChatter;
  @Input() localUser;

  constructor(public chatStoreService: ChatStoreService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatStoreService.onChatParticipants(participants => {
      this.chattersArray = participants;
      this.changeCurrentChat(participants[0]);
    });
  }


  public changeCurrentChat(chatter) {
    this.activeChatter = chatter;
    const chatId = this.chatService.getChatIdByTwoIdsArray(chatter.chatIds, this.localUser.chatIds);
    if (chatId) {
      this.chatStoreService.notifyActiveChatter(chatter);
    } else {
      // connect local user with this chatter
    }
  }
}

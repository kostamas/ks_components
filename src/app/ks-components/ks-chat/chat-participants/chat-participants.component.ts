import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss']
})
export class ChatParticipantsComponent implements OnInit {
  public chattersArray;
  public activeChatter: any = {};
  @Input() localUser;
  @Output() chatParticipants: EventEmitter<any> = new EventEmitter();
;

  constructor(public chatStoreService: ChatStoreService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatStoreService.onChatParticipants(participants => {
      this.chattersArray = participants;
      this.changeCurrentChat(participants[0]);
      this.chatParticipants.emit(participants);
    });
  }


  public changeCurrentChat(chatter) {
    this.activeChatter.isActive = false;
    this.activeChatter = chatter;
    this.activeChatter.isActive = true;
    this.activeChatter.numOfUnseenMessages = 0;
    const chatId = this.chatService.getChatIdByTwoIdsArray(chatter.chatIds, this.localUser.chatIds);
    if (chatId) {
      this.chatStoreService.notifyActiveChatter(chatter);
    } else {
      // connect between local user with this chatter
    }
  }
}

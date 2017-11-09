import {Component, Input, OnInit} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';

@Component({
  selector: 'app-chat-participants',
  templateUrl: './chat-participants.component.html',
  styleUrls: ['./chat-participants.component.scss']
})
export class ChatParticipantsComponent implements OnInit {
  public chattersArray;

  @Input() localUser;
  constructor(public chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    this.chatStoreService.onChatParticipants(participants => this.chattersArray = participants)
  }

  public changeActiveChat(chat){
    this.chatStoreService.notifyActiveChat(chat);
  }
}

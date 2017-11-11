import {Component, OnInit} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';

@Component({
  selector: 'app-chat-pane',
  templateUrl: './chat-pane.component.html',
  styleUrls: ['./chat-pane.component.scss']
})
export class ChatPaneComponent implements OnInit {
  public activeChat: any;

  constructor(public chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    this.chatStoreService.onActiveChat(activeChat => {
      this.activeChat = activeChat;
    });
  }
}

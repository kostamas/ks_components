import {Component, Input, OnInit} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat-pane',
  templateUrl: './chat-pane.component.html',
  styleUrls: ['./chat-pane.component.scss']
})
export class ChatPaneComponent implements OnInit {
  public activeChat: any;
  public message;

  @Input() localUser;

  constructor(private chatStoreService: ChatStoreService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatStoreService.onActiveChat(activeChat => {
      this.activeChat = activeChat;
    });
  }

  public keyPressHandler(keyCode) {
    if (keyCode === 13) {
      this.chatService.updateMessages(this.message, this.activeChat);
    }
  }
}

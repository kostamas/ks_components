import {Component, OnInit} from '@angular/core';
import {ChatStoreService} from '../../ks-components/ks-chat/services/chat-store.service';
import {ChatMock} from "./chat-mock";

@Component({
  selector: 'app-chat-adapter',
  templateUrl: './chat-adapter.component.html',
  styleUrls: ['./chat-adapter.component.scss'],
  providers: [ChatStoreService]
})
export class ChatAdapterComponent implements OnInit {

  public localUsers;

  public chatParticipants = [
    {
      name: 'MR. Bean',
      presence: 2,
      messagesNotSeen: 2
    },
    {
      name: 'Charlie Chaplin',
      presence: 2,
      messagesNotSeen: 11
    },
    {
      name: 'Jim Carrey',
      presence: 2,
      messagesNotSeen: 0
    }
  ];

  constructor(public chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    this.chatStoreService.notifyChatParticipants(this.chatParticipants);
    this.chatStoreService.notifyActiveChat(undefined);
    this.localUsers = ChatMock.mockUsers;
  }
}

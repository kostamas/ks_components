import {Component} from '@angular/core';
import {ChatMock} from './chat-mock';

@Component({
  selector: 'app-chat-adapter',
  templateUrl: './chat-adapter.component.html',
  styleUrls: ['./chat-adapter.component.scss']
})
export class ChatAdapterComponent {
  public localUsers = ChatMock.mockUsers;
}

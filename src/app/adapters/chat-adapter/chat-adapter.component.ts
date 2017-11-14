import {Component, ViewEncapsulation} from '@angular/core';
import {ChatMock} from './chat-mock';

@Component({
  selector: 'app-chat-adapter',
  templateUrl: './chat-adapter.component.html',
  styleUrls: ['./chat-adapter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatAdapterComponent {
  public localUsers = ChatMock.mockUsers;
}

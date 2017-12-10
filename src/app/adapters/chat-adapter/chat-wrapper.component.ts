import {Component, Input} from '@angular/core';
import {ChatStoreService} from '../../ks-components/ks-chat/services/chat-store.service';
import {ChatMock} from './chat-mock';

@Component({
  selector: 'app-chat-adapter-wrapper',
  template: `
    <app-ks-chat [localUser]="localUser"></app-ks-chat>`,
  styleUrls: ['./chat-adapter.component.scss'],
  providers: [ChatStoreService]
})
export class ChatAdapterWrapperComponent {

  @Input() localUser;

  public chatParticipants = ChatMock.mockUsers;

  constructor() {
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {ChatStoreService} from '../../ks-components/ks-chat/services/chat-store.service';
import {ChatMock} from './chat-mock';

@Component({
  selector: 'app-chat-adapter-wrapper',
  template: `
    <app-ks-chat [localUser]="localUser"></app-ks-chat>`,
  styleUrls: ['./chat-adapter.component.scss'],
  providers: [ChatStoreService]
})
export class ChatAdapterWrapperComponent implements OnInit {

  @Input() localUser;

  public chatParticipants = ChatMock.mockUsers;

  constructor(public chatStoreService: ChatStoreService) {
  }

  ngOnInit() {
    // this.chatStoreService.notifyActiveChatter(undefined);
  }
}

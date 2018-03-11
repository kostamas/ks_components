import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatParticipantsComponent } from './chat-participants.component';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {ChatterComponent} from '../chatter/chatter.component';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';
import {chatServiceConfigFn} from "../../../adapters/adapters.module";

describe('ChatParticipantsComponent', () => {
  let component: ChatParticipantsComponent;
  let fixture: ComponentFixture<ChatParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatParticipantsComponent,
        ChatMessageComponent,
        ChatterComponent
      ],
      providers:[
        ChatStoreService,
        {
          provide: ChatService,
          useFactory: chatServiceConfigFn
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatParticipantsComponent);
    component = fixture.componentInstance;
    component.localUser = {
      name: 'MR. Bean',
      id: 'User1',
      chatIds: ['chatId1', 'chatId2', 'chatId3', 'chatId7', 'chatId8']
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

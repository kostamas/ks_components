import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatPaneComponent} from './chat-pane.component';
import {ChatMessageComponent} from '../chat-message/chat-message.component';
import {ChatParticipantsComponent} from '../chat-participants/chat-participants.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatterComponent} from '../chatter/chatter.component';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';
import {chatServiceConfigFn} from "../../../adapters/adapters.module";

describe('ChatPaneComponent', () => {
  let component: ChatPaneComponent;
  let fixture: ComponentFixture<ChatPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        FormsModule,
      ],
      declarations: [
        ChatPaneComponent,
        ChatMessageComponent,
        ChatParticipantsComponent,
        ChatterComponent
      ],
      providers: [
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
    fixture = TestBed.createComponent(ChatPaneComponent);
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

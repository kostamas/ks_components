import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KsChatComponent} from './chat.component';
import {MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatterComponent} from './chatter/chatter.component';
import {ChatParticipantsComponent} from './chat-participants/chat-participants.component';
import {ChatPaneComponent} from './chat-pane/chat-pane.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {ChatService} from './services/chat.service';
import {chatServiceConfigFn} from '../../adapters/adapters.module';
import {ChatStoreService} from './services/chat-store.service';
import {HttpModule} from '@angular/http';

describe('KsChatComponent', () => {
  let component: KsChatComponent;
  let fixture: ComponentFixture<KsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        HttpModule
      ],
      declarations: [
        KsChatComponent,
        ChatMessageComponent,
        ChatPaneComponent,
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
    fixture = TestBed.createComponent(KsChatComponent);
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

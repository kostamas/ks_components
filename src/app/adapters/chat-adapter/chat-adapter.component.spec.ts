import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAdapterComponent } from './chat-adapter.component';
import {ChatAdapterWrapperComponent} from './chat-wrapper.component';
import {KsChatComponent} from '../../ks-components/ks-chat/ks-chat.component';
import {MatIconModule} from '@angular/material';
import {ChatParticipantsComponent} from '../../ks-components/ks-chat/chat-participants/chat-participants.component';
import {ChatPaneComponent} from '../../ks-components/ks-chat/chat-pane/chat-pane.component';
import {ChatterComponent} from '../../ks-components/ks-chat/chatter/chatter.component';
import {ChatMessageComponent} from '../../ks-components/ks-chat/chat-message/chat-message.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatService} from '../../ks-components/ks-chat/services/chat.service';
import {chatServiceConfigFn} from '../adapters.module';
import {HttpModule} from "@angular/http";

describe('ChatAdapterComponent', () => {
  let component: ChatAdapterComponent;
  let fixture: ComponentFixture<ChatAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        FormsModule,
        MatIconModule,
        HttpModule
      ],
      declarations: [
        ChatAdapterWrapperComponent,
        ChatAdapterComponent,
        KsChatComponent,
        ChatParticipantsComponent,
        ChatPaneComponent,
        ChatterComponent,
        ChatMessageComponent
      ],
      providers:[
        {
          provide: ChatService,
          useFactory: chatServiceConfigFn
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

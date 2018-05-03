import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChatAdapterComponent} from './chat-adapter.component';
import {ChatAdapterWrapperComponent} from './chat-wrapper.component';
import {KsChatComponent} from '../../ks-components/chat/chat.component';
import {MatIconModule} from '@angular/material';
import {ChatParticipantsComponent} from '../../ks-components/chat/chat-participants/chat-participants.component';
import {ChatPaneComponent} from '../../ks-components/chat/chat-pane/chat-pane.component';
import {ChatterComponent} from '../../ks-components/chat/chatter/chatter.component';
import {ChatMessageComponent} from '../../ks-components/chat/chat-message/chat-message.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatService} from '../../ks-components/chat/services/chat.service';
import {ChatDataService} from '../../adapters/chat-adapter/chatDataService';
import {HttpClientModule} from '@angular/common/http';

xdescribe('ChatAdapterComponent', () => {
  let component: ChatAdapterComponent;
  let fixture: ComponentFixture<ChatAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        HttpClientModule
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
      providers: [
        {
          provide: ChatService,
          useFactory: ChatDataService
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

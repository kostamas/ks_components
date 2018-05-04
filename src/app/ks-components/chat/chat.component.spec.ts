import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KsChatComponent} from './chat.component';
import {MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChatService} from './services/chat.service';
import {ChatStoreService} from './services/chat-store.service';
import {HttpClientModule} from '@angular/common/http';
import {ChatDataService} from '../../adapters/chat-adapter/chatDataService';
import {ChatModule} from './chat.module';

describe('KsChatComponent', () => {
  let component: KsChatComponent;
  let fixture: ComponentFixture<KsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        HttpClientModule,
        ChatModule.config(ChatDataService)
      ],
      providers: [
        ChatStoreService,
        ChatService
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

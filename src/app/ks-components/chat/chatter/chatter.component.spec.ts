import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatterComponent} from './chatter.component';
import {ChatDataService} from '../../../adapters/chat-adapter/chatDataService';
import {ChatModule} from '../chat.module';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';

describe('ChatterComponent', () => {
  let component: ChatterComponent;
  let fixture: ComponentFixture<ChatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChatModule.config(ChatDataService)],
      providers: [
        ChatStoreService,
        ChatService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatterComponent);
    component = fixture.componentInstance;
    component.localUser = {
      name: 'MR. Bean',
      id: 'User1',
      chatIds: ['chatId1', 'chatId2', 'chatId3', 'chatId7', 'chatId8']
    };
    component.chatter = {
      chatIds: ['chatId1', 'chatId4', 'chatId5', 'chatId7'],
      id: 'User2',
      isActive: true,
      name: 'Charlie Chaplin'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

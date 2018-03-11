import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatterComponent} from './chatter.component';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from '../services/chat.service';
import {chatServiceConfigFn} from "../../../adapters/adapters.module";

describe('ChatterComponent', () => {
  let component: ChatterComponent;
  let fixture: ComponentFixture<ChatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    fixture = TestBed.createComponent(ChatterComponent);
    component = fixture.componentInstance;
    component.localUser = {
      name: 'MR. Bean',
      id: 'User1',
      chatIds: ['chatId1', 'chatId2', 'chatId3', 'chatId7', 'chatId8']
    };
    component.chatter = {
      chatIds: ["chatId1", "chatId4", "chatId5", "chatId7"],
      id: "User2",
      isActive: true,
      name: "Charlie Chaplin"
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

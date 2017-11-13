import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAdapterComponent } from './chat-adapter.component';

describe('ChatAdapterComponent', () => {
  let component: ChatAdapterComponent;
  let fixture: ComponentFixture<ChatAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAdapterComponent ]
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KsChatComponent } from './ks-chat.component';

describe('KsChatComponent', () => {
  let component: KsChatComponent;
  let fixture: ComponentFixture<KsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

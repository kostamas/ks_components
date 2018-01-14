import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgammonAdapterComponent } from './backgammon-adapter.component';

describe('BackgammonAdapterComponent', () => {
  let component: BackgammonAdapterComponent;
  let fixture: ComponentFixture<BackgammonAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgammonAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgammonAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

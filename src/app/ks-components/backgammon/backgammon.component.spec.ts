import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgammonComponent } from './backgammon.component';

describe('BackgammonComponent', () => {
  let component: BackgammonComponent;
  let fixture: ComponentFixture<BackgammonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgammonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgammonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

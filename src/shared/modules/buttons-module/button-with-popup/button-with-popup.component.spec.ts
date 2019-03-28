import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithPopupComponent } from './button-with-popup.component';

describe('ButtonWithPopupComponent', () => {
  let component: ButtonWithPopupComponent;
  let fixture: ComponentFixture<ButtonWithPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonWithPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWithPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

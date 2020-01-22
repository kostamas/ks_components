import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDatePickerWrapperComponent } from './multi-date-picker-wrapper.component';

describe('MultiDatePickerWrapperComponent', () => {
  let component: MultiDatePickerWrapperComponent;
  let fixture: ComponentFixture<MultiDatePickerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDatePickerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDatePickerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

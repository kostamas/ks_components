import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerAdapterComponent } from './date-range-picker-adapter.component';

describe('DateRangePickerAdapterComponent', () => {
  let component: DateRangePickerAdapterComponent;
  let fixture: ComponentFixture<DateRangePickerAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangePickerAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

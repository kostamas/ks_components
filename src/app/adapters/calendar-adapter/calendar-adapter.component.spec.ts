import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAdapterComponent } from './calendar-adapter.component';

describe('CalendarAdapterComponent', () => {
  let component: CalendarAdapterComponent;
  let fixture: ComponentFixture<CalendarAdapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarAdapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

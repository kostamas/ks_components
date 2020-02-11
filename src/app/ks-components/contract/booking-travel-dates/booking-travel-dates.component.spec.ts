import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTAravelDatesComponent } from './booking-travel-dates.component';

describe('BookingTAravelDatesComponent', () => {
  let component: BookingTAravelDatesComponent;
  let fixture: ComponentFixture<BookingTAravelDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTAravelDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTAravelDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEarlyBookingDiscountComponent } from './contract-early-booking-discount.component';

describe('ContractEarlyBookingDiscountComponent', () => {
  let component: ContractEarlyBookingDiscountComponent;
  let fixture: ComponentFixture<ContractEarlyBookingDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractEarlyBookingDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEarlyBookingDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

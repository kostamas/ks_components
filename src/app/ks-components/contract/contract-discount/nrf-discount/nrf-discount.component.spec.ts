import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrfDiscountComponent } from './nrf-discount.component';

describe('NrfDiscountComponent', () => {
  let component: NrfDiscountComponent;
  let fixture: ComponentFixture<NrfDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrfDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrfDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

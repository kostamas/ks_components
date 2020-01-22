import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HbgSelectDiscountComponent } from './hbg-select-discount.component';

describe('HbgSelectDiscountComponent', () => {
  let component: HbgSelectDiscountComponent;
  let fixture: ComponentFixture<HbgSelectDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HbgSelectDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HbgSelectDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

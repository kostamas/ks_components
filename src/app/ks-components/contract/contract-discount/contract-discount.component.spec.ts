import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDiscountComponent } from './contract-discount.component';

describe('ContractDiscountComponent', () => {
  let component: ContractDiscountComponent;
  let fixture: ComponentFixture<ContractDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

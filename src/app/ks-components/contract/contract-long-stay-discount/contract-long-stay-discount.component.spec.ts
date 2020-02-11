import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractLongStayDiscountComponent } from './contract-long-stay-discount.component';

describe('ContractLongStayDiscountComponent', () => {
  let component: ContractLongStayDiscountComponent;
  let fixture: ComponentFixture<ContractLongStayDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractLongStayDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractLongStayDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

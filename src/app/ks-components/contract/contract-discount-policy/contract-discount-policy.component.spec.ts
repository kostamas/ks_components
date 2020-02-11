import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDiscountPolicyComponent } from './contract-discount-policy.component';

describe('ContractDiscountPolicyComponent', () => {
  let component: ContractDiscountPolicyComponent;
  let fixture: ComponentFixture<ContractDiscountPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDiscountPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDiscountPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

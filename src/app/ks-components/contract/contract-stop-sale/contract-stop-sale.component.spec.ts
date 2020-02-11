import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStopSaleComponent } from './contract-stop-sale.component';

describe('ContractStopSaleComponent', () => {
  let component: ContractStopSaleComponent;
  let fixture: ComponentFixture<ContractStopSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractStopSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractStopSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

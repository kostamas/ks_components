import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRatesComponent } from './contract-rates.component';

describe('ContractRatesComponent', () => {
  let component: ContractRatesComponent;
  let fixture: ComponentFixture<ContractRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayStayComponent } from './contract-pay-stay.component';

describe('ContractPayStayComponent', () => {
  let component: ContractPayStayComponent;
  let fixture: ComponentFixture<ContractPayStayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayStayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

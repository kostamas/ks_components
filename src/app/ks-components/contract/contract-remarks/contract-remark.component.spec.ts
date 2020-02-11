import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRemarkComponent } from './contract-remark.component';

describe('ContractRemarksComponent', () => {
  let component: ContractRemarkComponent;
  let fixture: ComponentFixture<ContractRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

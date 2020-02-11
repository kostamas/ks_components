import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAllotmentComponent } from './contract-allotment.component';

describe('ContractAllotmentComponent', () => {
  let component: ContractAllotmentComponent;
  let fixture: ComponentFixture<ContractAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

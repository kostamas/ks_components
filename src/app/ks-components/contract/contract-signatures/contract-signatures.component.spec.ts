import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSignaturesComponent } from './contract-signatures.component';

describe('ContractSignaturesComponent', () => {
  let component: ContractSignaturesComponent;
  let fixture: ComponentFixture<ContractSignaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSignaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSignaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

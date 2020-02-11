import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOtherSupplementComponent } from './contract-other-supplement.component';

describe('ContractOtherSupplementComponent', () => {
  let component: ContractOtherSupplementComponent;
  let fixture: ComponentFixture<ContractOtherSupplementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOtherSupplementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOtherSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

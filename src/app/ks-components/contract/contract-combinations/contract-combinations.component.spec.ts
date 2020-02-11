import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCombinationsComponent } from './contract-combinations.component';

describe('ContractCombinationsComponent', () => {
  let component: ContractCombinationsComponent;
  let fixture: ComponentFixture<ContractCombinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCombinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

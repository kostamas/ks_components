import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOccupancySupplementComponent } from './contract-occupancy-supplement.component';

describe('ContractOccupancySupplementComponent', () => {
  let component: ContractOccupancySupplementComponent;
  let fixture: ComponentFixture<ContractOccupancySupplementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOccupancySupplementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOccupancySupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

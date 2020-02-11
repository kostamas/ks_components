import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHotelInformationComponent } from './contract-hotel-information.component';

describe('ContractHotelInformationComponent', () => {
  let component: ContractHotelInformationComponent;
  let fixture: ComponentFixture<ContractHotelInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractHotelInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractHotelInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

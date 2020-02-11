import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRoomsAvailabilityComponent } from './contract-rooms-availability.component';

describe('ContractRoomsAvailabilityComponent', () => {
  let component: ContractRoomsAvailabilityComponent;
  let fixture: ComponentFixture<ContractRoomsAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRoomsAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRoomsAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ContractHotelInformationService } from './contract-hotel-information.service';

describe('ContractHotelInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractHotelInformationService = TestBed.get(ContractHotelInformationService);
    expect(service).toBeTruthy();
  });
});

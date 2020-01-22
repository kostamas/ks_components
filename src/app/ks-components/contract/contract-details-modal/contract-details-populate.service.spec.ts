import { TestBed } from '@angular/core/testing';

import { ContractDetailsPopulateService } from './contract-details-populate.service';

describe('ContractDetailsPopulateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractDetailsPopulateService = TestBed.get(ContractDetailsPopulateService);
    expect(service).toBeTruthy();
  });
});

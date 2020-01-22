import { TestBed } from '@angular/core/testing';

import { ContractLoadingInformationService } from './contract-loading-information.service';

describe('ContractLoadingInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractLoadingInformationService = TestBed.get(ContractLoadingInformationService);
    expect(service).toBeTruthy();
  });
});

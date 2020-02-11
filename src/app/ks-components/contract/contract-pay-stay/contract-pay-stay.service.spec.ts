import { TestBed } from '@angular/core/testing';

import { ContractPayStayService } from './contract-pay-stay.service';

describe('ContractPayStayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractPayStayService = TestBed.get(ContractPayStayService);
    expect(service).toBeTruthy();
  });
});

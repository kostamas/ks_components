import { TestBed, inject } from '@angular/core/testing';

import { AutoSuggestService } from './auto-suggest.service';

describe('AutoSuggestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoSuggestService]
    });
  });

  it('should be created', inject([AutoSuggestService], (service: AutoSuggestService) => {
    expect(service).toBeTruthy();
  }));
});

import {TestBed, inject} from '@angular/core/testing';

import {MainHeaderService} from './main-header.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MainHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainHeaderService
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  it('should be created', inject([MainHeaderService], (service: MainHeaderService) => {
    expect(service).toBeTruthy();
  }));
});

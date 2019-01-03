import {TestBed, inject} from '@angular/core/testing';

import {MenusService} from './menus.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MenusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenusService
      ],
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  it('should be created', inject([MenusService], (service: MenusService) => {
    expect(service).toBeTruthy();
  }));
});

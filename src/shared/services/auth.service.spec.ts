import {TestBed, inject} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  it('user details - username contain only letters', inject([AuthService], (service: AuthService) => {
    let u;
    const invalidUser = 'user4.last';
    const exp = new RegExp('([A-Za-z]+)[.]([A-Za-z]+)');
    service.user$.subscribe(user => u = user);
    expect(exp.test(u.username)).toBeTruthy();
    expect(exp.test(invalidUser)).toBeFalsy();
  }));
});

/*
describe('User details', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });
});
*/

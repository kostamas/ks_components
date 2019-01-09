import {Inject, Injectable} from '@angular/core';

import {InjectionToken} from '@angular/core';
import {ILoginConfig} from '../../types/login';

export const LoginConfig = new InjectionToken<any>(null);

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginConfig: ILoginConfig;
  constructor(@Inject(LoginConfig) loginConfig: any) {
    this.loginConfig = loginConfig;
  }
}

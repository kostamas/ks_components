import {Injectable} from '@angular/core';
import {IAuthConfig} from '../shared/types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthConfiguration implements IAuthConfig {
  showOfficeData = false;
  onLoginSuccessRedirect = 'searchSimulator';
  logoutFromHotelBeds = false;
}


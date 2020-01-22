import {BehaviorSubject} from 'rxjs';

export interface IAuthConfig {
  onLoginSuccessRedirect: string;
  showOfficeData: boolean;
  logoutFromHotelBeds: boolean;
}

interface ILoginConfigConstructor {
  new(...args: any[]): IAuthConfig;
}

export interface IPermissionsTypes {
  read: string;
  write: string;
  read_write: string;
}

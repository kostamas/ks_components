export interface IAuthConfig {
  onLoginSuccessRedirect:  string;
  showOfficeData: boolean;
  logoutFromHotelBeds: boolean;
}

interface ILoginConfigConstructor {
  new(...args: any[]): IAuthConfig;
}

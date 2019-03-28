export interface IAuthConfig {
	onLoginSuccessRedirect: string;
	showOfficeData: boolean;
	logoutFromHotelBeds: boolean;
}

interface ILoginConfigConstructor {
	new(...args: any[]): IAuthConfig;
}

export interface IAuthorizationTypes {
	read: string;
	write: string;
	read_write: string;
}
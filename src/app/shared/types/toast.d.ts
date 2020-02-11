export interface IToastConfig {
	disableAutoClose?: boolean;
	message?: string;
	type?: 'success' | 'error' | 'warning';
	direction?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	style?: any;
}

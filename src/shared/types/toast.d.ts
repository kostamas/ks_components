export interface IToastTypes {
	success: string;
	error: string;
	warning: string;
}

export interface IToastConfig {
	disableAutoClose?: boolean;
	message?: string;
	type: string;
	direction?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

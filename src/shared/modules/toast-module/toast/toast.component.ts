import {Component, HostListener, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IToastConfig, IToastTypes} from '../../../types/toast';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';
import {TOAST_TYPES} from '../toast.constant';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {
	public TOAST_TYPES: IToastTypes = TOAST_TYPES;

	@Input('config') config: IToastConfig;
	@Input('closeToast') closeToast: () => any;

	public SVG_ICONS: ISvgIcons = SVG_ICONS;

	constructor() {
	}

	ngOnInit(): void {
	}

	@HostListener('window:click', ['$event'])
	documentClickHandler = (event: any) => {
		this.closeToast();
	}
}

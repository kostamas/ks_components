import {Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
	selector: 'app-button-with-loader',
	templateUrl: './button-with-loader.component.html',
	styleUrls: ['./button-with-loader.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonWithLoaderComponent implements OnDestroy {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public showLoader: boolean = false;
	public subscriptionsArray: any[] = [];

	@Input() onClick: () => Observable<any> = (null);
	@Input() disabledClickHandler: () => (null);
	@Input() hideIcon: boolean = false;
	@Input() markAsEnabled: boolean;
	@Input() isDisabled: boolean;
	@Input() btnClass: string;
	@Input() loadingText: string;
	@Input() text: string;
	@Input() svg: string;
	@Input() style: any;

	constructor() {
	}

	onClickWrapper(): void {
		if (!this.isDisabled && this.onClick) {
			this.showLoader = true;
			this.subscriptionsArray.push(
				this.onClick()
					.pipe(take(1))
					.subscribe(() => this.showLoader = false)
			);
		}

		if (this.isDisabled && this.disabledClickHandler) {
			this.disabledClickHandler();
		}
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
	}
}
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IPopupData} from '../../../types/modal';
import {PopupService} from '../../popup-module/popup.service';
import {IButtonWithPopupConfig} from '../../../types/buttons';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';

@Component({
	selector: 'app-button-with-popup',
	templateUrl: './button-with-popup.component.html',
	styleUrls: ['./button-with-popup.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ButtonWithPopupComponent implements OnInit {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;

	@Input('buttonWithPopupConfig') buttonWithPopupConfig: IButtonWithPopupConfig;
	@Input('buttonText') buttonText: string;
	@Input('buttonIcon') buttonIcon: string;
	@Input('isDisabled') isDisabled: boolean;

	constructor(private popService: PopupService) {
	}

	ngOnInit(): void {
	}

	buttonClickHandler = (): Observable<any> => {
		const searchDone$: Subject<any> = new Subject();
		this.popService.showWarning(this.getDeletePopupData(searchDone$), {modalClass: this.buttonWithPopupConfig.modalClass || 'button-with-popup'});
		return searchDone$;
	};

	private getDeletePopupData(searchDone$: Subject<boolean>): IPopupData {
		return {
			title: this.buttonWithPopupConfig.title,
			content: this.buttonWithPopupConfig.content,
			buttons: [{
				text: this.buttonWithPopupConfig.firstButtonText,
				svg: this.SVG_ICONS.bin,
				withLoader: true,
				btnClass: 'hb-button-blue',
				handler: (closeModal: () => any) => {
					this.buttonWithPopupConfig.clickHandler(closeModal, searchDone$);
					return searchDone$;
				},
			}, {
				text: this.buttonWithPopupConfig.secondButtonText || 'Cancel',
				svg: this.SVG_ICONS.cancel,
				btnClass: 'hb-button-white',
				handler: (closeModal) => {
					closeModal();
					searchDone$.next(true);
				}
			}]
		};
	}
}

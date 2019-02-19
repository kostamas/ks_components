import {Injectable} from '@angular/core';
import {ModalService} from '../modal-module/modal.service';
import {PopupComponent} from './popup/popup.component';
import {IModalConfig, IPopupData} from '../../types/modal';

@Injectable({
	providedIn: 'root'
})
export class PopupService {

	private modalConfig: IModalConfig = {modalClass: 'pop-up', hidCloseButton: true, disableClose: false};

	constructor(private modalService: ModalService) {
	}

	showMessage(popupData: IPopupData, modalConfig: IModalConfig = {}): any {
		modalConfig = Object.assign(this.modalConfig, modalConfig);
		return this.modalService.open(PopupComponent, modalConfig, {...popupData, type: 'message'});
	}

	showError(popupData: IPopupData, modalConfig: IModalConfig = {}): any {
		modalConfig = Object.assign(this.modalConfig, modalConfig);
		return this.modalService.open(PopupComponent, modalConfig, {...popupData, type: 'error'});
	}

	showWarning(popupData: IPopupData, modalConfig?: IModalConfig): any {
		modalConfig = Object.assign(this.modalConfig, modalConfig);
		return this.modalService.open(PopupComponent, modalConfig, {...popupData, type: 'warning'});
	}
}

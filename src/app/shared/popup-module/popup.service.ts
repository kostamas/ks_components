import {Injectable} from '@angular/core';
import {ModalService} from '../modal-module/modal.service';
import {PopupComponent} from './popup/popup.component';
import {ErrorPopupComponent} from './error-popup/error-popup.component';
import {IModalConfig, IPopupData} from '../../types/modal';
import {InformationPopupComponent} from './information-popup/information-popup.component';

@Injectable({
	providedIn: 'root'
})
export class PopupService {

	private modalConfig: IModalConfig = {modalClass: 'pop-up', disableClose: false};

	constructor(private modalService: ModalService) {
	}

	showMessage(popupData: IPopupData, modalConfig: IModalConfig = {}): any {
		modalConfig = Object.assign(this.modalConfig, modalConfig);
		return this.modalService.open(PopupComponent, modalConfig, {...popupData, type: 'message'});
	}

	showError(popupData: IPopupData, modalConfig: IModalConfig = {}): any {
		modalConfig = Object.assign(this.modalConfig, modalConfig);
		return this.modalService.open(ErrorPopupComponent, modalConfig, {...popupData, type: 'error'});
	}

	showWarning(popupData: IPopupData, modalConfig?: IModalConfig): any {
		modalConfig = Object.assign(this.modalConfig, modalConfig);
		return this.modalService.open(PopupComponent, modalConfig, {...popupData, type: 'warning'});
	}

  showInformation(popupData: IPopupData, modalConfig?: IModalConfig): any {
    modalConfig = Object.assign(this.modalConfig, modalConfig);
    return this.modalService.open(InformationPopupComponent, modalConfig, {...popupData, type: 'information'});
  }
}

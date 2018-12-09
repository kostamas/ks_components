import {Injectable} from '@angular/core';
import {ModalService} from '../modalModule/modal.service';
import {PopupComponent} from './popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private modalConfig: IModalConfig = {modalClass: 'message-pop-up', hidCloseButton: true, disableClose: false};

  constructor(private modalService: ModalService) {
  }

  showMessage(popupData: IPopupData): any {
    return this.modalService.open(PopupComponent, this.modalConfig, {...popupData, type: 'message'});
  }

  showError(popupData: IPopupData): any {
    return this.modalService.open(PopupComponent, this.modalConfig, {...popupData, type: 'error'});
  }

  showWarning(popupData: IPopupData): any {
    return this.modalService.open(PopupComponent, this.modalConfig, {...popupData, type: 'warning'});
  }
}

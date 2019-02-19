import {Injectable} from '@angular/core';
import {SharedConstants} from './shared-constants.service';
import {ISelectItem} from '../types/ISelect';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private sharedConstants: SharedConstants) {
  }

  getImageIcon(imageName: string): string {
    return this.sharedConstants.IMAGES_ICON_PATH + imageName;
  }

  getSelectedItem(selectInputList: ISelectItem[], getAllSelectedItems?: boolean): ISelectItem | ISelectItem[] {
    if (getAllSelectedItems) {
      return selectInputList.filter(option => option.isSelected);
    }

    for (let i = 0; i < selectInputList.length; i++) {
      if (selectInputList[i].isSelected) {
        return selectInputList[i];
      }
    }
  }
}

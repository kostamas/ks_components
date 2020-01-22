import {Injectable} from '@angular/core';
import {IMAGES_ICON_PATH} from '../constants/shared.constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {
  }

  getImageIcon(imageName: string): string {
    return IMAGES_ICON_PATH + imageName;
  }
}

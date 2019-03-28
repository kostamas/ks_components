import {Injectable} from '@angular/core';
import {SharedConstants} from './shared-constants.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private sharedConstants: SharedConstants) {
  }

  getImageIcon(imageName: string): string {
    return this.sharedConstants.IMAGES_ICON_PATH + imageName;
  }
}

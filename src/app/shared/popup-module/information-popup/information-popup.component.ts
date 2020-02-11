import {Component, Input} from '@angular/core';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';

@Component({
  selector: 'app-information-popup',
  templateUrl: './information-popup.component.html',
  styleUrls: ['./information-popup.component.scss']
})
export class InformationPopupComponent  {

  @Input() data: any;
  @Input() closeModal: any;
  public SVG_ICONS: ISvgIcons = SVG_ICONS;

  constructor() {
  }
}


import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ISvgIcons, SVG_ICONS} from "../svgIconModule/svg-icons.const";
import {Observable} from "rxjs";

@Component({
  selector: 'app-hb-search-button',
  templateUrl: './hb-search-button.component.html',
  styleUrls: ['./hb-search-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HbSearchButtonComponent {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public showLoader = false;

  @Input() onClick: () => Observable<any> = (null);

  constructor() {
  }

  onClickWrapper() {
    if (this.onClick) {
      this.showLoader = true;
      this.onClick().subscribe(() => this.showLoader = false);
    }
  }
}

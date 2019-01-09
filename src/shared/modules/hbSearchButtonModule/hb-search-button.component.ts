import {Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ISvgIcons, SVG_ICONS} from '../svgIconModule/svg-icons.const';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-hb-search-button',
  templateUrl: './hb-search-button.component.html',
  styleUrls: ['./hb-search-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HbSearchButtonComponent {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public showLoader: boolean = false;

  @Input() onClick: () => Observable<any> = (null);
  @Input() disabledClickHandler: () => (null);
  @Input() isDisabled: boolean;
  @Input() markAsEnabled: boolean;

  constructor() {
  }

  onClickWrapper(): void {
    if (!this.isDisabled && this.onClick) {
      this.showLoader = true;
      this.onClick()
        .pipe(take(1))
        .subscribe(() => this.showLoader = false);
    }

    if (this.isDisabled && this.disabledClickHandler) {
      this.disabledClickHandler();
    }
  }
}

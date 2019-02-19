import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ISvgIcons, SVG_ICONS} from '../../svg-icon-module/svg-icons.const';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-button-with-loader',
  templateUrl: './button-with-loader.component.html',
  styleUrls: ['./button-with-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonWithLoaderComponent {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public showLoader: boolean = false;

  @Input() onClick: () => Observable<any> = (null);
  @Input() disabledClickHandler: () => (null);
  @Input() isDisabled: boolean;
  @Input() markAsEnabled: boolean;
  @Input() svg: string;
  @Input() text: string;
  @Input() style: any;

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

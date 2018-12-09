import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OverlayService} from '../../../../services/overlay.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnChanges {

  public triangleLeftPosition: string;
  public selectedMenu: IMenu;
  public menuItemWidth: string;
  public menuItemTopStyle: string;
  public menuWidthBreakPoint: number = 1600;

  @Input() headerTabElement: any;
  @Input() mainHeaderElement: any;
  @Input() headerTabData: IHeaderTab;

  constructor() {
  }

  ngOnInit(): void {

    this.setMenuPosition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.headerTabElement && this.mainHeaderElement) {
      this.animateMenuCursor(this.headerTabElement, this.mainHeaderElement);
    }

    if (changes.headerTabData) {
      this.selectedMenu = changes.headerTabData.currentValue.secondLevelMainMenus[0];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setMenuPosition();
    this.animateMenuCursor(this.headerTabElement, this.mainHeaderElement);
  }

  setMenuPosition(): void {
    const {left, height} = this.mainHeaderElement.getBoundingClientRect();
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.menuItemWidth = viewportWidth > this.menuWidthBreakPoint ? `calc(90vw - ${left}px)` : `calc(100vw - ${left}px)`;
    this.menuItemTopStyle = `${height + 1}px`;
  }

  animateMenuCursor(headerTabElement: any, mainHeaderElement: any): any {
    const headerTabElementWidth = headerTabElement.clientWidth;
    const mainHeaderLeftPosition = mainHeaderElement.getBoundingClientRect().left;
    const headerTabLeftPosition = headerTabElement.getBoundingClientRect().left;
    const cursorWidth = 32;
    this.triangleLeftPosition = `${(headerTabLeftPosition + headerTabElementWidth / 2) - (cursorWidth / 2 + mainHeaderLeftPosition)}px`;
  }

  onSelectMenu(menuItem: IMenu): void {
    this.selectedMenu = menuItem;
  }
}

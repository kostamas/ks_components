import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FavoritesService} from '../favorites.service';
import {MenusService} from '../menus.service';

@Component({
  selector: 'app-sub-menu-item',
  templateUrl: './sub-menu-item.component.html',
  styleUrls: ['./sub-menu-item.component.scss']
})
export class SubMenuItemComponent implements OnInit, OnChanges {
  public lockHeaderResize: boolean = false;
  public favoritesList: IMenuLink[];

  @Input() menuData: IMenu;
  @ViewChild('subMenuContainer') subMenuContainer;

  constructor(public favoriteService: FavoritesService, public menusService: MenusService) {
  }

  ngOnInit(): void {
    this.favoriteService.favoritesList.subscribe(result => this.favoritesList = result);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.menuData && changes.menuData.currentValue) {
      setTimeout(() => this.resizeMainHeader());
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (!this.lockHeaderResize) {
      this.lockHeaderResize = true;
      setTimeout(() => {
        this.resizeMainHeader();
        this.lockHeaderResize = false;
      }, 500);
    }
  }

  resizeMainHeader(): void {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const {x, width} = this.subMenuContainer.nativeElement.getBoundingClientRect();
    if (x + width + 10 > viewportWidth) {
      this.subMenuContainer.nativeElement.style.width = `${viewportWidth - x - 10}px`;
    } else {
      this.subMenuContainer.nativeElement.style.width = 'auto';
    }
  }

  favoriteImgSrc(isFavorite: boolean): string {
    return this.favoriteService.favoriteImgSrc(isFavorite);
  }


  favoriteClick(link: IMenuLink): void {
    this.favoriteService.favoriteClick(link);
  }

  pageClickHandler(selectedPage): void {
    this.menusService.menuTab$.next(selectedPage);
    this.menusService.isMenuItemOpen$.next(false);
  }
}

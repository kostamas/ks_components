import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FavoritesService} from '../../../favorites.service';
import {OverlayService} from '../../../../../services/overlay.service';
import {MenusService} from '../../../menus.service';
import {ModalService} from '../../../../modalModule/modal.service';
import {IModal} from '../../../../../types/modal';

@Component({
  selector: 'app-favorite-side-bar',
  templateUrl: './favorite-side-bar.component.html',
  styleUrls: ['./favorite-side-bar.component.scss']
})
export class FavoriteSideBarComponent implements OnInit, OnDestroy {
  favoriteList: IMenuLink[] = [];
  unsubscribe: any[] = [];
  modal: IModal;

  @Input('data') data: any;

  constructor(public favoriteService: FavoritesService, public menusService: MenusService, public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.modal = this.data.modal;

    this.favoriteList = [];

    this.unsubscribe.push(this.favoriteService.favoriteLoad.subscribe(this.getFavorites));
    this.unsubscribe.push(this.favoriteService.favoritesList.subscribe(results => {
      this.favoriteList = results;
      if (this.favoriteList) {
        this.favoriteList.forEach(p => {
            if (this.menusService.pagesPaths$.value[p.id]) {
              const pagePath = this.menusService.pagesPaths$.value[p.id].path;
              p.path = pagePath[0].name + ' -> ' + pagePath[1].name + ' -> ' + pagePath[2].name;
            }
          }
        );
      }
      this.favoriteService.favoriteLoaded.next();
    }));

    this.getFavorites();
  }

  public getFavorites = () => {
    this.favoriteService.getFavorites();
  };

  favoriteImgSrc(isFavorite: boolean): string {
    return this.favoriteService.favoriteImgSrc(isFavorite);
  }

  favoriteClick(link: IMenuLink): void {
    this.favoriteService.favoriteClick(link);
  }

  pageClickHandler(selectedPage): void {
    this.menusService.pageClick$.next(selectedPage);
    this.menusService.closeMenu$.next(false);
    this.modalService.closeModal(this.modal);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(subscription => subscription.unsubscribe());
  }
}

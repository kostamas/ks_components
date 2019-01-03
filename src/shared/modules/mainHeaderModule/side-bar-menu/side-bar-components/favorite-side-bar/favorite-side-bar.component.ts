import {Component, OnInit} from '@angular/core';
import {FavoritesService} from '../../../favorites.service';
import {OverlayService} from '../../../../../../services/overlay.service';
import {MenusService} from '../../../menus.service';

@Component({
  selector: 'app-favorite-side-bar',
  templateUrl: './favorite-side-bar.component.html',
  styleUrls: ['./favorite-side-bar.component.scss']
})
export class FavoriteSideBarComponent implements OnInit {

  favoriteList: IMenuLink[] = [];

  constructor(public favoriteService: FavoritesService, public overlayService: OverlayService, public menusService: MenusService) {
  }

  ngOnInit(): void {
    this.favoriteList = [];
    this.favoriteService.favoriteLoad.subscribe(() => {
      this.getFavorites();
    });

    this.favoriteService.favoritesList.subscribe(results => {
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
    });
    this.getFavorites();
  }


  public getFavorites(): void {
    this.favoriteService.getFavorites();
  }


  favoriteImgSrc(isFavorite: boolean): string {
    return this.favoriteService.favoriteImgSrc(isFavorite);
  }

  favoriteClick(link: IMenuLink): void {
    this.favoriteService.favoriteClick(link);
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sub-menu-item',
  templateUrl: './sub-menu-item.component.html',
  styleUrls: ['./sub-menu-item.component.scss']
})
export class SubMenuItemComponent implements OnInit {

  @Input() menuData: IMenu;

  constructor() {
  }

  ngOnInit(): void {
  }

  favoriteImgSrc(isFavorite: boolean): string {

    let favoriteIcon: string = '';
    const favoriteIconPath: string = '../../../../assets/icons/images/';
    if (isFavorite) {
      favoriteIcon = 'favorites_on.jpg';
    } else {
      favoriteIcon = 'favorites_off.jpg';
    }
    return favoriteIconPath + favoriteIcon;
  }
}

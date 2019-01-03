import {NgModule} from '@angular/core';
import {MenusService} from './menus.service';
import {MainHeaderComponent} from './main-header.component';
import {SubMenuItemComponent} from './sub-menu-item/sub-menu-item.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {BrowserModule} from '@angular/platform-browser';
import {SideBarMenuComponent} from './side-bar-menu/side-bar-menu.component';
import {FavoriteSideBarComponent} from './side-bar-menu/side-bar-components/favorite-side-bar/favorite-side-bar.component';
import {FavoritesService} from './favorites.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    MenusService,
    FavoritesService
  ],
  declarations: [
    MainHeaderComponent,
    SubMenuItemComponent,
    MenuItemComponent,
    SideBarMenuComponent,
    FavoriteSideBarComponent
  ],
  exports: [
    MainHeaderComponent,
    SideBarMenuComponent
  ],
  entryComponents: [
    FavoriteSideBarComponent
  ]
})
export class MainHeaderModule {
}

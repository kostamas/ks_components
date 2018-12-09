import {NgModule} from '@angular/core';
import {MenusService} from './menus.service';
import {MainHeaderComponent} from './main-header.component';
import {SubMenuItemComponent} from './sub-menu-item/sub-menu-item.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    MenusService
  ],
  declarations: [
    MainHeaderComponent,
    SubMenuItemComponent,
    MenuItemComponent
  ],
  exports: [
    MainHeaderComponent,
  ]
})
export class MainHeaderModule {
}

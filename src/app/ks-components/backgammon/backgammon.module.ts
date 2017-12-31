import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackgammonComponent} from './backgammon.component';
import {GameController} from "./gameController";
import {BackgammonDBService} from "../../adapters/backgammon-adapter/backgammonDB.service";
import {IBackgammonDb} from "./backgammonDb.interface";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BackgammonComponent
  ],
  entryComponents: [
  ],
  exports: [
    BackgammonComponent
  ],
  providers: [GameController]
})
export class BackgammonModule {
  static config(value: IBackgammonDb): ModuleWithProviders {
    return {
      ngModule: BackgammonModule,
      providers: [
        {provide: BackgammonDBService, useValue: value }
      ]
    };
  }
}

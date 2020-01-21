import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackgammonComponent} from './backgammon.component';
import {GameController} from './backgammonGameController';
import {BackgammonDBToken, IBackgammonSrvCtor} from './backgammonDb.types';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {SharedModule} from '../../core/sharedModule.module';
import {AngularFireDatabase} from '@angular/fire/database';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    BackgammonComponent
  ],
  entryComponents: [],
  exports: [
    BackgammonComponent
  ],
  providers: [GameController]
})
export class BackgammonModule {
  static config(backgammonSrv: IBackgammonSrvCtor): ModuleWithProviders {
    return {
      ngModule: BackgammonModule,
      providers: [{
        provide: BackgammonDBToken,
        useClass: backgammonSrv,
        deps: [AngularFireDatabase]
      }]
    };
  }
}

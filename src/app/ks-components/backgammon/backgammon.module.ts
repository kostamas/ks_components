import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackgammonComponent} from './backgammon.component';
import {GameController} from './gameController';
import {BackgammonDBToken, IBackgammonSrvCtor} from './backgammonDb.types';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {AngularFireDatabase} from 'angularfire2/database';
import {SharedModule} from '../../core/sharedModule.module';

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

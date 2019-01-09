import {ModuleWithProviders, NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthService} from '../../services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoaderModule} from '../loader-module/loader..module';
import {PopupModule} from '../popupModule/popup.module';
import {LoginConfig, LoginService} from './login.service';
import {ILoginConfig} from '../../types/login';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderModule,
    PopupModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    LoginService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
  static config(loginConfig: ILoginConfig): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: [{provide: LoginConfig, useValue:loginConfig}]
    };
  }
}

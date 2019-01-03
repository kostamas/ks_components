import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthService} from '../../services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoaderModule} from '../loader-module/loader..module';
import {PopupModule} from '../popupModule/popup.module';

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
    AuthService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}

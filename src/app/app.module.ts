import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BModule} from "../D_I_Research/B.module";
import {AModule} from "../D_I_Research/A.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AModule,
    BModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

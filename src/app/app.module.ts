import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {Routing} from './app.routes';
import {Http, HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdaptersModulesModule} from './adapters/adapters.module';
import {KsChat} from './ks-components/ks-chat/ks-chat.module';
import {BModule} from "../D_I_Research/B.module";
import {AModule} from "../D_I_Research/A.module";

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '../assets/locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    AdaptersModulesModule,
    Routing,
    HttpModule,
    KsChat,
    AModule,
    BModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

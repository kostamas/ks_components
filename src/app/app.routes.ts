import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BackgammonComponent} from './components/backgammon/backgammon.component';
import {OnlineGameComponent} from './components/online-game/online-game.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'backgammon', component: BackgammonComponent},
  {path: 'backgammon/:gameId', component: BackgammonComponent},
  {path: 'online', component: OnlineGameComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);

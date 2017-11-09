import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SchedulerAdapterComponent} from './adapters/scheduler-adapter/scheduler-adapter.component';
import {KsChatComponent} from './ks-components/ks-chat/ks-chat.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,},
  {path: 'scheduler', component: SchedulerAdapterComponent},
  {path: 'chat', component: KsChatComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);

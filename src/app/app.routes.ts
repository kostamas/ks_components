import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SchedulerAdapterComponent} from './adapters/scheduler-adapter/scheduler-adapter.component';
import {ChatAdapterComponent} from './adapters/chat-adapter/chat-adapter.component';
import {ImageZoomerAdapterComponent} from './adapters/image-zoomer-adapter/image-zoomer-adapter.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,},
  {path: 'scheduler', component: SchedulerAdapterComponent},
  {path: 'chat', component: ChatAdapterComponent},
  {path: 'image-zoomer', component: ImageZoomerAdapterComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);

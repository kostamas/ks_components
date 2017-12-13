import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SchedulerAdapterComponent} from './adapters/scheduler-adapter/scheduler-adapter.component';
import {ChatAdapterComponent} from './adapters/chat-adapter/chat-adapter.component';
import {ImageExpanderAdapterComponent} from './adapters/image-expander-adapter/image-expander-adapter.component';
import {TransparentShapeModalAdapterComponent} from './adapters/transparent-shape-modal-adapter/transparent-shape-modal-adapter.component';
import {BackgammonAdapterComponent} from './adapters/backgammon-adapter/backgammon-adapter.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,},
  {path: 'scheduler', component: SchedulerAdapterComponent},
  {path: 'chat', component: ChatAdapterComponent},
  {path: 'image-expander', component: ImageExpanderAdapterComponent},
  {path: 'transparent-shape-modal', component: TransparentShapeModalAdapterComponent},
  {path: 'backgammon', component: BackgammonAdapterComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);

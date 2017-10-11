import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CalendarAdapterComponent} from './adapters/calendar-adapter/calendar-adapter.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'calendar', component: CalendarAdapterComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);

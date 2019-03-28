import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainHeaderConfiguration implements IMainHeaderConfig {
  sideBarCustomClass: string = 'distribution-side-bar';
}


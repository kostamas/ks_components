import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="home-navigation" routerLink="/home" [routerLinkActive]="['home']">Home</div>
    <router-outlet></router-outlet>`,
  styleUrls:['./app.component.scss']
})
export class AppComponent {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}

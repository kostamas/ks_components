import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="home-navigation" routerLink="/home" [routerLinkActive]="['home']">Home</div>
    <router-outlet></router-outlet>`,
  styles: [`.home-navigation {
    width: 80px;
    height: 40px;
    background-color: #22d470;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.75);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    left: 50px;
    top: 20px;
    position: absolute;
    font-size: 19px;
  }

  .home-navigation:hover {
    opacity: 0.8;
  }

  .home-navigation.home {
    display: none;
  }
  `]
})
export class AppComponent {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}

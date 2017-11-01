import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`.home-navigation {
    width: 100px;
    height: 50px;
    background-color: #6a6f95;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.75);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    left: 54px;
    top: 20px;
    position: absolute;
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

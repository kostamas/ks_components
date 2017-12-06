import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {
    console.log('   AppModule');
    console.log('   /        \\');
    console.log('AModule       BModule');
    console.log('                    \\');
    console.log('                    CModule');
    console.log('check: \n 1.aSrv === bSrv --> true \n 2.aSrv === cSrv --> false')
  }
}

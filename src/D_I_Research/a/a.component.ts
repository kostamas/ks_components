import {Component, OnInit} from '@angular/core';
import {TestService} from "../testService.service";

@Component({
  selector: 'app-a',
  template:''
})
export class AComponent implements OnInit {

  constructor(public testService: TestService) {
    let _window: any = window;
    _window.aSrv = testService;
  }

  ngOnInit() {
    this.testService.x += 'a changed testService ';
    console.log(this.testService.x);
  }
}

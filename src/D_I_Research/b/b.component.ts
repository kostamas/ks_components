import { Component, OnInit } from '@angular/core';
import {TestService} from "../testService.service";

@Component({
  selector: 'app-b',
  template:''
})
export class BComponent implements OnInit {

  constructor(public testService: TestService) {
    const _window:any = window;
    _window.bSrv = testService;
  }

  ngOnInit() {
    this.testService.x += 'b-';
    console.log(this.testService.x);
  }
}

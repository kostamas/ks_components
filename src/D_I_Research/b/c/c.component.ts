import {Component, OnInit} from '@angular/core';
import {TestService} from "../../testService.service";

@Component({
  selector: 'app-c',
  template:'',
  providers:[TestService]
})
export class CComponent implements OnInit {

  constructor(public testService: TestService) {
    let _window: any = window;
    _window.cSrv = testService;
  }

  ngOnInit() {
    this.testService.x += 'c changed testService';
    console.log(this.testService.x);
  }

}

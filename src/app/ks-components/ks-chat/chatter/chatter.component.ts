import {Component, Input, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from "../ks-chat.constant";

@Component({
  selector: 'app-chatter',
  templateUrl: './chatter.component.html',
  styleUrls: ['./chatter.component.scss']
})
export class ChatterComponent implements OnInit {
  public MAX_UN_SEEN_MESSAGES = MAX_UN_SEEN_MESSAGES;


  public onlineIndicatorMap = {
    ['2']: 'online',
    ['1']: 'idle',
    ['0']: 'offline'
  };

  @Input() chatter;
  @Input() localUser;

  constructor() {
  }

  ngOnInit() {

  }

}

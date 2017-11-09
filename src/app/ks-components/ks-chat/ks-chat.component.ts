import {Component, Input, OnInit} from '@angular/core';
import {MAX_UN_SEEN_MESSAGES} from "./znk-chat.constant";

@Component({
  selector: 'app-ks-chat',
  templateUrl: './ks-chat.component.html',
  styleUrls: ['./ks-chat.component.scss']
})
export class KsChatComponent implements OnInit {
  public MAX_UN_SEEN_MESSAGES = MAX_UN_SEEN_MESSAGES;
  public maxNumUnseenMessages;
  public CHAT_VIEWS = {CHAT_BUTTON_VIEW:1, CHAT_VIEW:2};
  public currentChatView;

  @Input() localUser;
  constructor() { }

  ngOnInit() {
    this.currentChatView = this.CHAT_VIEWS.CHAT_VIEW;
  }

  public openChat(){

  }

}

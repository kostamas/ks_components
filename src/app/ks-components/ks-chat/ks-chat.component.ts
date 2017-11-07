import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ks-chat',
  templateUrl: './ks-chat.component.html',
  styleUrls: ['./ks-chat.component.scss']
})
export class KsChatComponent implements OnInit {
  public numOfUnSeenMessages;
  public maxNumUnseenMessages;
  public currentChatView;
  public CHAT_VIEWS = {CHAT_BUTTON_VIEW:1, CHAT_VIEW:2};

  constructor() { }

  ngOnInit() {
  }

  public openChat(){

  }
}

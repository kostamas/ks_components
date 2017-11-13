import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  public messageStyleClass;

  @Input() message;
  @Input() localUser;

  constructor() {
  }

  ngOnInit() {
    this.messageStyleClass = this.localUser.id === this.message.userId ? 'myMessage' : 'otherMessage';
  }
}

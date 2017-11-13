import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatStoreService} from '../services/chat-store.service';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat-pane',
  templateUrl: './chat-pane.component.html',
  styleUrls: ['./chat-pane.component.scss']
})
export class ChatPaneComponent implements OnInit, AfterViewChecked {
  public activeChatter: any;
  public message;

  @Input() localUser;
  @Input() actions;
  @ViewChild('chatScrollBar') private myScrollContainer: ElementRef;

  constructor(private chatStoreService: ChatStoreService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatStoreService.onActiveChatter(activeChatter => {
      this.activeChatter = activeChatter;
    });

    this.actions.scrollToBottom = this.scrollToBottom;
  }

  public keyPressHandler(keyCode) {
    if (keyCode === 13) {
      this.chatService.updateMessages(this.message, this.activeChatter.chat, this.localUser);
      this.message = '';
    }
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}


import {NgModule} from '@angular/core';
import {ChatterComponent} from './chatter/chatter.component';
import {ChatParticipantsComponent} from './chat-participants/chat-participants.component';
import {ChatPaneComponent} from './chat-pane/chat-pane.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {KsChatComponent} from './ks-chat.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ChatMessageComponent,
    ChatPaneComponent,
    ChatParticipantsComponent,
    ChatterComponent,
    KsChatComponent
  ],
  exports: [
    ChatMessageComponent,
    ChatPaneComponent,
    ChatParticipantsComponent,
    ChatterComponent,
    KsChatComponent
  ],
  providers: [
  ]
})
export class KsChat {
}

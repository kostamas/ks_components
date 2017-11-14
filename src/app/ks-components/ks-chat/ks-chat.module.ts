import {NgModule} from '@angular/core';
import {ChatterComponent} from './chatter/chatter.component';
import {ChatParticipantsComponent} from './chat-participants/chat-participants.component';
import {ChatPaneComponent} from './chat-pane/chat-pane.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {KsChatComponent} from './ks-chat.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
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

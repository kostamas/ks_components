import {ModuleWithProviders, NgModule} from '@angular/core';
import {ChatterComponent} from './chatter/chatter.component';
import {ChatParticipantsComponent} from './chat-participants/chat-participants.component';
import {ChatPaneComponent} from './chat-pane/chat-pane.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {KsChatComponent} from './chat.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {ChatDataCtor, ChatData} from './services/chatData.types';
import {ChatService} from './services/chat.service';

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
    ChatService
  ]
})
export class ChatModule {
  static config(chatDataService: ChatDataCtor): ModuleWithProviders {
    return {
      ngModule: ChatModule,
      providers: [{
        provide: ChatData,
        useClass: chatDataService
      }]
    };
  }
}

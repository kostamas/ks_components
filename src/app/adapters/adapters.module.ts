import {NgModule} from '@angular/core';
import {SchedulerModule} from '../ks-components/ks-scheduler/scheduler.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MatProgressBarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatSliderModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import {SchedulingMockData} from './scheduler-adapter/schedulingMockData';

import {SchedulerAdapterComponent} from './scheduler-adapter/scheduler-adapter.component';
import {SimpleTimeSlotComponent} from './scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component';
import {AdvancedComponentComponent} from './scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component';
import {TimeSlotDetailsModalComponent} from './scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component';
import {ChatAdapterComponent} from './chat-adapter/chat-adapter.component';
import {KsChat} from '../ks-components/ks-chat/ks-chat.module';
import {ChatMock} from './chat-adapter/chat-mock';
import {ChatService} from '../ks-components/ks-chat/services/chat.service';
import {ChatAdapterWrapperComponent} from './chat-adapter/chat-wrapper.component';
import {ImageExpanderAdapterComponent} from './image-expander-adapter/image-expander-adapter.component';
import {ImageExpander} from '../ks-components/image-expander/image-expander.module';
import {TransparentShapeModalModule} from '../ks-components/transparent-shape-modal/transparent-shape-modal.module';
import {TransparentShapeModalAdapterComponent} from './transparent-shape-modal-adapter/transparent-shape-modal-adapter.component';
import {BackgammonModule} from '../ks-components/backgammon/backgammon.module';
import {BackgammonAdapterComponent} from './backgammon-adapter/backgammon-adapter.component';

@NgModule({
  imports: [
    SchedulerModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    KsChat,
    ImageExpander,
    MatButtonModule,
    TransparentShapeModalModule,
    MatSliderModule,
    FormsModule,
    BackgammonModule
  ],
  declarations: [
    SchedulerAdapterComponent,
    SimpleTimeSlotComponent,
    AdvancedComponentComponent,
    TimeSlotDetailsModalComponent,
    ChatAdapterComponent,
    ChatAdapterWrapperComponent,
    ImageExpanderAdapterComponent,
    TransparentShapeModalAdapterComponent,
    BackgammonAdapterComponent
  ],
  exports: [],
  entryComponents: [
    SimpleTimeSlotComponent,
    AdvancedComponentComponent,
    TimeSlotDetailsModalComponent
  ],
  providers: [
    SchedulingMockData,
    {
      provide: ChatService,
      useFactory: chatServiceConfigFn
    }
  ],
})
export class AdaptersModulesModule {
}

export function chatServiceConfigFn() {
  return new ChatService(ChatMock.chatDataHandler());
}


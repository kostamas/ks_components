import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import {MatProgressBarModule, MatIconModule, MatButtonModule, MatSliderModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

import {SchedulerAdapterComponent} from './scheduler-adapter/scheduler-adapter.component';
import {SimpleTimeSlotComponent} from './scheduler-adapter/customTimeSlots/simple-time-slot/simple-time-slot.component';
import {AdvancedComponentComponent} from './scheduler-adapter/customTimeSlots/advanced-component/advanced-component.component';
import {TimeSlotDetailsModalComponent} from './scheduler-adapter/customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component';
import {ChatAdapterComponent} from './chat-adapter/chat-adapter.component';

import {ChatAdapterWrapperComponent} from './chat-adapter/chat-wrapper.component';
import {ImageExpanderAdapterComponent} from './image-expander-adapter/image-expander-adapter.component';
import {BackgammonAdapterComponent} from './backgammon-adapter/backgammon-adapter.component';
import {GalleryAdapterComponent} from './gallery-adapter/gallery-adapter.component';
import {TransparentShapeModalAdapterComponent} from './transparent-shape-modal-adapter/transparent-shape-modal-adapter.component';

import {BackgammonDBSAdapter} from './backgammon-adapter/backgammonDB.service';

import {SchedulerModule} from '../ks-components/ks-scheduler/scheduler.module';
import {BackgammonModule} from '../ks-components/backgammon/backgammon.module';
import {ChatModule} from '../ks-components/chat/chat.module';
import {GalleryModule} from '../ks-components/gallery/gallery.module';
import {ImageExpanderModule} from '../ks-components/image-expander/image-expander.module';
import {TransparentShapeModalModule} from '../ks-components/transparent-shape-modal/transparent-shape-modal.module';

import {ChatDataService} from './chat-adapter/chatDataService';

@NgModule({
  imports: [
    SchedulerModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    ChatModule,
    ImageExpanderModule,
    MatButtonModule,
    TransparentShapeModalModule,
    MatSliderModule,
    FormsModule,
    BackgammonModule.config(BackgammonDBSAdapter),
    ChatModule.config(ChatDataService),
    GalleryModule,
    ImageExpanderModule,
    TransparentShapeModalModule
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
    BackgammonAdapterComponent,
    GalleryAdapterComponent
  ],
  exports: [],
  entryComponents: [
    SimpleTimeSlotComponent,
    AdvancedComponentComponent,
    TimeSlotDetailsModalComponent
  ],
  providers: [],
})
export class AdaptersModulesModule {
}

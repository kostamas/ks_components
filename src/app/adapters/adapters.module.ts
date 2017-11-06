import {NgModule} from '@angular/core';
import {SchedulerModule} from '../ks-components/ks-scheduler/scheduler.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule, MatProgressBarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import {SchedulingMockData} from './scheduler-adapter/schedulingMockData';

import {SchedulerAdapterComponent} from './scheduler-adapter/scheduler-adapter.component';
import {SimpleTimeSlotComponent} from './customTimeSlots/simple-time-slot/simple-time-slot.component';
import {AdvancedComponentComponent} from './customTimeSlots/advanced-component/advanced-component.component';
import {TimeSlotDetailsModalComponent} from './customTimeSlots/advanced-component/time-slot-details-modal/time-slot-details-modal.component';

@NgModule({
  imports: [
    SchedulerModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule
  ],
  declarations: [
    SchedulerAdapterComponent,
    SimpleTimeSlotComponent,
    AdvancedComponentComponent,
    TimeSlotDetailsModalComponent
  ],
  exports: [],
  entryComponents: [
    SimpleTimeSlotComponent,
    AdvancedComponentComponent,
    TimeSlotDetailsModalComponent
  ],
  providers: [
    SchedulingMockData
  ]
})
export class AdaptersModulesModule {
}

import {Component, Input} from '@angular/core';
import {TimeSlotDetailsModalComponent} from './time-slot-details-modal/time-slot-details-modal.component';
import {MatDialog} from '@angular/material';
import {SchedulingMockData} from '../../scheduler-adapter/schedulingMockData';

@Component({
  selector: 'app-advanced-component',
  templateUrl: './advanced-component.component.html',
  styleUrls: ['./advanced-component.component.scss']
})
export class AdvancedComponentComponent {

  @Input() title;
  @Input() eventId;
  public event;

  constructor(public dialog: MatDialog, public schedulingMockData: SchedulingMockData) {
  }

  public detailsHandler = () => {
    this.event = this.schedulingMockData.getEventById(this.eventId);

    this.dialog.open(TimeSlotDetailsModalComponent, {
      height: '550px',
      width: '500px',
      data: {event: this.event}
    });
  }
}

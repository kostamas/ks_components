import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'time-slot-details-modal',
  styleUrls:[ './time-slot-details-modal.component.scss'],
  templateUrl: './time-slot-details-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TimeSlotDetailsModalComponent implements OnInit {
  public event;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.event = this.data.event
  }
}


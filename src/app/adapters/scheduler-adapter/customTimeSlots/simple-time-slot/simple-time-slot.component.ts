import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-time-slot',
  templateUrl: './simple-time-slot.html',
  styleUrls: ['./simple-time-slot.component.scss']
})
export class SimpleTimeSlotComponent implements OnInit {
  @Input() date;
  @Input() title;
  @Input() backgroundColor = '#90EC42';
  @Input() color = 'white';
  constructor() {
  }

  ngOnInit() {
  }
}

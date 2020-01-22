import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISwitchText} from '../../../types/buttons';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() text: ISwitchText;
  @Input() enabled: boolean = true;
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  clickHandler(): void {
    this.enabled = !this.enabled;
    this.onClick.next(this.enabled);
  }
}

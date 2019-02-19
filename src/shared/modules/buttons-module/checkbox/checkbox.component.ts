import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ICheckboxItem} from '../../../types/buttons';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements OnInit {

  @Input('item') item: ICheckboxItem;
  @Input('isManualControl') isManualControl: boolean;
  @Output('onChecked') onChecked: EventEmitter<any> = new EventEmitter<any>();
  @Input('id') id: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  checkboxChecked(): void {
    if (!this.isManualControl) {
      this.item.isSelected = !this.item.isSelected;
    }
    this.onChecked.next(this.item);
  }
}

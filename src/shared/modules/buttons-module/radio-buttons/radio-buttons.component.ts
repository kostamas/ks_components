import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRadioButton} from '../../../types/buttons';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {

  @Input() radioButtons: IRadioButton[] = [];

  @Output() radioButtonClick: EventEmitter<{ checkedButton: IRadioButton, index: number }> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  clickHandler(index: number): void {
    this.radioButtons.forEach((btn: IRadioButton) => btn.isChecked = false);
    this.radioButtons[index].isChecked = true;
    this.radioButtonClick.emit({checkedButton: this.radioButtons[index], index});
  }
}

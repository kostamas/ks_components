import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IRadioButton} from '../../../types/buttons';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
	selector: 'app-radio-buttons',
	templateUrl: './radio-buttons.component.html',
	styleUrls: ['./radio-buttons.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class RadioButtonsComponent implements OnInit {
	@Input() radioButtons: IRadioButton[] = [];
	@Input() isDisabled: boolean = false;

	@Output() radioButtonClick: EventEmitter<{ checkedButton: IRadioButton, index: number }> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
	}

	clickHandler(index: number): void {
		if (!JsUtils.isDefined(this.radioButtons[index].isSelected) || this.radioButtons[index].isSelected === false) {
			this.radioButtons.forEach((btn: IRadioButton) => btn.isSelected = false);
			this.radioButtons[index].isSelected = true;
			this.radioButtonClick.emit({checkedButton: this.radioButtons[index], index});
		}
	}
}

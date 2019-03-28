import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ISelectItem} from '../../../../../types/ISelect';
import {SelectInputService} from '../../select-input.service';

@Component({
	selector: 'app-select-regular-options',
	templateUrl: './select-regular-options.component.html',
	styleUrls: ['./select-regular-options.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SelectRegularOptionsComponent implements OnInit {
	public selectList: ISelectItem[];

	@Input('data') data: any;

	constructor(private selectInputService: SelectInputService) {
	}

	ngOnInit(): void {
		this.selectList = this.data ? this.data.selectList : [];
	}

  selectValue(index: string): void {
		this.selectInputService.resetOptionsList(this.selectList);
		this.selectList[index].isSelected = true;
    this.data.onSelectItem(index, this.selectList[index].value, true);
  }
}

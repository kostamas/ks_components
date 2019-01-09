import {Component, Input, OnInit} from '@angular/core';
import {IMultipleSelectItem} from '../../../../types/IMultipleSelect';

@Component({
  selector: 'app-multi-select-regular-options',
  templateUrl: './multi-select-regular-options.component.html',
  styleUrls: ['./multi-select-regular-options.component.scss']
})
export class MultiSelectRegularOptionsComponent implements OnInit {
  public selectList: IMultipleSelectItem[];

  @Input('data') data: any;

  constructor() {
  }

  ngOnInit(): void {
    this.selectList = this.data.selectList;
  }

  selectValue(index: string): void {
    this.selectList[index].isSelected = true;
    this.data.getSelection(index, this.selectList[index].value, true);
  }
}

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ISelectItem} from '../../../../types/ISelect';

@Component({
  selector: 'app-select-regular-options',
  templateUrl: './select-regular-options.component.html',
  styleUrls: ['./select-regular-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectRegularOptionsComponent implements OnInit {
  public selectList: ISelectItem[];

  @Input('data') data: any;

  constructor() {
  }

  ngOnInit(): void {
    this.selectList = this.data ? this.data.selectList : [];
  }

  selectValue(index: string): void {
    this.selectList[index].isSelected = true;
    this.data.getSelection(index, this.selectList[index].value, true);
  }
}

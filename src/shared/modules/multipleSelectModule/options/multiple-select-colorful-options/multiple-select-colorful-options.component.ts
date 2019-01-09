import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IMultipleSelectItem} from '../../../../types/IMultipleSelect';

@Component({
  selector: 'app-multiple-select-colorful-options',
  templateUrl: './multiple-select-colorful-options.component.html',
  styleUrls: ['./multiple-select-colorful-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultipleSelectColorfulOptionsComponent implements OnInit {

  @Input('data') data: any;
  public selectList: IMultipleSelectItem[];
  public allOptionItem: any = {value: 'all', isSelected: true};

  constructor() {
  }

  ngOnInit(): void {
    this.selectList = this.data.selectList;
    this.calcAllOptionItem();
  }

  calcAllOptionItem(): void {
    const isSelectedExists = this.selectList.filter(m => m.isSelected).length > 0;
    if (isSelectedExists) {
      this.allOptionItem = {value: 'all', isSelected: false};
    } else {
      this.allOptionItem = {value: 'all', isSelected: true};
    }
  }

  selectAll(): void {
    this.allOptionItem.isSelected = !this.allOptionItem.isSelected;
    this.selectList.forEach(option  =>  option.isSelected = false);
    this.selectList['-1'].isSelected = this.allOptionItem.isSelected;
    this.data.getSelection('-1', this.selectList['-1'].value);
  }

  checkboxChecked(index: string): void {
    const value: boolean = !this.selectList[index].isSelected;
    this.selectList[index].isSelected = value;
    this.data.getSelection(index, value);
    this.allOptionItem.isSelected = false;
  }

}

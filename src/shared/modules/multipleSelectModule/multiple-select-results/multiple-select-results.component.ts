import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IMultipleSelectItem} from "../../../types/IMultipleSelect";

@Component({
  selector: 'app-multiple-select-results',
  templateUrl: './multiple-select-results.component.html',
  styleUrls: ['./multiple-select-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultipleSelectResultsComponent implements OnInit {

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

  selectAll(): boolean {
    this.allOptionItem.isSelected = !this.allOptionItem.isSelected;
    this.resetFilter();
    return this.selectList.filter(m => m.isSelected).length === 0;
  }

  checkboxChecked(index: string): void {
    const value: boolean = !this.selectList[index].isSelected;
    this.selectList[index].isSelected = value;
    this.data.getSelection(index, value, this.selectList);
    this.allOptionItem.isSelected = false;
  }

  resetFilter(): void {
    this.selectList.forEach(m => m.isSelected = false);
    this.data.resetSelection();
  }
}

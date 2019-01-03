import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input('item') item: any;
  @Output('onChecked') onChecked = new EventEmitter<any>();
  @Input('id') id: string;

  constructor() {
  }

  ngOnInit() {
  }

  checkboxChecked(){
    this.item.isSelelcted = !this.item.isSelected;
    this.onChecked.next(this.item)
  }
}

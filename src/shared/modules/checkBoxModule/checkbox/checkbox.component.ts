import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input('item') item: any;
  @Output('onChecked') onChecked: EventEmitter<any> = new EventEmitter<any>();
  @Input('id') id: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  checkboxChecked(): void {
    this.item.isSelelcted = !this.item.isSelected;
    this.onChecked.next(this.item)
  }
}

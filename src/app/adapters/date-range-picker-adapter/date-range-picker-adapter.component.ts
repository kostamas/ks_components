import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-range-picker-adapter',
  templateUrl: './date-range-picker-adapter.component.html',
  styleUrls: ['./date-range-picker-adapter.component.scss']
})
export class DateRangePickerAdapterComponent implements OnInit {
  public config = {format: 'DD/MM/YYYY'};
  public from = '';
  public to = '';
  constructor() { }

  ngOnInit() {
  }

  onSelectRange({from, to}) {
    this.from = from;
    this.to = to;
  }
}

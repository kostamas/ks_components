import {Component, OnInit} from '@angular/core';
import {CalendarDatePickerService} from '../../ks-components/calendarModule/calendarDatePicker/calendarDatePicker.service';

@Component({
  selector: 'app-date-range-picker-adapter',
  templateUrl: './date-range-picker-adapter.component.html',
  styleUrls: ['./date-range-picker-adapter.component.scss']
})
export class DateRangePickerAdapterComponent implements OnInit {
  public config = {format: 'DD/MM/YYYY'};
  public from = '';
  public to = '';

  constructor(private calendarDatePickerService: CalendarDatePickerService) {
  }

  ngOnInit() {
  }

  onSelectRange({from, to}) {
    this.from = from;
    this.to = to;
    this.calendarDatePickerService.clearSelectRange();
  }
}

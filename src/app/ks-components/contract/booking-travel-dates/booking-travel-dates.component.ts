import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IDateFromTo} from '../one-contract-object';
import {IFromTo} from '../../../shared/types/calendar';

@Component({
	selector: 'app-booking-travel-dates',
	templateUrl: './booking-travel-dates.component.html',
	styleUrls: ['./booking-travel-dates.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class BookingTravelDatesComponent implements OnInit {
	@Input() bookingDate: IDateFromTo;
	@Input() travelDate: IDateFromTo;

	@Output() bookingDateSelected: EventEmitter<any> = new EventEmitter<any>();
	@Output() travelDateSelected: EventEmitter<any> = new EventEmitter<any>();

	constructor() {
	}

	ngOnInit(): void {
	}

	onSelectRange(date: IFromTo, type: 'booking' | 'travel'): void {
		if (type === 'booking') {
			this.bookingDateSelected.next({dateFrom: date.from, dateTo: date.to});
		}
		if (type === 'travel') {
			this.travelDateSelected.next({dateFrom: date.from, dateTo: date.to});
		}
	}
}

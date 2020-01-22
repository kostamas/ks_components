import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit {
	@Input() data: any;
	@Input() closeModal: any;

	constructor() {
	}

	ngOnInit(): void {
	}

	done(): void {
		if (this.data.done) {
			this.data.done();
		} else {
			this.closeModal();
		}
	}

	cancel(): void {
		if (this.data.done) {
			this.data.cancel();
		} else {
			this.closeModal();
		}
	}
}

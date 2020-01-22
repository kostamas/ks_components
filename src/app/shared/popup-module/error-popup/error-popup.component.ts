import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {
	
	@Input() data: any;
	@Input() closeModal: any;
	
	public traceId: string;
	
	constructor() {}
	
	ngOnInit(): void {
		const data = this.data && this.data.data || {};
		
		this.traceId = data.error && data.error.traceId;
	}

}

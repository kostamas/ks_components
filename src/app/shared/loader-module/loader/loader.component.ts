import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
	public loaderClass: string;

	@Input() text?: string;
	@Input() type?: string;
	@Input() shape?: string;

	ngOnInit(): void {
		this.initLoaderClass();
	}

	initLoaderClass(): void {
		this.loaderClass = ' ';

		switch (this.type) {
			case 'container':
				this.loaderClass += ' container-loader';
				break;
			default:
				this.loaderClass += ' page-loader';
		}

		switch (this.shape) {
			case 'circle':
				this.loaderClass += ' circle-loader';
				break;
			default:
				this.loaderClass += ' rectangle-loader';
		}
	}
}

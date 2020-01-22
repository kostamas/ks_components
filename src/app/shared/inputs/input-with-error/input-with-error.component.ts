import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IValidationStatus} from '../../../types/ISelect';
import {dirtyAndRequired} from '../validators';

@Component({
	selector: 'app-input-with-error',
	templateUrl: './input-with-error.component.html',
	styleUrls: ['./input-with-error.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InputWithErrorComponent implements OnInit, OnDestroy {
	public validationStatus: IValidationStatus = {isValid: true, message: ''};
	public subscriptionsArray: any[] = [];

	@Input() symbol: string = null;
	@Input() hideSymbol: boolean = false;
	@Input() svg: string;
	@Input() inputValue: string;
	@Input() validators: any;
	@Input() validationStatus$: any;
	@Input() required: boolean = false;
	@Input() preventValues: any;
	@Input() preventPaste: boolean = false;
	@Input() tabIndex: number;
	@Input() isDisabled: boolean = false;
	@Input() tooltipText: string;
	@Input() cssClasses: string | string[];

	@Output() inputValueChange: EventEmitter<string> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
		if (this.validationStatus$) {
			this.subscriptionsArray.push(this.validationStatus$.subscribe((valid: IValidationStatus) => this.validationStatus = valid));
		}
		this.initValidators();
		this.validate(false);

		if (this.cssClasses) {
			this.cssClasses = Array.isArray(this.cssClasses) ? this.cssClasses : [this.cssClasses];
		} else {
			this.cssClasses = [];
		}
	}

	initValidators(): void {
		if (this.validators) {
			if (!Array.isArray(this.validators)) {
				this.validators = <((x?: any) => any)[]>[this.validators];
			}
		}

		if (this.required) {
			if (this.validators) {
				this.validators.push(dirtyAndRequired);
			} else {
				this.validators = [dirtyAndRequired];
			}
		}
	}

	validate(isDirty: boolean): void {
		if (this.validators && !this.isDisabled) {
			this.validationStatus = {message: '', isValid: true};
			this.validators.forEach(cb => {
				const validationResult = cb(this.inputValue, isDirty);
				if (!validationResult.isValid) {
					this.validationStatus = validationResult;
				}
			});
		}
	}

	keyPressHandler(event: any): any {
		if (this.preventValues) {
			return this.preventValues(event);
		}
	}

	ngModelChange(): void {
		this.validate(true);
		this.inputValueChange.next(this.inputValue);
	}

	pasteHandler = (): boolean => {
		return !this.preventPaste;
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
	}
}

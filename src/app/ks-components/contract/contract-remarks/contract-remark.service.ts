import {Injectable} from '@angular/core';
import {ISectionPageService} from '../../../../types/one-contract';
import {IOneContractParams} from '../../../../types/one-contract-object';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';

@Injectable()
export class ContractRemarkService implements ISectionPageService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public remarksParams: string = null;
	public isDirty: boolean = false;

	constructor() {
	}

	resetParams = (): void => {
		this.remarksParams = null;
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.remarks = this.remarksParams;
	};

	validateSection = (): Subject<boolean> => {
		const isValid: Subject<boolean> = new Subject();
		setTimeout(() => {
			isValid.next(true);
			isValid.complete();
		});
		return isValid;
	}
}

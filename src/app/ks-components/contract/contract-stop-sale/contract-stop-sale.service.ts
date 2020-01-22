import {Injectable} from '@angular/core';
import {ISectionPageService} from '../../../../types/one-contract';
import {IOneContractParams, IStopSale} from '../../../../types/one-contract-object';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';

@Injectable()
export class ContractStopSaleService implements ISectionPageService {
	public contractStopSaleParams: IStopSale[] = [];
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public isDirty: boolean = false;

	constructor() {
	}

	resetParams = (): void => {
		this.contractStopSaleParams = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.stopSales = this.contractStopSaleParams;
	}

	validateSection = (): Subject<boolean> => {
		const isValid: Subject<boolean> = new Subject();
		setTimeout(() => {
			isValid.next(true);
			isValid.complete();
		});
		return isValid;
	}
}

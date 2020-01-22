import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';
import {IContractCombinationsPrams, ISectionPageService} from '../../../../types/one-contract';
import {IOneContractParams, ISupplementCombination, ITotalDiscount} from '../../../../types/one-contract-object';

@Injectable()
export class ContractCombinationsService implements ISectionPageService {
	public tableRows: IContractCombinationsPrams[] = [];
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public isDirty: boolean = false;

	constructor() {
	}

	resetParams = (): void => {
		this.tableRows = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.supplementCombination = [];
		this.tableRows.forEach((combination: IContractCombinationsPrams) => {
			const combinationObj: ISupplementCombination = {
				supplementCode: combination.supplementCode,
				supplementCodeCombinable: combination.combinationWithOffer,
				sharedAllotment: combination.allotment,
				totalDiscount: []
			};
			if (combination.totalDiscount) {
				combinationObj.totalDiscount = combination.totalDiscount.split('-')
					.map(discount => {
							return <ITotalDiscount>{value: +discount.replace('%', '').trim()};
						}
					);
			}
			oneContract.contractData.supplementCombination.push(combinationObj);
		});
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

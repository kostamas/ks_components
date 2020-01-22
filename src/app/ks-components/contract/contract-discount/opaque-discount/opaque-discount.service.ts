import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';
import {IContractDiscountParams, ISectionPageService} from '../../../../../types/one-contract';
import {IOneContractParams, IOpaqueDiscount} from '../../../../../types/one-contract-object';
import {DISCOUNTS_TYPES} from '../../../one-contract.const';
import {CreateOneContractStoreService} from '../../create-one-contract-store.service';
import {JsUtils} from 'shared-ui-components-lib';

@Injectable()
export class OpaqueDiscountService implements ISectionPageService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public params: IContractDiscountParams = <IContractDiscountParams>{discountRows: [], discountType: 'opaqueDiscount'};
	public isDirty: boolean = false;

	constructor(private oneContractStoreService: CreateOneContractStoreService) {
	}

	resetParams(): void {
		this.params = <IContractDiscountParams>{discountRows: [], discountType: 'opaqueDiscount', shardAllotment: true};
		delete this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES['opaqueDiscount']];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.generalSupplements.opaqueDiscount = [];
		this.params.discountRows.forEach(param => {
			const discount: IOpaqueDiscount = <IOpaqueDiscount>{
				seasons: [{
					seasonCode: param.seasonCode,
					travelWindow: param.seasonCode === 'SD' && param.travelWindow ? JsUtils.deepCopy(param.travelWindow) : null,
					bookingWindow: param.seasonCode === 'SD' && param.bookingWindow ? JsUtils.deepCopy(param.bookingWindow) : null,
					value: null
				}],
				sharedAllotment: this.params.shardAllotment
			};
			const percentage: number = param.discount;
			if (percentage) {
				discount.seasons[0].value = +percentage;
			}
			oneContract.contractData.generalSupplements.opaqueDiscount.push(discount);
		});
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

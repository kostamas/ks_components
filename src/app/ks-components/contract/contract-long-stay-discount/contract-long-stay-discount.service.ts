import {Injectable} from '@angular/core';
import {ILongStayDiscountParams, ISectionPageService} from '../../../../types/one-contract';
import {IDateFromTo, IDiscountType, ILongStayDiscount, IOneContractParams} from '../../../../types/one-contract-object';
import {BehaviorSubject, Subject} from 'rxjs';
import {CommonOneContractService} from '../../common-one-contract.service';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';
import {DISCOUNTS_TYPES} from '../../one-contract.const';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';

@Injectable()
export class ContractLongStayDiscountService implements ISectionPageService {
	public contractLongStayDiscountParams: ILongStayDiscountParams[] = [];
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public isDirty: boolean = false;

	constructor(public commonOneContractService: CommonOneContractService, private oneContractStoreService: CreateOneContractStoreService) {
	}

	resetParams = (): void => {
		this.contractLongStayDiscountParams = [];
		delete this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES['longStayDiscount']];
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		this.contractLongStayDiscountParams.forEach(row => {
			const longStayDiscount: ILongStayDiscount = <ILongStayDiscount>{
				isNRF: row.nrf,
				stayNights: row.stayNights || row.stayNights === 0 ? row.stayNights : null,
				supplementCode: null,
				seasons: []
			};
			if (row.periodType === 'SD') {
				const seasonDiscountObj: IDiscountType = <IDiscountType>{
					value: +row.discount,
					seasonCode: 'SD',
					bookingWindow: null,
					travelWindow: null
				};
				if (row.travelWindow) {
					seasonDiscountObj.travelWindow = <IDateFromTo>{
						dateFrom: row.travelWindow.dateFrom,
						dateTo: row.travelWindow.dateTo
					};
				}
				if (row.bookingWindow) {
					seasonDiscountObj.bookingWindow = <IDateFromTo>{
						dateFrom: row.bookingWindow.dateFrom,
						dateTo: row.bookingWindow.dateTo
					};
				}
				longStayDiscount.seasons.push(seasonDiscountObj);
			}
			if (row.periodType === 'CP') {
				longStayDiscount.seasons.push(<IDiscountType>{
					value: row.discount || row.discount === 0 ? +row.discount : null,
					seasonCode: 'CP',
					travelWindow: null,
					bookingWindow: null
				});
			}
			oneContract.contractData.generalSupplements.longStayDiscount.push(longStayDiscount);
		});
		this.validation.next({isValid: true, message: ''});
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

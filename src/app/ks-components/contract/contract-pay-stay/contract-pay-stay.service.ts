import {Injectable} from '@angular/core';
import {IFreeSaleParams, ISectionPageService} from '../../../../types/one-contract';
import {IDateFromTo, IDiscountType, IFree, IOneContractParams} from '../../../../types/one-contract-object';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';

@Injectable()
export class ContractPayStayService implements ISectionPageService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public contractPayStayPrams: IFree[] = [];
	public tableRows: IFreeSaleParams[] = [];
	public isDirty: boolean = false;

	constructor() {
	}

	resetParams = (): void => {
		this.contractPayStayPrams = [];
		this.tableRows = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.free = [];
		this.tableRows.forEach((row: IFreeSaleParams) => {
			const freeSaleDiscount: IFree = <IFree>{
				isNRF: row.nrf,
				payNights: row.payNights,
				stayNights: row.stayNights,
				seasons: []
			};
			if (row.type === 'SD') {
				const seasonDiscountObj: IDiscountType = <IDiscountType>{
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
				freeSaleDiscount.seasons.push(seasonDiscountObj);
			}
			if (row.type === 'CP') {
				freeSaleDiscount.seasons.push(<IDiscountType>{
					seasonCode: 'CP',
					bookingWindow: null,
					travelWindow: null
				});
			}
			oneContract.contractData.free.push(freeSaleDiscount);
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

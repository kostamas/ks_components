import {Injectable} from '@angular/core';
import {IRatesParams, ISectionPageService} from '../../../../types/one-contract';
import {IOneContractParams, IRate} from '../../../../types/one-contract-object';
import {JsUtils} from 'shared-ui-components-lib';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {take} from 'rxjs/operators';

@Injectable()
export class ContractRatesService implements ISectionPageService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public ratesParams: IRatesParams[] = [];
	public vatIncluded: boolean = true;
	public applicationType: string = 'Unit';
	public isDirty: boolean = false;

	constructor(private createOneContractStoreService: CreateOneContractStoreService) {
	}

	resetParams = (): void => {
		this.ratesParams = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		const {vatIncluded, applicationType} = this;
		oneContract.contractData.rateData = {rates: [], vatIncluded, applicationType};
		oneContract.contractData.seasons = [];
		this.ratesParams.forEach(rate => {
			const rateObj: IRate = {
				roomCode: rate.roomAndCharacteristic && rate.roomAndCharacteristic.split(',')[0] || null,
				characteristicCode: rate.roomAndCharacteristic && rate.roomAndCharacteristic.split(',')[1].trim() || null,
				type: []
			};

			rate.seasons.forEach((seasonData, index) => {
				const season = JsUtils.numberToLatter(index + 1, true);
				const seasonsDataKeys = Object.keys(seasonData);
				if (JsUtils.isDefined(seasonsDataKeys) && !JsUtils.isEmpty(seasonsDataKeys)) {
					if (seasonsDataKeys[0] !== 'season') {
						rateObj.type.push({seasonCode: season + ' WKDY', value: +seasonData.seasonWKDY});
						rateObj.type.push({seasonCode: season + ' WKND', value: +seasonData.seasonWKND});
					} else {
						rateObj.type.push({seasonCode: season, value: +seasonData.season});
					}
				}
			});

			oneContract.contractData.rateData.rates.push(rateObj);
		});
	};

	validateSection = (): Subject<boolean> => {
		const isValid: Subject<boolean> = new Subject();
		setTimeout(() => {
			this.createOneContractStoreService.contractDateRange$.pipe(take(1)).subscribe(dateRange => {
				if (dateRange && dateRange.from && dateRange.to) {
					isValid.next(true);
					this.validation.next({isValid: true, message: ''});
				} else {
					isValid.next(false);
					const message = 'Please select Start/End Dates';
					this.validation.next({isValid: false, message});
				}
				isValid.complete();
			});
		});
		return isValid;
	}
}

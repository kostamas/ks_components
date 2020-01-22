import {Injectable} from '@angular/core';
import {JsUtils, ALL_OPTION, currencies} from 'shared-ui-components-lib';
import {ISelectItem, IValidationStatus} from 'shared-ui-components-lib/types/ISelect';
import {BehaviorSubject, Subject} from 'rxjs';
import {IPopulateService, ISectionPageService} from '../../../../types/one-contract';
import {IContractHeader, INameId, IOneContractParams} from '../../../../types/one-contract-object';

@Injectable()
export class ContractDetailsService implements ISectionPageService, IPopulateService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public contractDetailsParams: IContractHeader = <IContractHeader>{
		boardBase: <INameId>{}, includedCountries: [], excludedCountries: []
	};
	public currencyOptions: ISelectItem[] = [];
	public isDirty: boolean = false;

	public yesNoOptions = (isSelectedOption: boolean = null): ISelectItem[] => {
		return [{id: true, name: 'Yes', isSelected: isSelectedOption !== null && isSelectedOption},
			{id: false, name: 'No', isSelected: isSelectedOption !== null && !isSelectedOption}
		];
	}

	private contractTypeOptions: ISelectItem[] = [
		{name: 'BAR Commissionable', id: 'BR', isSelected: true},
		{name: 'FIT NET', id: 'FN'}
	];
	private paymentModeOptions: ISelectItem[] = [
		{name: 'MERCHANT', id: 'M'},
		{name: 'LIBERATE', id: 'L'},
		{name: 'MERCHANT + LIBERATE', id: 'ML'}
	];
	private boardBasisOptions: any[] = [
		{name: 'Room Only', id: 'RO'},
		{name: 'Self-Catering', id: 'SC'},
		{name: 'Bed & Breakfast', id: 'BB'},
		{name: 'Half Board', id: 'HB'},
		{name: 'Full Board', id: 'FB'},
		{name: 'All Inclusive', id: 'AI'},
	];
	private managedByOptions: ISelectItem[] = [
		{name: 'Office', id: 'Office', isSelected: true},
		{name: 'Hotel', id: 'Hotel'},
		{name: 'HSI', id: 'HSI'}
	];
	private classificationOptions: any[] = [{id: 'NOR', name: 'Normal (NOR)'},
		{id: 'NRF', name: 'Non Refundable (NRF)'},
		{id: 'PAQ', name: 'Packages (PAQ)'}];

	constructor() {
		Object.keys(currencies).forEach(currency => {
			this.currencyOptions.push({name: currency, id: currency});
		});
	}

	resetParams = (): void => {
		this.contractDetailsParams = <IContractHeader>{
			boardBase: <INameId>{}, includedCountries: [], excludedCountries: []
		};
		this.validation.next({isValid: true, message: ''});
	}

	public getContractTypeOptions(): ISelectItem[] {
		return JsUtils.deepCopy(this.contractTypeOptions);
	}

	public getPaymentModeOptions(): ISelectItem[] {
		return JsUtils.deepCopy(this.paymentModeOptions);
	}

	public getBoardBasisOptions(): any[] {
		return JsUtils.deepCopy(this.boardBasisOptions);
	}

	public getManagedByOptions(): ISelectItem[] {
		return JsUtils.deepCopy(this.managedByOptions);
	}

	getYesNoOptions(isSelectedOption: boolean = null): ISelectItem[] {
		return JsUtils.deepCopy(this.yesNoOptions(isSelectedOption));
	}

	getClassificationOptions(): any[] {
		return JsUtils.deepCopy(this.classificationOptions);
	}

	getCurrencyOptions(): ISelectItem[] {
		return JsUtils.deepCopy(this.currencyOptions);
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.contractHeader.contractType = this.contractDetailsParams.contractType;
		oneContract.contractData.contractHeader.commissionPercentage = this.contractDetailsParams.commissionPercentage ? this.contractDetailsParams.commissionPercentage : null;
		oneContract.contractData.contractHeader.recommendedSellingPrice = this.contractDetailsParams.recommendedSellingPrice;
		oneContract.contractData.contractHeader.boardBase = this.contractDetailsParams.boardBase;
		oneContract.contractData.contractHeader.currency = this.contractDetailsParams.currency;
		oneContract.contractData.contractHeader.paymentMode = this.contractDetailsParams.paymentMode;
		oneContract.contractData.contractHeader.classification = this.contractDetailsParams.classification;
		oneContract.contractData.contractHeader.managementType = this.contractDetailsParams.managementType;
		oneContract.contractData.contractHeader.isVisibleWeb = this.contractDetailsParams.isVisibleWeb;
		oneContract.contractData.contractHeader.excludedCountries = this.contractDetailsParams.excludedCountries;

		const includedCountries = this.contractDetailsParams.includedCountries;
		if (!includedCountries || includedCountries.length === 0 || includedCountries[0].id === ALL_OPTION.id) {
			oneContract.contractData.contractHeader.includedCountries = null;
		} else {
			oneContract.contractData.contractHeader.includedCountries = this.contractDetailsParams.includedCountries.map(((option: ISelectItem) => {
				return {name: option.name, id: option.id};
			}));
		}

		if (!oneContract.contractData.contractHeader.excludedCountries || oneContract.contractData.contractHeader.excludedCountries.length === 0) {
			oneContract.contractData.contractHeader.excludedCountries = null;
		} else {
			oneContract.contractData.contractHeader.excludedCountries = this.contractDetailsParams.excludedCountries.map(((option: ISelectItem) => {
				return {name: option.name, id: option.id};
			}));
		}
	}

	validateSection = (): Subject<boolean> => {
		const isValid: Subject<boolean> = new Subject();
		setTimeout(() => {
			isValid.next(true);
			isValid.complete();
		});
		return isValid;
	}

	public populateData = (oneContract: IOneContractParams, loadedObject: IOneContractParams): void => {
		if (loadedObject.contractData.contractHeader.contractType) {
			oneContract.contractData.contractHeader.contractType = loadedObject.contractData.contractHeader.contractType;
		}
		oneContract.contractData.contractHeader.commissionPercentage = loadedObject.contractData.contractHeader.commissionPercentage;
		oneContract.contractData.contractHeader.recommendedSellingPrice = loadedObject.contractData.contractHeader.recommendedSellingPrice;
		if (loadedObject.contractData.contractHeader.boardBase) {
			oneContract.contractData.contractHeader.boardBase = loadedObject.contractData.contractHeader.boardBase;
		}
		oneContract.contractData.contractHeader.currency = loadedObject.contractData.contractHeader.currency;
		oneContract.contractData.contractHeader.paymentMode = loadedObject.contractData.contractHeader.paymentMode;
		oneContract.contractData.contractHeader.classification = loadedObject.contractData.contractHeader.classification;
		oneContract.contractData.contractHeader.includedCountries = loadedObject.contractData.contractHeader.includedCountries;
		if (loadedObject.contractData.contractHeader.managementType) {
			oneContract.contractData.contractHeader.managementType = loadedObject.contractData.contractHeader.managementType;
		}
		oneContract.contractData.contractHeader.isVisibleWeb = loadedObject.contractData.contractHeader.isVisibleWeb;
		oneContract.contractData.contractHeader.excludedCountries = loadedObject.contractData.contractHeader.excludedCountries;
	}
}

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {IAllotment, IContractSeason} from '../one-contract';
import {IAllotmentType, IOneContractParams} from '../one-contract-object';
import {CommonOneContractService} from '../common-one-contract.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContractAllotmentService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public minSecurityAndAllotmentRows: IAllotment[] = [];
	public seasons: IContractSeason[] = [];
	public isDirty: boolean = false;

	constructor(private commonOneContractService: CommonOneContractService) {
	}

	resetParams = (): void => {
		this.minSecurityAndAllotmentRows = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.allotmentCeilingRestriction = [];
		this.minSecurityAndAllotmentRows.forEach(allotment => {
			const season: IAllotmentType [] = [];
			let roomCode = '';
			let characteristicCode = '';
			if (allotment.roomAndCharacteristic) {
				const isAllSharing = allotment.roomAndCharacteristic.split(',')[0] === 'all';
				roomCode = isAllSharing ? 'all' : allotment.roomAndCharacteristic.split(',')[0];
				characteristicCode = isAllSharing ? 'all' : allotment.roomAndCharacteristic.split(',')[1].trim();
			}
			const contractAllotmentObj: any = {
				allotment: allotment.allotment,
				room: {roomCode, characteristicCode},
				seasons: []
			};

			if (allotment.isSeasons) {
				allotment.seasonsValues.forEach((seasonData: any, index: number) => {
					this.commonOneContractService.implementAllotmentSeasonallyValues(index + 1, seasonData, oneContract, season);
				});
			} else {
				season.push({
					seasonCode: 'CP',
					units: allotment.units || allotment.units === 0 ? allotment.units : null,
					nights: allotment.release || allotment.release === 0 ? allotment.release : null,
					price: allotment.ceilingPrice || allotment.ceilingPrice === 0 ? allotment.ceilingPrice : null
				});
			}
			contractAllotmentObj.seasons = season;
			oneContract.contractData.allotmentCeilingRestriction.push(contractAllotmentObj);
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

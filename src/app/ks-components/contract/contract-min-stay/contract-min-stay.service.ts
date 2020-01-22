import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IContractSeason, ISectionPageService} from '../../../../types/one-contract';
import {IOneContractParams, IType} from '../../../../types/one-contract-object';
import {CommonOneContractService} from '../../common-one-contract.service';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';

@Injectable()
export class ContractMinStayService implements ISectionPageService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public contractMinStayParameters: any[] = [];
	public seasons: IContractSeason[] = [];
	public isDirty: boolean = false;

	constructor(private commonOneContractService: CommonOneContractService) {
	}

	resetParams = (): void => {
		this.contractMinStayParameters = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.minimumStay = [];
		this.contractMinStayParameters.forEach(minimumStay => {
			const season: IType [] = [];
			let roomCode = '';
			let characteristicCode = '';
			if (minimumStay.roomAndCharacteristic) {
				const isAllSharing = minimumStay.roomAndCharacteristic.split(',')[0] === 'all';
				roomCode = isAllSharing ? 'all' : minimumStay.roomAndCharacteristic.split(',')[0];
				characteristicCode = isAllSharing ? 'all' : minimumStay.roomAndCharacteristic.split(',')[1].trim();
			}
			const minimumStayObject: any = {room: {roomCode, characteristicCode}};
			if (minimumStay.isSeasons) {
				minimumStay.seasonsValues.forEach((seasonData: any, index: number) => {
					this.commonOneContractService.implementSeasonallyValue(index + 1, seasonData, oneContract, season);
				});
			} else {
				season.push({
					seasonCode: 'CP',
					value: minimumStay.nights,
				});
			}
			minimumStayObject.seasons = season;
			if (season.length > 0) {
				oneContract.contractData.minimumStay.push(minimumStayObject);
			}
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

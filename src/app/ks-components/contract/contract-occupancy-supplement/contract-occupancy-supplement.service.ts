import {Injectable} from '@angular/core';
import {IGuestRoomParams, IGuestRoomTableService, ISectionPageService} from '../../../../types/one-contract';
import {
	IDateFromTo, IDiscountType, IOccupancySupplement, IOneContractParams, IRoom4
} from '../../../../types/one-contract-object';
import {JsUtils} from 'shared-ui-components-lib';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from 'shared-ui-components-lib/types/ISelect';

@Injectable()
export class ContractOccupancySupplementService implements ISectionPageService, IGuestRoomTableService {
	public guestRoomParams: IGuestRoomParams[] = [];
	public tableRows: any[] = [];
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public isDirty: boolean = false;

	constructor() {
	}

	resetParams = (): void => {
		this.guestRoomParams = [];
		this.tableRows = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		this.tableRows.forEach((row: any, index: number) => {
			let roomCode = '';
			let characteristicCode = '';
			if (this.guestRoomParams[index].roomAndCharacteristic) {
				const isAllSharing = this.guestRoomParams[index].roomAndCharacteristic.split(',')[0] === 'all';
				roomCode = isAllSharing ? 'all' : this.guestRoomParams[index].roomAndCharacteristic.split(',')[0];
				characteristicCode = isAllSharing ? 'all' : this.guestRoomParams[index].roomAndCharacteristic.split(',')[1].trim();
			}
			const supplementObj: IOccupancySupplement = {
				guestApplicationType: {id: this.guestRoomParams[index].guest, name: null},
				room: <IRoom4>{roomCode, characteristicCode},
				applicationType: this.guestRoomParams[index].applicationRule ? this.guestRoomParams[index].applicationRule : null,
				seasons: []
			};

			if (row.type === 'S') {
				row.seasonsValues.forEach((seasonData: any, seasonIndex: number) => {
					const season: string = JsUtils.numberToLatter(seasonIndex + 1, true);
					if (seasonData.wkdy) {
						supplementObj.seasons.push(
							<IDiscountType>{seasonCode: season + ' WKDY', value: +seasonData.wkdy, travelWindow: null}
						);
					}
					if (seasonData.wknd) {
						supplementObj.seasons.push(
							<IDiscountType>{seasonCode: season + ' WKND', value: +seasonData.wknd, travelWindow: null}
						);
					}
					if (seasonData.value) {
						supplementObj.seasons.push(<IDiscountType>{seasonCode: season, value: +seasonData.value});
					}
				});
			}
			if (row.type === 'SD') {
				row.selectedDates.forEach((date: any) => {
					date = date.split('-');
					supplementObj.seasons.push(<IDiscountType>{
						value: this.guestRoomParams[index].value,
						seasonCode: 'SD',
						travelWindow: <IDateFromTo>{
							dateFrom: date[0],
							dateTo: date[1],
						}
					});
				});
			}
			if (row.type === 'CP') {
				supplementObj.seasons.push(<IDiscountType>{
					value: JsUtils.isDefineAndNotNull(this.guestRoomParams[index].value) ? +this.guestRoomParams[index].value : null,
					seasonCode: 'CP',
					travelWindow: null
				});
			}
			oneContract.contractData.generalSupplements.occupancySupplements.push(<IOccupancySupplement>supplementObj);
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

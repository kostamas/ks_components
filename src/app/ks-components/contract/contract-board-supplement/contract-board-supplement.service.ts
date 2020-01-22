import {Injectable} from '@angular/core';
import {IContractBoardSupplementPrams, ISectionPageService} from '../one-contract';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IBoardSupplement, IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ContractBoardSupplementService implements ISectionPageService {
	public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
	public contractBoardSupplementPrams: IContractBoardSupplementPrams[] = [];
	public tableRows: any[] = [];
	public isDirty: boolean = false;

	constructor() {
	}

	resetParams = (): void => {
		this.contractBoardSupplementPrams = [];
		this.tableRows = [];
		this.validation.next({isValid: true, message: ''});
	}

	updateOneContract = (oneContract: IOneContractParams) => {
		oneContract.contractData.boardSupplements = [];
		this.tableRows.forEach((row: any, index: number) => {
			let roomCode = '';
			let characteristicCode = '';
			if (this.contractBoardSupplementPrams[index].roomAndCharacteristic) {
				const isAllSharing = this.contractBoardSupplementPrams[index].roomAndCharacteristic.split(',')[0] === 'all';
				roomCode = isAllSharing ? 'all' : this.contractBoardSupplementPrams[index].roomAndCharacteristic.split(',')[0];
				characteristicCode = isAllSharing ? 'all' : this.contractBoardSupplementPrams[index].roomAndCharacteristic.split(',')[1].trim();
			}
			const seasons = [];
			const boardSupplement: IBoardSupplement = {
				board: this.contractBoardSupplementPrams[index].board,
				paxType: this.contractBoardSupplementPrams[index].guest ? this.contractBoardSupplementPrams[index].guest : null,
				room: {roomCode, characteristicCode},
				seasons: []
			};

			if (row.isSeasons) {
				this.tableRows[index].seasonsValues.forEach((seasonData: any, seasonIndex: number) => {
					const season = JsUtils.numberToLatter(seasonIndex + 1, true);
					if (seasonData.wkdy) {
						const newSeason: any = {seasonCode: season + ' WKDY', value: +seasonData.wkdy};
						if (this.contractBoardSupplementPrams[index].board !== 'SC') {
							newSeason.travelWindow = null;
						}
						seasons.push({seasonCode: season + ' WKDY', value: +seasonData.wkdy});
					}
					if (seasonData.wknd) {
						const newSeason: any = {seasonCode: season + ' WKND', value: +seasonData.wknd};
						if (this.contractBoardSupplementPrams[index].board !== 'SC') {
							newSeason.travelWindow = null;

						}
						seasons.push({seasonCode: season + ' WKND', value: +seasonData.wknd});
					}
					if (seasonData.value) {
						seasons.push({seasonCode: season, value: +seasonData.value});
					}
				});
			} else {
				const price = this.contractBoardSupplementPrams[index].price;
				seasons.push({seasonCode: 'CP', value: price || price === '0' ? +price : null});
			}
			boardSupplement.seasons = seasons;
			oneContract.contractData.boardSupplements.push(<IBoardSupplement>boardSupplement);
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

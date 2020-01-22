import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractBoardSupplementService} from './contract-board-supplement.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISelectItem} from '../../../shared/types/ISelect';
import {IContractBoardSupplementPrams, IContractSeason, ISeasonParams} from '../one-contract';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {IBoardSupplement, IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';

@Component({
	selector: 'app-contract-board-supplement',
	templateUrl: './contract-board-supplement.component.html',
	styleUrls: ['./contract-board-supplement.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractBoardSupplementComponent implements OnInit, OnDestroy {
	public tableHeader: string[] = ['Board', 'Guest', 'Room & Characteristic', 'Type', 'Price', ''];
	public roomAndCharacteristic: any[] = [];
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public seasons: IContractSeason[] = [];
	public subscriptionsArray: any[] = [];
	public displayForm: boolean = false;
	public currency: string = '';

	constructor(public oneContractService: CreateOneContractService, private selectInputService: SelectInputService,
							public contractBoardSupplementService: ContractBoardSupplementService,
							private oneContractStoreService: CreateOneContractStoreService, private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		const {subscriptionsArray, oneContractStoreService} = this;
		subscriptionsArray.push(oneContractStoreService.roomAndCharacteristic$.subscribe(this.newRoomAndCharacteristicHandler));
		subscriptionsArray.push(oneContractStoreService.contractSeasons$.subscribe(seasons => {
			this.syncSeasons(seasons);
			this.seasons = seasons;
			setTimeout(() => this.changeDetector.detectChanges());
		}));
		subscriptionsArray.push(oneContractStoreService.selectedCurrency$.subscribe(currency => {
			this.currency = currency;
			setTimeout(() => this.changeDetector.detectChanges());
		}));
		this.subscriptionsArray.push(oneContractStoreService.oneContract$.pipe(
			filter(contract => !contract || !contract.dontUpdateView)
		).subscribe(oneContract => {
			setTimeout(() => this.resetParams(oneContract));
		}));
	}

	resetParams(oneContract: IOneContractParams): void {
		this.contractBoardSupplementService.resetParams();
		this.displayForm = false;
		if (oneContract && oneContract.contractData && oneContract.contractData.boardSupplements && oneContract.contractData.boardSupplements.length) {
			this.displayForm = true;
			const filteredSupplements = JsUtils.deepCopy(oneContract.contractData.boardSupplements);
			const arrLength = filteredSupplements.length;
			for (let i = 0; i < arrLength; i++) {
				this.addRow();
				const boardSupplement: IBoardSupplement = filteredSupplements[i];
				const tableRow: any = this.contractBoardSupplementService.tableRows[i];
				const contractBoardSupplementPrams: any = this.contractBoardSupplementService.contractBoardSupplementPrams[i];

				contractBoardSupplementPrams.board = boardSupplement.board;
				this.onSelectItem({id: boardSupplement.board, name: ''}, i, 'board');
				this.selectInputService.updateIsSelected(tableRow.boardBasisOptions, null, boardSupplement.board);

				contractBoardSupplementPrams.guest = boardSupplement.paxType;
				this.onSelectItem({id: boardSupplement.paxType, name: ''}, i, 'guest');
				this.selectInputService.updateIsSelected(tableRow.guestOptions, null, boardSupplement.paxType);

				const room = boardSupplement.room;
				const sharingAvailability = room.roomCode === 'all' ? 'all' : room.roomCode + ', ' + room.characteristicCode;
				contractBoardSupplementPrams.roomAndCharacteristic = boardSupplement.room.roomCode + ', ' + boardSupplement.room.characteristicCode;
				this.onSelectItem({id: sharingAvailability, name: ''}, i, 'roomAndCharacteristic');
				this.selectInputService.updateIsSelected(tableRow.roomAndCharacteristicOptions, null, sharingAvailability);

				if (boardSupplement.seasons && boardSupplement.seasons.length) {
					this.selectInputService.updateIsSelected(tableRow.rowTypeOptions, null, boardSupplement.seasons[0].seasonCode === 'CP' ? 'period' : 'seasonally');
					this.onSelectItem(<ISelectItem>this.selectInputService.getSelectedItem(tableRow.rowTypeOptions), i, 'rowType');
					boardSupplement.seasons.sort((a: any, b: any) => a.seasonCode > b.seasonCode ? 1 : -1);
					if (boardSupplement.seasons[0].seasonCode === 'CP') {
						const value = boardSupplement.seasons[0].value;
						this.contractBoardSupplementService.contractBoardSupplementPrams[i].price = value ? value.toString() : value;
					} else {
						tableRow.isSeasons = true;
						for (let seasonIndex = 0; seasonIndex < boardSupplement.seasons.length; seasonIndex++) {
							const uiIndex = JsUtils.letterToNumber(boardSupplement.seasons[seasonIndex].seasonCode[0]);
							if (boardSupplement.seasons[seasonIndex].seasonCode.includes('WKND') || boardSupplement.seasons[seasonIndex].seasonCode.includes('WKDY')) {
								if (boardSupplement.seasons[seasonIndex].seasonCode.includes('WKND')) {
									tableRow.seasonsValues[uiIndex].wknd = boardSupplement.seasons[seasonIndex].value;
								}
								if (boardSupplement.seasons[seasonIndex].seasonCode.includes('WKDY')) {
									tableRow.seasonsValues[uiIndex].wkdy = boardSupplement.seasons[seasonIndex].value;
								}
							} else {
								tableRow.seasonsValues[uiIndex].value = boardSupplement.seasons[seasonIndex].value;
							}
						}
					}
				}
			}
		}
		setTimeout(() => this.changeDetector.detectChanges());
	}

	newRoomAndCharacteristicHandler = (roomAndCharacteristic: ISelectItem[]) => {
		if (roomAndCharacteristic) {
			this.roomAndCharacteristic = [];
			if (roomAndCharacteristic.length > 0) {
				this.roomAndCharacteristic.push({id: 'all', name: 'All', isSelected: false});
			}
			roomAndCharacteristic.forEach(room => this.roomAndCharacteristic.push(room));
			this.updateTableByNewRoomAndCharacteristic();
			setTimeout(() => this.changeDetector.detectChanges());
		}
	}

	updateTableByNewRoomAndCharacteristic(): void {
		this.contractBoardSupplementService.tableRows.forEach((row: any) => row.roomAndCharacteristicOptions = JsUtils.deepCopy(this.roomAndCharacteristic));
		this.contractBoardSupplementService.contractBoardSupplementPrams.forEach((params: IContractBoardSupplementPrams, index: number) => {
			if (params.roomAndCharacteristic) {
				const isContain = this.selectInputService.isContains(this.roomAndCharacteristic, null, params.roomAndCharacteristic);
				if (isContain) {
					this.selectInputService.updateIsSelected(this.contractBoardSupplementService.tableRows[index].roomAndCharacteristicOptions, null, params.roomAndCharacteristic);
				}
			}
		});
	}

	onSelectItem(selectItem: ISelectItem, index: number, paramName: string): void {
		if (paramName === 'rowType') {
			this.contractBoardSupplementService.tableRows[index].isSeasons = selectItem.id === 'seasonally';
			if (!this.contractBoardSupplementService.tableRows[index].isSeasons) {
				this.contractBoardSupplementService.tableRows[index].seasonsValues.forEach(r => {
					r.value = undefined;
					r.wkdy = undefined;
					r.wknd = undefined;
				});
			}
		}
		if (selectItem.id === null) {
			delete this.contractBoardSupplementService.contractBoardSupplementPrams[index][paramName];
		} else {
			this.contractBoardSupplementService.contractBoardSupplementPrams[index][paramName] = selectItem.id;
		}
	}

	syncSeasons(seasons: IContractSeason[]): void {
		this.contractBoardSupplementService.tableRows.forEach(r => {
			seasons.forEach((season: IContractSeason, ind: number) => {
				const seasonParams: ISeasonParams = !JsUtils.isDefined(r.seasonsValues[ind]) ? {} : r.seasonsValues[ind];
				this.oneContractService.setSeasonallyTooltipValues(seasonParams, seasons, ind);
				if (!JsUtils.isDefined(r.seasonsValues[ind])) {
					r.seasonsValues.push(seasonParams);
				}
			});
			if (seasons.length < r.seasonsValues.length) {
				r.seasonsValues.splice(seasons.length, r.seasonsValues.length);
			}
		});
	}

	addRow(): void {
		this.contractBoardSupplementService.tableRows.push({
			seasonsValues: [],
			boardBasisOptions: this.oneContractService.getBoardBasisOptions(),
			guestOptions: this.oneContractService.getGuestOptions(),
			rowTypeOptions: this.oneContractService.getPeriodOrSeasonallyOptions(),
			roomAndCharacteristicOptions: JsUtils.deepCopy(this.roomAndCharacteristic),
			isSeasons: false
		});
		this.syncSeasons(this.seasons);
		this.contractBoardSupplementService.contractBoardSupplementPrams.push(<IContractBoardSupplementPrams>{});
	}

	deleteRow(index: number): void {
		this.contractBoardSupplementService.tableRows.splice(index, 1);
		this.contractBoardSupplementService.contractBoardSupplementPrams.splice(index, 1);
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
		this.contractBoardSupplementService.resetParams();
	}
}

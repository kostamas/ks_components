import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {
	ISvgIcons, SVG_ICONS, SelectInputService, JsUtils, InputUtils
} from 'shared-ui-components-lib';
import {ISelectItem, IValidationStatus} from 'shared-ui-components-lib/types/ISelect';
import {CreateOneContractService} from '../create-one-contract.service';
import {IAllotment, IAllotmentSeasonParams, IContractSeason} from '../../../../types/one-contract';
import {ContractAllotmentService} from './contract-allotment.service';
import {IOneContractParams} from '../../../../types/one-contract-object';
import {Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-contract-min-and-security-allotment',
	templateUrl: './contract-allotment.component.html',
	styleUrls: ['./contract-allotment.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractAllotmentComponent implements OnInit, OnDestroy {
	private subscriptionsArray: any[] = [];
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public currency: string = '';
	public isRangeValue: any = InputUtils.isRangeValue;
	public preventPasteValue: any = InputUtils.preventPasteValue;

	public allotmentList: ISelectItem[] = [
		{id: 'Min Allotment', name: 'Min Allotment'},
		{id: 'Security Allotment', name: 'Security Allotment'},
		{id: 'Free Sale', name: 'Free Sale'},
	];

	sortAllotmentMap: any = {
		'Min Allotment': 1,
		'Security Allotment': 2,
		'Free Sale': 3
	};

	public allotmentDefaultPriorities: string[] = [this.allotmentList[0].id, this.allotmentList[1].id, this.allotmentList[2].id];


	public roomAndCharacteristicOptions: ISelectItem[] = [];
	minSecurityAllotmentTooltip: string = `<div style="font-weight: bold;">Minimum Allotment:</div>
																				 <div style="margin-bottom: 10px">minimum rooms allowed to sell by Hotelbeds</div>
																				 <div style="font-weight: bold;">Security Allotment:</div><div>activated from the moment of stop-sale</div>`;

	constructor(public oneContractService: CreateOneContractService, private selectInputService: SelectInputService,
							public contractAllotmentService: ContractAllotmentService,
							private oneContractStoreService: CreateOneContractStoreService,
							private changeDetector: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.subscriptionsArray.push(this.oneContractStoreService.contractSeasons$.subscribe(seasons => {
			this.syncSeasons(seasons);
			this.contractAllotmentService.seasons = seasons;
			setTimeout(() => this.changeDetector.detectChanges());
		}));
		this.subscriptionsArray.push(this.oneContractStoreService.selectedCurrency$.subscribe(currency => {
			this.currency = currency;
			setTimeout(() => this.changeDetector.detectChanges());
		}));
		this.subscriptionsArray.push(this.oneContractStoreService.roomAndCharacteristic$.subscribe(this.roomAndCharacteristicHandler));

		const contractSubscription = this.oneContractStoreService.oneContract$.pipe(
			filter(contract => !contract || !contract.dontUpdateView)
		).subscribe(oneContract => setTimeout(() => this.resetParams(oneContract)));
		this.subscriptionsArray.push(contractSubscription);
	}

	resetParams(oneContract: IOneContractParams): void {
		this.contractAllotmentService.minSecurityAndAllotmentRows = [];
		if (oneContract) {
			const allotment = JsUtils.deepCopy(oneContract.contractData.allotmentCeilingRestriction);
			if (allotment.length > 0) {
				for (let rowIndex: number = 0; rowIndex < allotment.length; rowIndex++) {
					this.addRow();
					const tableRow = this.contractAllotmentService.minSecurityAndAllotmentRows[rowIndex];
					this.selectInputService.updateIsSelected(tableRow.allotmentList, allotment[rowIndex].allotment);
					this.onSelectItem(<ISelectItem>this.selectInputService.getSelectedItem(tableRow.allotmentList), 'allotment', tableRow, rowIndex);
					let roomAndCharacteristicCode: string;
					if (allotment[rowIndex].room === null) {
						roomAndCharacteristicCode = 'all';
					} else {
						if (allotment[rowIndex].room.roomCode && allotment[rowIndex].room.characteristicCode) {
							const room = allotment[rowIndex].room;
							roomAndCharacteristicCode = room.roomCode === 'all' ? 'all' : `${room.roomCode}, ${room.characteristicCode}`;
						}
					}
					if (roomAndCharacteristicCode) {
						this.selectInputService.updateIsSelected(tableRow.roomAndCharacteristicList, null, roomAndCharacteristicCode);
						this.onSelectItem(<ISelectItem>this.selectInputService.getSelectedItem(tableRow.roomAndCharacteristicList), 'roomAndCharacteristic', tableRow, rowIndex);
					}

					if (!allotment[rowIndex].seasons || allotment[rowIndex].seasons.length === 0) {
						this.selectInputService.updateIsSelected(tableRow.type, null, 'seasonally');
						this.onSelectItem(<ISelectItem>this.selectInputService.getSelectedItem(tableRow.type), 'type', tableRow, null);
					} else {
						allotment[rowIndex].seasons.sort((a: any, b: any) => a.seasonCode > b.seasonCode ? 1 : -1);
						this.selectInputService.updateIsSelected(tableRow.type, null, allotment[rowIndex].seasons[0].seasonCode === 'CP' ? 'period' : 'seasonally');
						this.onSelectItem(<ISelectItem>this.selectInputService.getSelectedItem(tableRow.type), 'type', tableRow, null);
						if (allotment[rowIndex].seasons[0].seasonCode === 'CP') {
							this.contractAllotmentService.minSecurityAndAllotmentRows[rowIndex].units = allotment[rowIndex].seasons[0].units;
							this.contractAllotmentService.minSecurityAndAllotmentRows[rowIndex].release = allotment[rowIndex].seasons[0].nights;
							this.contractAllotmentService.minSecurityAndAllotmentRows[rowIndex].ceilingPrice = allotment[rowIndex].seasons[0].price;
						} else {
							for (let seasonIndex = 0; seasonIndex < allotment[rowIndex].seasons.length; seasonIndex++) {
								const uiIndex = JsUtils.letterToNumber(allotment[rowIndex].seasons[seasonIndex].seasonCode[0]);
								if (allotment[rowIndex].seasons[seasonIndex].seasonCode.includes('WKND') || allotment[rowIndex].seasons[seasonIndex].seasonCode.includes('WKDY')) {
									if (allotment[rowIndex].seasons[seasonIndex].seasonCode.includes('WKND')) {
										tableRow.seasonsValues[uiIndex].unitsWknd = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].units) ? allotment[rowIndex].seasons[seasonIndex].units.toString() : null;
										tableRow.seasonsValues[uiIndex].releaseWknd = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].nights) ? allotment[rowIndex].seasons[seasonIndex].nights.toString() : null;
										tableRow.seasonsValues[uiIndex].ceilingWknd = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].price) ? allotment[rowIndex].seasons[seasonIndex].price.toString() : null;

									}
									if (allotment[rowIndex].seasons[seasonIndex].seasonCode.includes('WKDY')) {
										tableRow.seasonsValues[uiIndex].unitsWkdy = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].units) ? allotment[rowIndex].seasons[seasonIndex].units.toString() : null;
										tableRow.seasonsValues[uiIndex].releaseWkdy = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].nights) ? allotment[rowIndex].seasons[seasonIndex].nights.toString() : null;
										tableRow.seasonsValues[uiIndex].ceilingWkdy = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].price) ? allotment[rowIndex].seasons[seasonIndex].price.toString() : null;
									}
								} else {
									tableRow.seasonsValues[uiIndex].unitsValue = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].units) ? allotment[rowIndex].seasons[seasonIndex].units.toString() : null;
									tableRow.seasonsValues[uiIndex].releaseValue = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].nights) ? allotment[rowIndex].seasons[seasonIndex].nights.toString() : null;
									tableRow.seasonsValues[uiIndex].ceilingValue = JsUtils.isDefineAndNotNull(allotment[rowIndex].seasons[seasonIndex].price) ? allotment[rowIndex].seasons[seasonIndex].price.toString() : null;
								}
							}
						}
					}
				}
			}
		}
		setTimeout(() => this.changeDetector.detectChanges());
	}

	roomAndCharacteristicHandler = (newRoomAndCharacteristicList: ISelectItem[]): void => {
		if (newRoomAndCharacteristicList) {
			this.oneContractService.roomAndCharacteristicHandler(newRoomAndCharacteristicList, this.roomAndCharacteristicOptions, this.contractAllotmentService.minSecurityAndAllotmentRows, this.contractAllotmentService.minSecurityAndAllotmentRows, 'allotment');
			this.roomAndCharacteristicOptions = newRoomAndCharacteristicList;
			this.renderAllotmentLists();
			setTimeout(() => this.changeDetector.detectChanges());
		}
	}


	renderAllotmentLists(): void {
		this.contractAllotmentService.minSecurityAndAllotmentRows.forEach(row => {
			row.allotmentValidator.next({isValid: true, message: ''});
			this.allotmentDefaultPriorities.forEach(allotment => {
				if (!this.includedAllOptions(allotment) && !this.selectInputService.isContains(row.allotmentList, null, allotment)) {
					row.allotmentList.push({id: allotment, name: allotment});
				}
				if (row.allotment === allotment && this.includedAllOptions(allotment) && !JsUtils.isDefineAndNotNull(row.roomAndCharacteristic)) {
					row.allotmentValidator.next({isValid: false, message: `${row.allotment} is already implemented`});
				}
			});
			row.allotmentList.sort((a1: ISelectItem, a2: ISelectItem) => this.allotmentSort(a1, a2));
		});
	}

	onSelectItem(selectedListItem: ISelectItem, paramMap: string, item: IAllotment = null, index: number): void {
		if (paramMap === 'allotment') {
			const {allotment} = this.contractAllotmentService.minSecurityAndAllotmentRows[index];
			const oldOption: ISelectItem = {id: allotment, name: allotment};
			this.contractAllotmentService.minSecurityAndAllotmentRows[index].allotment = selectedListItem.id;
			if (oldOption.id !== selectedListItem.id) {
				item.allotmentValidator.next({isValid: true, message: ''});
			}
			const selectedCharacteristic: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.contractAllotmentService.minSecurityAndAllotmentRows[index].roomAndCharacteristicList, false);
			item.roomAndCharacteristic = null;
			this.roomAndCharacteristicHandler(this.roomAndCharacteristicOptions);
			this.selectInputService.updateIsSelected(item.roomAndCharacteristicList, null);
			item.roomAndCharacteristicList = [...item.roomAndCharacteristicList];
			this.contractAllotmentService.minSecurityAndAllotmentRows.forEach((r: IAllotment, ind: number) => {
				if (oldOption.id !== selectedListItem.id && !this.selectInputService.isContains(r.allotmentList, null, oldOption.id)) {
					r.allotmentList.push(oldOption);
					r.allotmentList = [...r.allotmentList];
					r.allotmentList.sort((a1: ISelectItem, a2: ISelectItem) => this.allotmentSort(a1, a2));
				}
				if (ind !== index) {
					if (selectedListItem.id === r.allotment) {
					} else {
						if (JsUtils.isDefineAndNotNull(selectedCharacteristic) && this.includedAllOptions(selectedListItem.id)) {
							r.allotmentList = this.selectInputService.removeItemsFromList(r.allotmentList, null, selectedListItem.id);
						}
					}
				}
			});
			if (this.includedAllOptions(oldOption.id) && !JsUtils.isDefineAndNotNull(item.roomAndCharacteristic) && selectedListItem.id !== oldOption.id) { //remove the old option if included all room allotment
				item.allotmentList = this.selectInputService.removeItemsFromList(item.allotmentList, null, oldOption.id);
			}
		}

		if (paramMap === 'roomAndCharacteristic') {
			this.contractAllotmentService.minSecurityAndAllotmentRows[index].roomAndCharacteristic = selectedListItem.id;
			const {allotment} = this.contractAllotmentService.minSecurityAndAllotmentRows[index];
			this.roomAndCharacteristicHandler(this.roomAndCharacteristicOptions);
			if (this.includedAllOptions(allotment)) {
				this.contractAllotmentService.minSecurityAndAllotmentRows.forEach((row: IAllotment, ind: number) => {
					if (row.allotment !== allotment) {
						row.allotmentList = this.selectInputService.removeItemsFromList(row.allotmentList, null, allotment);
					} else {
						if (ind !== index && selectedListItem.id === 'all') {
							row.allotmentValidator.next({isValid: false, message: `${row.allotment} is already implemented`});
						}
					}
				});
			} else {
				this.contractAllotmentService.minSecurityAndAllotmentRows.filter(a => !this.selectInputService.isContains(a.allotmentList, null, allotment)).forEach(row => {
					row.allotmentList.push({id: allotment, name: allotment});
					row.allotmentList.sort((a1: ISelectItem, a2: ISelectItem) => this.allotmentSort(a1, a2));
				});
			}
		}

		if (paramMap === 'type') {
			item.isSeasons = selectedListItem.id === 'seasonally';
			if (item.isSeasons) {
				item.units = null;
				item.release = null;
				item.ceilingPrice = null;
				item.seasonsValues = [];
				this.syncSeasons(this.contractAllotmentService.seasons);
			}
		} else {
			if (JsUtils.isDefined(selectedListItem)) {
				item[paramMap] = selectedListItem.id;
			}
		}
	}

	addRow(): void {
		const allotmentItem: IAllotment = {
			allotment: '',
			allotmentValidator: new Subject<IValidationStatus>(),
			roomAndCharacteristic: '',
			allotmentList: JsUtils.deepCopy(this.allotmentList),
			seasonsValues: [],
			roomAndCharacteristicList: JsUtils.deepCopy(this.roomAndCharacteristicOptions),
			type: this.oneContractService.getPeriodOrSeasonallyOptions(),
			isSeasons: false,
			units: null,
			release: null,
			ceilingPrice: null
		};

		allotmentItem.allotmentValidator.next({isValid: true, message: ''});
		this.contractAllotmentService.minSecurityAndAllotmentRows.push(allotmentItem);
		const lastIndex: number = this.contractAllotmentService.minSecurityAndAllotmentRows.length - 1;
		const filteredDefaults = [...this.allotmentDefaultPriorities];
		for (let i = 0; i < this.allotmentDefaultPriorities.length; i++) {
			if (this.includedAllOptions(this.allotmentDefaultPriorities[i])) {
				allotmentItem.allotmentList = this.selectInputService.removeItemsFromList(allotmentItem.allotmentList, null, this.allotmentDefaultPriorities[i]);
				filteredDefaults.splice(filteredDefaults.indexOf(this.allotmentDefaultPriorities[i]), 1);
			}
		}
		allotmentItem.allotment = filteredDefaults[0];
		this.selectInputService.updateIsSelected(allotmentItem.allotmentList, null, allotmentItem.allotment);
		const selectedOption: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(allotmentItem.allotmentList, false);
		if (selectedOption) {
			this.onSelectItem(selectedOption, 'allotment', this.contractAllotmentService.minSecurityAndAllotmentRows[lastIndex], lastIndex);
		}
		this.syncSeasons(this.contractAllotmentService.seasons);
	}

	syncSeasons(seasons: IContractSeason[]): void {
		this.contractAllotmentService.minSecurityAndAllotmentRows.forEach(minStay => {
			seasons.forEach((season: IContractSeason, ind: number) => {
				const seasonParams: IAllotmentSeasonParams = !JsUtils.isDefined(minStay.seasonsValues[ind]) ? {} : minStay.seasonsValues[ind];
				this.oneContractService.setSeasonallyTooltipValues(seasonParams, seasons, ind);
				if (!JsUtils.isDefined(minStay.seasonsValues[ind])) {
					minStay.seasonsValues.push(seasonParams);
				}
			});
			if (seasons.length < minStay.seasonsValues.length) {
				minStay.seasonsValues.splice(seasons.length, minStay.seasonsValues.length);
			}
		});
	}

	deleteRow(item: IAllotment): void {
		let deletedOption: ISelectItem;
		if (item.allotment) {
			deletedOption = {id: item.allotment, name: item.allotment};
		}
		const deletedItemIndex: number = this.contractAllotmentService.minSecurityAndAllotmentRows.indexOf(item);
		this.contractAllotmentService.minSecurityAndAllotmentRows.splice(deletedItemIndex, 1);
		if (JsUtils.isDefineAndNotNull(deletedOption)) {
			this.contractAllotmentService.minSecurityAndAllotmentRows.forEach(r => {
				if (!this.selectInputService.isContains(r.allotmentList, null, deletedOption.id) && !this.includedAllOptions(deletedOption.id)) {
					r.allotmentList.push(deletedOption);
					r.allotmentList.sort((a1: ISelectItem, a2: ISelectItem) => this.allotmentSort(a1, a2));
				}
			});
		}
		this.roomAndCharacteristicHandler(this.roomAndCharacteristicOptions);
	}

	allotmentSort(allotment1: ISelectItem, allotment2: ISelectItem): number {
		return this.sortAllotmentMap[allotment1.id] > this.sortAllotmentMap[allotment2.id] ? 1 : -1;
	}

	includedAllOptions(allotment: string): boolean {
		return this.oneContractService.includedAllOptions(allotment, this.contractAllotmentService.minSecurityAndAllotmentRows, this.contractAllotmentService.minSecurityAndAllotmentRows, 'allotment', this.roomAndCharacteristicOptions);
	}


	addRowsDisabled(): boolean {
		return this.allotmentDefaultPriorities.filter(allotment => this.includedAllOptions(allotment)).length === this.allotmentList.length;
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
		this.contractAllotmentService.resetParams();
	}
}

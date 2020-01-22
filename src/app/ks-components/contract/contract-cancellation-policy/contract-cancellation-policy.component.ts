import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractCancellationPolicyService} from './contract-cancellation-policy.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISelectItem, ISelectOptionsComponentsTypes, IValidationStatus} from '../../../shared/types/ISelect';
import {OPTIONS_TYPES} from '../../../shared/inputs/select-module/select-input/select-input.constant';
import {ICheckboxItem, IRadioButton} from '../../../shared/types/buttons';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {AppCommonService} from '../../../../app-common.service';
import {ICancellationFee, IOneContractParams} from '../one-contract-object';
import {ICancellationFeeParams, ICancellationPolicyParams, IContractSeason, ISeasonCodeParams} from '../one-contract';
import {JsUtils} from '../../../utils/jsUtils';
import {Subject} from 'rxjs/Subject';
import {SEASONS_TYPES} from '../one-contract.const';

@Component({
	selector: 'app-contract-cancellation-policy',
	templateUrl: './contract-cancellation-policy.component.html',
	styleUrls: ['./contract-cancellation-policy.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractCancellationPolicyComponent implements OnInit, OnDestroy {
	public OPTIONS_TYPES: ISelectOptionsComponentsTypes = OPTIONS_TYPES;
	public nonRefundableRadioOptions: IRadioButton[] = [
		{text: 'Yes', isSelected: false, id: true}, {text: 'No', isSelected: true, id: false}
	];
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public multiSelectConfig: any[] = [];
	public tableHeader: string[] = [];
	public selectAllConfig: any;
	public multipleNamesOrIdTextHandler: any = InputUtils.multipleNamesOrIdTextHandler;
	private subscriptionsArray: any[] = [];
	public validationStatus: IValidationStatus;
	public preventPasteValue: any = InputUtils.preventPasteValue;
	public sectionValidationStatus: IValidationStatus = {isValid: true, message: ''};

	constructor(public createOneContractService: CreateOneContractService, private selectInputService: SelectInputService,
							public contractCancellationPolicyService: ContractCancellationPolicyService,
							private createOneContractStoreService: CreateOneContractStoreService, private changeDetector: ChangeDetectorRef,
							public appCommonService: AppCommonService) {
	}

	ngOnInit(): void {
		const {subscriptionsArray, createOneContractStoreService, contractCancellationPolicyService} = this;
		this.tableHeader = ['Type', 'Days Before Check-In', 'Penalty', 'Rule', 'Time', 'Apply On', ''];
		subscriptionsArray.push(createOneContractStoreService.contractSeasons$.subscribe(this.seasonsHandler));
		subscriptionsArray.push(createOneContractStoreService.classification$.subscribe(this.classificationHandler));
		subscriptionsArray.push(contractCancellationPolicyService.validation.subscribe(status => {
			this.validationStatus = status;
			setTimeout(() => this.changeDetector.detectChanges());
		}));
		subscriptionsArray.push(
			createOneContractStoreService.oneContract$.pipe(
				filter(contract => !contract || !contract.dontUpdateView)
			).subscribe((oneContract: IOneContractParams) => setTimeout(() => this.resetParameters(oneContract)))
		);
		subscriptionsArray.push(this.contractCancellationPolicyService.validation.subscribe(status => {
			this.sectionValidationStatus = status;
			setTimeout(() => this.changeDetector.detectChanges());
		}));
	}

	resetParameters(oneContract: IOneContractParams): void {
		this.multiSelectConfig = [];
		this.contractCancellationPolicyService.contractCancellationPolicyPrams = <ICancellationPolicyParams>{
			isNRF: false,
			tableRows: []
		};
		this.contractCancellationPolicyService.resetParams();
		const cancellationFee = JsUtils.deepCopy(oneContract && oneContract.contractData && oneContract.contractData.cancellationPolicy);
		if (oneContract) {
			const {selectInputService} = this;
			const {tableRows} = this.contractCancellationPolicyService.contractCancellationPolicyPrams;
			const isNRF: boolean = cancellationFee.isNRF;
			this.selectInputService.updateIsSelected(this.nonRefundableRadioOptions, null, isNRF);
			this.radioButtonClick({id: isNRF, text: null}, isNRF);
			if (!isNRF) {
				for (let i = 0; i < cancellationFee.fees.length; i++) {
					if (!JsUtils.isEmpty(cancellationFee.fees[i])) { // todo - why we get an empty object
						this.addRow();
						const feeObject: ICancellationFee = cancellationFee.fees[i];
						const isNoShow: boolean = feeObject.days === 0;
						tableRows[i].days = isNoShow ? null : feeObject.days;
						tableRows[i].type = isNoShow ? 'NS' : 'CLX';
						this.selectInputService.updateIsSelected(tableRows[i].typeOptions, null, tableRows[i].type);
						tableRows[i].typeOptions = [...tableRows[i].typeOptions];
						this.onSelectItem({id: tableRows[i].type, name: null}, i, 'type');

						if (feeObject.type) {
							tableRows[i].penalty = feeObject.type;
							selectInputService.updateIsSelected(tableRows[i].stayingTypes, null, feeObject.type);
						}
						if (feeObject.rule) {
							tableRows[i].rule = feeObject.rule;
							selectInputService.updateIsSelected(tableRows[i].rulesOptions, null, feeObject.rule);
						}
						if (feeObject.time) {
							tableRows[i].time = feeObject.time;
							selectInputService.updateIsSelected(tableRows[i].hoursOptions, null, feeObject.time);
						}
						if (feeObject.seasons && feeObject.seasons.length) {
							tableRows[i].seasonCode = feeObject.seasons;
							selectInputService.updateIsSelected(tableRows[i].seasonCodeOptions, null, feeObject.seasons.map(c => c.seasonCode));
							tableRows[i].seasonCodeOptions = [...tableRows[i].seasonCodeOptions];
							this.updateTableSeasonsOptions();
						}
						this.updateMultiSelectConfig();
					}
				}
				if (this.createOneContractService.oneContractId) {
					this.contractCancellationPolicyService.isDirty = true;
				}
				this.contractCancellationPolicyService.validateSection();
			}
		}
		setTimeout(() => this.changeDetector.detectChanges());
	}

	selectAllHandler = (rowNumber: number) => (list: ISelectItem[], allOptionsItem?: ICheckboxItem) => {
		if (allOptionsItem) {
			allOptionsItem.isSelected = true;
		}
		list.forEach(option => option.isSelected = true);
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCodeOptions = JsUtils.deepCopy(list);
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCode = (<ISeasonCodeParams[]>list.map(option => <ISeasonCodeParams>{seasonCode: option.id}));
		this.updateTableSeasonsOptions();
	}

	seasonsHandler = (seasons: IContractSeason[]) => {
		this.buildSeasonsOptionsFromSeasons(seasons);
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach(row => row.seasonCodeOptions = JsUtils.deepCopy(this.contractCancellationPolicyService.seasonsOptions));
		this.updateCancellationPolicyParamsByNewSeasonOptions();
		this.updateTableSeasonsOptions();
		setTimeout(() => this.changeDetector.detectChanges());
	}

	classificationHandler = (classification: string) => {
		if (classification === 'NRF') {
			this.contractCancellationPolicyService.contractCancellationPolicyPrams.isNRF = true;
			this.selectInputService.updateIsSelected(<ISelectItem[]>this.nonRefundableRadioOptions, null, true);
			setTimeout(() => this.changeDetector.detectChanges());
		}
	}

	addRow(): void {
		const {selectInputService} = this;
		const {tableRows} = this.contractCancellationPolicyService.contractCancellationPolicyPrams;
		const contractCancellationPolicyPrams = this.contractCancellationPolicyService.contractCancellationPolicyPrams;
		let lastRow;
		let lastIndex;
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.push({
			type: 'CLX',
			days: null,
			penalty: null,
			rule: null,
			time: null,
			daysBeforeCheckinStatus$: new Subject<IValidationStatus>(),
			applyOnTextHandler$: new Subject(),
			seasonCode: [],
			displayTriangle: false,
			typeOptions: this.createOneContractService.getTypeOptions(),
			stayingTypes: this.createOneContractService.getStayingOptions(),
			rulesOptions: this.createOneContractService.getRulesOptions(),
			hoursOptions: this.createOneContractService.getHoursOptions(),
			seasonCodeOptions: JsUtils.deepCopy(this.contractCancellationPolicyService.seasonsOptions),
		});
		lastIndex = tableRows.length - 1;
		lastRow = tableRows[lastIndex];
		contractCancellationPolicyPrams.tableRows.forEach((params: ICancellationFeeParams) => {
			const seasonCodes: string[] = JsUtils.isDefined(params.seasonCode) ? params.seasonCode.map(s => s.seasonCode) : undefined;
			tableRows[lastIndex].seasonCodeOptions = selectInputService.removeItemsFromList(lastRow.seasonCodeOptions, null, seasonCodes);
		});
		this.multiSelectConfig.push({
			selectAllConfig: {selectAllText: 'Entire Contract', selectAllHandler: this.selectAllHandler(lastIndex)}
		});
		this.syncTypeOptions();
		this.updateMultiSelectConfig();
		this.contractCancellationPolicyService.isDirty = true;
	}

	deleteRow(rowNumber: number): void {
		this.multiSelectConfig.splice(rowNumber, 1);
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.splice(rowNumber, 1);
		this.multiSelectConfig = [];
		for (let i = 0; i < this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.length; i++) {
			this.multiSelectConfig.push(
				{selectAllConfig: {selectAllText: 'Entire Contract', selectAllHandler: this.selectAllHandler(i)}}
			);
		}
		this.syncTypeOptions();
		this.updateTableSeasonsOptions();
		this.updateMultiSelectConfig();
		this.contractCancellationPolicyService.isDirty = true;
	}

	updateMultiSelectConfig(): void {
		const hideSelectAll: boolean = this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.some((params: ICancellationFeeParams) => {
			return params.type === 'CLX' && params.seasonCode && params.seasonCode.length > length;
		});
		this.multiSelectConfig.forEach((config: any, rowNumber: number) => {
			const type = this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].type;
			if (type === 'CLX') {
				config.selectAllConfig.hideSelectAll = hideSelectAll;
			}
		});
	}

	buildSeasonsOptionsFromSeasons(seasons: IContractSeason[]): void {
		const seasonCodeOptions: ISelectItem[] = [];
		seasons.map((season: IContractSeason, index: number) => {
			const seasonCode = JsUtils.numberToLatter(index + 1, true);
			if (season.selectedSeasonType === SEASONS_TYPES.A) {
				seasonCodeOptions.push({id: seasonCode, name: `Season ${seasonCode}`});
			} else {
				seasonCodeOptions.push({id: seasonCode + ' WKND', name: `Season ${seasonCode} (WKND)`});
				seasonCodeOptions.push({id: seasonCode + ' WKDY', name: `Season ${seasonCode} (WKDY)`});
			}
		});
		this.contractCancellationPolicyService.seasonsOptions = seasonCodeOptions;
	}

	updateCancellationPolicyParamsByNewSeasonOptions(): void {
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach((params: ICancellationFeeParams) => {
			if (params.seasonCode) {
				params.seasonCode = params.seasonCode.filter(seasonId => this.contractCancellationPolicyService.seasonsOptions.some(option => option.id === seasonId.seasonCode));
			}
		});
	}

	updateTableSeasonsOptions(): void {
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach(row => row.seasonCodeOptions = JsUtils.deepCopy(this.contractCancellationPolicyService.seasonsOptions));
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach((params: ICancellationFeeParams, paramIndex: number) => {
			this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach((row: any, rowNumber: number) => {
				const seasonCodes: string[] = JsUtils.isDefined(params.seasonCode) ? params.seasonCode.map(s => s.seasonCode) : [];
				if (paramIndex !== rowNumber) {
					const {type} = this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber];
					if (type !== 'NS') {
						row.seasonCodeOptions = this.selectInputService.removeItemsFromList(row.seasonCodeOptions, null, seasonCodes);
					}
				} else {
					this.selectInputService.updateIsSelected(row.seasonCodeOptions, null, seasonCodes);
				}
			});
			if (params.type === 'NS') {
				setTimeout(() => params.applyOnTextHandler$.next('Entire Contract'));
			}
		});
	}

	updateParamsAndSelectionByInputValue(input: HTMLInputElement, rowNumber: number): void {
		this.contractCancellationPolicyService.isDirty = true;
		if (this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].type !== 'NS') { // change between 0 to other value can cause params duplications
			this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach((params: ICancellationFeeParams, index) => {
				const seasonCodeValues: ISeasonCodeParams[] = this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCode;
				if (index !== rowNumber && seasonCodeValues) {
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCode = seasonCodeValues
						.filter(seasonId => !params.seasonCode || +params.days === 0 || params.seasonCode.indexOf(seasonId) < 0);
				}
			});
		}
		this.updateTableSeasonsOptions();
		this.updateMultiSelectConfig();
		this.inputContainError(input, rowNumber);
	}

	onSelectItem(selection: any, rowNumber: number, paramName: string): void {
		this.contractCancellationPolicyService.isDirty = true;
		if (paramName === 'penalty' || paramName === 'rule' || paramName === 'time' || paramName === 'type') {
			this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber][paramName] = selection.id;
			if (paramName === 'type') {
				if (selection.id === 'NS') {
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].applyOnTextHandler$.next('Entire Contract');
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].days = null;
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].daysBeforeCheckinStatus$.next({isValid: true});
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCode = [];
				} else {
					this.selectInputService.updateIsSelected(this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCodeOptions, null, []);
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCodeOptions =
						[...this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCodeOptions];
				}
				this.syncTypeOptions();
				this.updateTableSeasonsOptions();
				this.updateMultiSelectConfig();
			}
		} else {
			this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCode = [];
			selection.forEach((options: ISelectItem) => {
				if (options.isSelected) {
					this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].seasonCode.push(<ISeasonCodeParams>{seasonCode: options.id});
				}
			});
			this.updateTableSeasonsOptions();
			this.updateMultiSelectConfig();
		}

		if (this.sectionValidationStatus && !this.sectionValidationStatus.isValid) {
			this.contractCancellationPolicyService.validateSection();
		}
	}

	syncTypeOptions(): void {
		const {tableRows} = this.contractCancellationPolicyService.contractCancellationPolicyPrams;
		const noShowOptions: ICancellationFeeParams[] = tableRows.filter(r => r.type === 'NS');
		if (noShowOptions.length > 0) {
			tableRows.forEach(r => {
				if (r.type !== 'NS') {
					r.typeOptions = this.selectInputService.removeItemsFromList(r.typeOptions, null, 'NS');
				}
			});
		} else {
			tableRows.forEach(r => {
				if (!this.selectInputService.isContains(r.typeOptions, null, 'NS')) {
					r.typeOptions.push({id: 'NS', name: 'No Show'});
				}
			});
		}
	}

	isInputValid(rowNumber: number): boolean {
		const valueToCheck = this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[rowNumber].days;
		if (valueToCheck) {
			return this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.some((param: ICancellationFeeParams, index: number) => {
				return index !== rowNumber && +valueToCheck === +param.days && JsUtils.isDefineAndNotNull(param.days) && String(param.days) !== '';
			});
		} else {
			return false;
		}
	}

	isAddRowDisabled(): boolean {
		let numOfSelectedSeasons = 0;
		let isZeroDaysBeforeCheckInSelected = false;
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach((param: ICancellationFeeParams) => {
			if (param.type !== 'NS') {
				numOfSelectedSeasons += param.seasonCode ? param.seasonCode.length : 0;
			} else {
				isZeroDaysBeforeCheckInSelected = true;
			}
		});
		return isZeroDaysBeforeCheckInSelected && numOfSelectedSeasons === this.contractCancellationPolicyService.seasonsOptions.length;
	}

	onCloseApplyOn(): void {
		this.updateMultiSelectConfig();
	}

	radioButtonClick(checkedButton: IRadioButton, isDirty: boolean = true): void {
		this.contractCancellationPolicyService.isDirty = isDirty;
		this.contractCancellationPolicyService.contractCancellationPolicyPrams.isNRF = checkedButton.id;
		if (this.sectionValidationStatus && !this.sectionValidationStatus.isValid) {
			this.contractCancellationPolicyService.validateSection();
		}

		if (!this.contractCancellationPolicyService.contractCancellationPolicyPrams.isNRF) {
			this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows.forEach(row => {
				if (row.type === 'NS') {
					setTimeout(() => row.applyOnTextHandler$.next('Entire Contract'));
				}
			});
		}
	}

	inputContainError(input: HTMLInputElement, ind: number): void {
		setTimeout(() => this.contractCancellationPolicyService.contractCancellationPolicyPrams.tableRows[ind].displayTriangle = input.classList.contains('ng-invalid') && input.classList.contains('ng-touched')
			&& (input.classList.contains('ng-dirty') || input.classList.contains('ng-pristine')));
		this.changeDetector.detectChanges();
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
		this.contractCancellationPolicyService.resetParams();
	}
}

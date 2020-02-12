import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import * as moment from 'moment';
import {ContractRatesService} from './contract-rates.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {AppCommonService} from '../../../../app-common.service';
import {filter} from 'rxjs/operators';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {IContractSeason, IRatesParams} from '../one-contract';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {IRadioButton} from '../../../shared/types/buttons';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {JsUtils} from '../../../utils/jsUtils';
import {IOneContractParams, IRate, ISeason} from '../one-contract-object';
import {SEASONS_TYPES} from '../one-contract.const';
import {IFromTo} from '../../../shared/types/calendar';
import {DATE_FORMAT} from '../../../shared/calendar-module/calendar.const';

@Component({
  selector: 'app-contract-rates',
  templateUrl: './contract-rates.component.html',
  styleUrls: ['./contract-rates.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractRatesComponent implements OnInit, OnDestroy {
  public tableHeaderColumns: IContractSeason[] = [];
  public roomAndCharacteristic: ISelectItem[] = [];
  public calcCalendarPositionClass: any = {};
  public seasonTypes: ISelectItem[][] = [];
  public dateRangePickerPosition: any = {};
  public isDateRangePickerOpened: any = {};
  public lastEditableCalendarIndex: number;
  public subscriptionsArray: any[] = [];
  public isSelectToMode: any = {};
  public currency: string = '';
  public tableHeader: string[];
  public tableRows: any[] = [];
  public validationStatus: IValidationStatus;
  public ratesTooltip: string = `<div>Weekdays are defined as Monday to Friday</div>
																 <div>Weekend are defined as Saturday to Sunday</div>`;
  private timer;
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public vatIncluded: IRadioButton[] = [
    {text: 'Yes', isSelected: true, id: true}, {text: 'No', isSelected: false, id: false}
  ];
  public ratePer: IRadioButton[] = [
    {text: 'Unit', isSelected: true, id: 'Unit'}, {text: 'Person', isSelected: false, id: 'Person'}
  ];

  constructor(public oneContractService: CreateOneContractService, private selectInputService: SelectInputService,
              public contractRatesService: ContractRatesService, private changeDetector: ChangeDetectorRef,
              public oneContractStoreService: CreateOneContractStoreService,
              public appCommonService: AppCommonService) {
  }

  ngOnInit(): void {
    const {tableHeaderColumns, subscriptionsArray, oneContractStoreService, seasonTypes} = this;
    subscriptionsArray.push(oneContractStoreService.selectedCurrency$.subscribe(currency => {
      this.currency = currency;
      setTimeout(() => this.changeDetector.detectChanges());
    }));
    subscriptionsArray.push(this.contractRatesService.validation.subscribe(status => {
      this.validationStatus = status;
      this.timer = setTimeout(() => this.changeDetector.detectChanges());
    }));
    this.tableHeader = ['Season ' + JsUtils.numberToLatter(1, true)];
    tableHeaderColumns.push({seasonRange: {from: '', to: ''}, selectedSeasonType: 'A'});
    seasonTypes.push(this.oneContractService.getSeasonsTypes());
    subscriptionsArray.push(oneContractStoreService.roomAndCharacteristic$.subscribe(this.newRoomAndCharacteristicListHandler));
    oneContractStoreService.contractSeasons$.next(this.tableHeaderColumns);
    this.calcContractDateRange();

    subscriptionsArray.push(
      oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => setTimeout(() => this.resetParameters(oneContract))));
  }

  @HostListener('window:click', ['$event'])
  documentClickHandler = (event: any) => {
    Object.keys(this.isDateRangePickerOpened).forEach(key => {
      if (this.isDateRangePickerOpened[key] && !this.isDateRangePickerOpened[key].contains(event.target)) {
        delete this.isDateRangePickerOpened[key];
      }
    });
  };

  resetParameters(oneContract: IOneContractParams): void {
    const seasons: ISeason[] = oneContract && oneContract.contractData && JsUtils.deepCopy(oneContract.contractData.seasons) || [];
    seasons.sort((a: any, b: any) => a.seasonCode > b.seasonCode ? 1 : -1);
    const seasonsLength = seasons.length;
    const rates: IRate[] = oneContract && oneContract.contractData && oneContract.contractData.rateData && JsUtils.deepCopy(oneContract.contractData.rateData.rates) || [];
    const ratesLength = rates.length;
    this.contractRatesService.ratesParams = [];
    this.tableHeaderColumns = [];
    this.tableHeader = [];
    this.seasonTypes = [];
    this.tableRows = [];
    const ratesParams: any = this.contractRatesService.ratesParams;

    if (oneContract && oneContract.contractData && oneContract.contractData.rateData) {
      ratesParams.vatIncluded = oneContract.contractData.rateData.vatIncluded;
      ratesParams.applicationType = oneContract.contractData.rateData.applicationType;
      this.selectInputService.updateIsSelected(this.vatIncluded, null, ratesParams.vatIncluded);
      this.selectInputService.updateIsSelected(this.ratePer, null, ratesParams.applicationType);
      this.vatIncluded = [...this.vatIncluded];
      this.ratePer = [...this.ratePer];
    } else {
      this.tableHeader = ['Season ' + JsUtils.numberToLatter(1, true)];
      this.tableHeaderColumns.push({seasonRange: {from: '', to: ''}, selectedSeasonType: 'A'});
      this.seasonTypes.push(this.oneContractService.getSeasonsTypes());
      this.calcContractDateRange();
    }

    for (let tableIndex = 0, seasonIndex = 0; seasonIndex < seasonsLength; seasonIndex++, tableIndex++) {
      this.addColumn();
      this.tableHeader[tableIndex] = 'Season ' + seasons[seasonIndex].seasonCode[0];
      if (seasons[seasonIndex].seasonCode.length > 1) {
        this.tableHeaderColumns[tableIndex].selectedSeasonType = SEASONS_TYPES.W;
        this.selectInputService.updateIsSelected(this.seasonTypes[tableIndex], null, SEASONS_TYPES.W);

        const seasonRange = seasons[seasonIndex];
        if (seasonRange.travelWindow.dateFrom && seasonRange.travelWindow.dateTo) {
          this.onSelectRange({
            from: moment(seasonRange.travelWindow.dateFrom),
            to: moment(seasonRange.travelWindow.dateTo)
          }, tableIndex);
        }
        this.tableHeader[tableIndex] = 'Season ' + seasons[seasonIndex].seasonCode[0];
        seasonIndex++;
      } else {
        this.tableHeaderColumns[tableIndex].selectedSeasonType = SEASONS_TYPES.A;
        const seasonRange = seasons[seasonIndex];
        if (seasonRange.travelWindow.dateFrom && seasonRange.travelWindow.dateTo) {
          this.onSelectRange({
            from: moment(seasonRange.travelWindow.dateFrom),
            to: moment(seasonRange.travelWindow.dateTo)
          }, tableIndex);
        }
      }
    }

    for (let rowIndex = 0; rowIndex < ratesLength; rowIndex++) {
      this.addRow();
      rates[rowIndex].type.sort((a: any, b: any) => a.seasonCode > b.seasonCode ? 1 : -1);
      if (rates[rowIndex].roomCode && rates[rowIndex].characteristicCode) {
        const sharedRoomAndCharacteristic = rates[rowIndex].roomCode + ', ' + rates[rowIndex].characteristicCode;
        const selectedItem = {id: sharedRoomAndCharacteristic, name: sharedRoomAndCharacteristic};
        this.selectInputService.updateIsSelected(this.tableRows[rowIndex].roomAndCharacteristic, null, sharedRoomAndCharacteristic);
        this.onSelectRoomAndCharacteristic(selectedItem, rowIndex);
      }

      for (let seasonIndex = 0; seasonIndex < rates[rowIndex].type.length; seasonIndex++) {
        const uiIndex = JsUtils.letterToNumber(rates[rowIndex].type[seasonIndex].seasonCode[0]);
        if (rates[rowIndex].type[seasonIndex].seasonCode.includes('WKND') || rates[rowIndex].type[seasonIndex].seasonCode.includes('WKDY')) {
          if (rates[rowIndex].type[seasonIndex].seasonCode.includes('WKND')) {
            ratesParams[rowIndex].seasons[uiIndex].seasonWKND = rates[rowIndex].type[seasonIndex].value + '';
          }
          if (rates[rowIndex].type[seasonIndex].seasonCode.includes('WKDY')) {
            ratesParams[rowIndex].seasons[uiIndex].seasonWKDY = rates[rowIndex].type[seasonIndex].value + '';
          }
        } else {
          ratesParams[rowIndex].seasons[uiIndex].season = rates[rowIndex].type[seasonIndex].value + '';
        }
      }
    }

    if (oneContract) {
      this.contractRatesService.validateSection();
      setTimeout(() => this.changeDetector.detectChanges());
    }
  }

  newRoomAndCharacteristicListHandler = (newRoomAndCharacteristicList: ISelectItem[]) => {
    if (newRoomAndCharacteristicList) {
      if (this.roomAndCharacteristic.length > newRoomAndCharacteristicList.length) { // check if was deletion
        this.deletedRoomAndAvailabilityHandler(newRoomAndCharacteristicList);
      }
      this.tableRows.forEach(row => row.roomAndCharacteristic = JsUtils.deepCopy(newRoomAndCharacteristicList));
      this.updateRoomAndCharacteristicByRatesParams();
      this.roomAndCharacteristic = newRoomAndCharacteristicList;
      setTimeout(() => this.changeDetector.detectChanges());
    }
  };

  deletedRoomAndAvailabilityHandler(newList: ISelectItem[]): void {
    const deletedItem = this.roomAndCharacteristic.filter(item => !this.selectInputService.isContains(newList, item.name))[0];
    let indexToDelete = -1;
    const paramsListLength = this.contractRatesService.ratesParams.length;
    const newListLength = newList.length;

    for (let i = 0; i < paramsListLength; i++) {
      if (this.contractRatesService.ratesParams[i].roomAndCharacteristic === deletedItem.name) { // check if the deleted item was selected.
        indexToDelete = i;
      } else {
        // delete only if if the rates table is bigger then the rooms and availability table
        if (indexToDelete === -1 && !this.contractRatesService.ratesParams[i].roomAndCharacteristic && paramsListLength > newListLength) {
          indexToDelete = i; // delete first empty row
        }
      }
    }
    if (indexToDelete !== -1) {
      this.contractRatesService.ratesParams.splice(indexToDelete, 1);
      this.tableRows.splice(indexToDelete, 1);
    }
  }

  updateRoomAndCharacteristicByRatesParams(): void {
    this.contractRatesService.ratesParams.forEach((param: IRatesParams, index: number) => {
      this.tableRows.forEach((row: any, rowNumber: number) => {
        if (param.roomAndCharacteristic) {
          if (index === rowNumber) {
            this.selectInputService.updateIsSelected(row.roomAndCharacteristic, param.roomAndCharacteristic);
          } else {
            row.roomAndCharacteristic = this.selectInputService.removeItemsFromList(row.roomAndCharacteristic, param.roomAndCharacteristic);
          }
        }
      });
    });
  }

  onSelectRoomAndCharacteristic(selectedItem: ISelectItem, rowNumber: number): void {
    const {selectInputService, tableRows} = this;
    const ratesParams = this.contractRatesService.ratesParams;
    const oldSelection = ratesParams[rowNumber].roomAndCharacteristic;
    const newSelection = selectedItem.name;
    const arrLength = tableRows.length;

    ratesParams[rowNumber].roomAndCharacteristic = newSelection;

    for (let i = 0; i < arrLength; i++) {
      if (i !== rowNumber && oldSelection !== newSelection) {
        this.tableRows[i].roomAndCharacteristic = selectInputService.removeItemsFromList(tableRows[i].roomAndCharacteristic, newSelection);

        if (oldSelection) {
          tableRows[i].roomAndCharacteristic.push({id: oldSelection, name: oldSelection});
        }
      }
    }
  }

  onSelectSeasonType(selectedOption: ISelectItem, columnIndex: number): void {
    if (selectedOption.name === 'All Days') {
      delete this.contractRatesService.ratesParams[0].seasons[0].seasonWKDY;
      delete this.contractRatesService.ratesParams[0].seasons[0].seasonWKND;
    } else {
      delete this.contractRatesService.ratesParams[0].seasons[0].season;
    }

    this.tableHeaderColumns[columnIndex].selectedSeasonType = selectedOption.id;
    this.oneContractStoreService.contractSeasons$.next(this.tableHeaderColumns);
  }

  onSelectRange(dateRange: any, columnIndex: number): void {
    this.tableHeaderColumns[columnIndex].seasonRange.from = dateRange && dateRange.from ? dateRange.from.format(DATE_FORMAT) : '';
    this.tableHeaderColumns[columnIndex].seasonRange.to = dateRange && dateRange.to ? dateRange.to.format(DATE_FORMAT) : '';
    this.isSelectToMode = {};
    this.tableHeaderColumns.forEach((contractSeason: IContractSeason, index: number) => {
      if (index > columnIndex) {
        contractSeason.seasonRange.from = '';
        contractSeason.seasonRange.to = '';
      }
    });
    if (columnIndex + 1 < this.tableHeaderColumns.length) {
      this.tableHeaderColumns[columnIndex + 1].seasonRange.from = moment(dateRange.to).add(1, 'day').format(DATE_FORMAT);
      this.isSelectToMode[columnIndex + 1] = true;
    }
    this.oneContractStoreService.contractSeasons$.next(this.tableHeaderColumns);
    this.calcContractDateRange();
    this.contractRatesService.validateSection();
    setTimeout(() => {
      delete this.isDateRangePickerOpened[columnIndex];
      this.changeDetector.detectChanges();
    });
  }

  calcContractDateRange(): void {
    const from: string = this.tableHeaderColumns[0].seasonRange.from;
    let to: string = '';

    this.tableHeaderColumns.forEach(season => {
      if (season.seasonRange && season.seasonRange.to) {
        to = season.seasonRange.to;
      }
    });
    this.oneContractStoreService.contractDateRange$.next({from, to});
    this.calcEditableCalendarIndex();
    this.changeDetector.detectChanges();
  }

  calcEditableCalendarIndex(): void {
    this.lastEditableCalendarIndex = 0;
    const arrLength = this.tableHeaderColumns.length;
    for (let i = 0; i < arrLength; i++) {
      if (!this.tableHeaderColumns[i].seasonRange.from || !this.tableHeaderColumns[i].seasonRange.to) {
        break;
      } else {
        this.lastEditableCalendarIndex++;
      }
    }
  }

  getDisabledRange(columnIndex: number): IFromTo {
    if (columnIndex === 0) {
      return {from: null, to: null};
    } else {
      const toDate = this.tableHeaderColumns[columnIndex - 1].seasonRange.to;
      const disabledTo = moment(toDate, DATE_FORMAT).format(DATE_FORMAT);
      return {from: null, to: disabledTo};
    }
  }

  addColumn(): void {
    const tableHeaderLen = this.tableHeaderColumns.length;
    const previousToDate = tableHeaderLen > 0 ? this.tableHeaderColumns[tableHeaderLen - 1].seasonRange.to : null;
    let nextFromDate: any;
    if (previousToDate) {
      nextFromDate = moment(previousToDate).add(1, 'day').format(DATE_FORMAT);
      this.isSelectToMode[this.tableHeaderColumns.length] = true;
    }
    this.tableHeaderColumns.push({seasonRange: {from: nextFromDate || '', to: ''}, selectedSeasonType: 'A'});
    this.seasonTypes.push(this.oneContractService.getSeasonsTypes());
    this.contractRatesService.ratesParams.forEach(row => row.seasons.push({}));
    this.tableHeader.push('Season ' + JsUtils.numberToLatter(this.tableHeaderColumns.length, true));
    this.oneContractStoreService.contractSeasons$.next(this.tableHeaderColumns);
  }

  deleteLastHeaderColumn(columnNumber: number): void {
    if (columnNumber > 0) {
      this.tableHeader.pop();
      this.tableHeaderColumns.pop();
      this.seasonTypes.pop();
      this.contractRatesService.ratesParams.forEach((params: IRatesParams) => params.seasons.pop());
      this.oneContractStoreService.contractSeasons$.next(this.tableHeaderColumns);
      this.calcContractDateRange();
    }
  }

  deleteRow(rowNumber: number): void {
    this.tableRows.splice(rowNumber, 1);
    const deletedParams: IRatesParams = this.contractRatesService.ratesParams.splice(rowNumber, 1)[0];
    if (deletedParams.roomAndCharacteristic) {
      this.tableRows.forEach(row => {
        row.roomAndCharacteristic.push({
          id: deletedParams.roomAndCharacteristic,
          name: deletedParams.roomAndCharacteristic
        });
      });
    }
  }

  addRow(): void {
    this.contractRatesService.ratesParams.push(<IRatesParams>{seasons: [{}]});
    this.tableHeaderColumns.forEach((column, columnIndex) => this.contractRatesService.ratesParams[this.contractRatesService.ratesParams.length - 1].seasons[columnIndex] = {});
    let roomAndCharacteristic = JsUtils.deepCopy(this.roomAndCharacteristic);
    this.contractRatesService.ratesParams.forEach(row => {
      roomAndCharacteristic = this.selectInputService.removeItemsFromList(roomAndCharacteristic, row.roomAndCharacteristic);
    });
    this.tableRows.push({roomAndCharacteristic: roomAndCharacteristic});
  }

  radioButtonClick(button: IRadioButton, buttonName: string): void {
    if (buttonName === 'vatIncluded') {
      this.contractRatesService.vatIncluded = button.id;
    }
    if (buttonName === 'ratePer') {
      this.contractRatesService.applicationType = button.id;
    }
  }

  openDateRangePicker($event: any, index: number): void {
    if (this.isDateRangePickerOpened[index]) {  // its the date picker wrapper
      this.isDateRangePickerOpened[index] = $event.target; // the target element is changed to the date picker itself - document click handler will keep it opened
    } else {
      this.isDateRangePickerOpened[index] = $event.target;
      const calendarSectionElement: HTMLElement = $event.currentTarget;
      const {left} = calendarSectionElement.getClientRects()[0];
      this.calcCalendarPosition($event.target, left);
    }
  }

  calcCalendarPosition(element: HTMLElement, x: number): void {
    const {left, top} = element.getClientRects()[0];
    this.dateRangePickerPosition.top = 72; // open in bottom.
    this.dateRangePickerPosition.left = x - 281; // open in right.

    if (window.innerWidth - left < 680) {
      this.dateRangePickerPosition.left = x - 937; // open on left.
    }

    if (window.innerHeight - top < 425) {
      this.dateRangePickerPosition.top = -375; // open on top.
    }
  }

  ngOnDestroy(): void {
    this.tableRows = [];
    this.tableHeader = [];
    this.tableHeaderColumns = [];
    this.contractRatesService.resetParams();
    clearTimeout(this.timer);
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
  }
}

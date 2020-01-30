import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {IContractSeason, IGuestRoomParams, ISeasonParams} from '../one-contract';
import {IDiscountType, IOneContractParams} from '../one-contract-object';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {JsUtils} from '../../../utils/jsUtils';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {DATE_FORMAT} from '../../../shared/calendar-module/calendar.const';

@Component({
  selector: 'app-guest-room-table',
  templateUrl: './guest-room-table.component.html',
  styleUrls: ['./guest-room-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestRoomTableComponent implements OnInit, OnDestroy {
  public tableHeader: string[] = [
    'Guest', 'Room & Availability', 'Application Rule', 'Type', 'Value', ''
  ];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  private seasons: IContractSeason[] = [];
  private subscriptionsArray: any[] = [];
  private roomAndCharacteristicOptions: any[] = [];
  public inputValueSymbol: string[] = [];
  private currency: string = '';
  public sortGuestMap: any = {
    'I': 1, 'C': 2, 'A': 3, '1C': 4, '2C': 5, '3C': 6, '4C': 7, '1A': 8, '2A': 9, '3A': 10, '4A': 11
  };
  public guestPriorities: string[] = ['I', 'C', 'A', '1C', '2C', '3C', '4C', '1A', '2A', '3A', '4A'];

  @Input('getRowsFromContract') getRowsFromContract: (oneContract: IOneContractParams) => any[];
  @Input('isDiscounts') isDiscounts: boolean;
  @Input('guestRoomSrv') guestRoomSrv: any;
  @Input('showDinnerOptions') showDinnerOptions: boolean = false;

  constructor(public oneContractService: CreateOneContractService, private selectInputService: SelectInputService,
              private oneContractStoreService: CreateOneContractStoreService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const {subscriptionsArray, oneContractStoreService} = this;
    oneContractStoreService.contractSeasons$.subscribe(seasons => {
      this.syncSeasons(seasons);
      this.seasons = seasons;
    });
    subscriptionsArray.push(oneContractStoreService.roomAndCharacteristic$.subscribe(this.roomAndCharacteristicHandler));
    subscriptionsArray.push(this.oneContractStoreService.selectedCurrency$.subscribe(this.onCurrencyChanged));
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => {
          if (oneContract) {
            setTimeout(() => this.resetParameters(oneContract));
          }
        }));

    if (this.showDinnerOptions) {
      this.tableHeader.unshift('Supplement');
    }
  }

  resetParameters(oneContract: IOneContractParams): void {
    this.guestRoomSrv.tableRows.forEach(row => {
      row.guestValidator.next({isValid: true, meassge: ''});
      row.guestValidator.complete();
    });
    this.inputValueSymbol = [];
    this.guestRoomSrv.resetParams();
    const rowsFromContract: any = this.getRowsFromContract(oneContract);

    for (let i = 0; i < rowsFromContract.length; i++) {
      this.addRow();
      const tableRow = this.guestRoomSrv.tableRows[i];
      if (rowsFromContract[i].supplementCode) {
        this.onSelectItem({name: '', id: rowsFromContract[i].supplementCode}, i, 'dinner');
        this.selectInputService.updateIsSelected(tableRow.dinnerOptions, null, rowsFromContract[i].supplementCode);
      }
      if (rowsFromContract[i].guestApplicationType) {
        this.onSelectItem({name: '', id: rowsFromContract[i].guestApplicationType.id}, i, 'guest');
        this.selectInputService.updateIsSelected(tableRow.guestOptions, null, rowsFromContract[i].guestApplicationType.id);
      }

      if (rowsFromContract[i].room.roomCode && rowsFromContract[i].room.characteristicCode) {
        const room = rowsFromContract[i].room;
        const sharingAvailability = room.roomCode === 'all' ? 'all' : room.roomCode + ', ' + room.characteristicCode;
        const selectedItem = {name: '', id: sharingAvailability};
        this.onSelectItem(selectedItem, i, 'roomAndCharacteristic');
        this.selectInputService.updateIsSelected(tableRow.roomAndCharacteristicList, null, selectedItem.id);
      }
      if (rowsFromContract[i].applicationType) {
        this.onSelectItem({name: '', id: rowsFromContract[i].applicationType}, i, 'applicationRule');
        this.selectInputService.updateIsSelected(tableRow.applicationRulesOptions, null, rowsFromContract[i].applicationType);
      }

      rowsFromContract[i].seasons.sort((a: any, b: any) => a.seasonCode > b.seasonCode ? 1 : -1);
      let seasonCode = rowsFromContract[i].seasons && rowsFromContract[i].seasons[0] && rowsFromContract[i].seasons[0].seasonCode;
      if (seasonCode) {
        seasonCode = seasonCode === 'SD' || seasonCode === 'CP' ? seasonCode : 'S';
      }

      if (seasonCode) {
        this.onSelectItem({name: '', id: seasonCode}, i, 'type');
        this.selectInputService.updateIsSelected(tableRow.contractPeriodOptions, null, seasonCode);

        if (seasonCode === 'CP') {
          this.guestRoomSrv.guestRoomParams[i].value = (rowsFromContract[i].seasons[0].value ? rowsFromContract[i].seasons[0].value + '' : '');
        }

        if (seasonCode === 'SD') {
          rowsFromContract[i].seasons.forEach((type: IDiscountType) => this.onSelectRange({
            from: type.travelWindow.dateFrom,
            to: type.travelWindow.dateTo
          }, i));
          this.guestRoomSrv.guestRoomParams[i].value = (rowsFromContract[i].seasons[0].value ? rowsFromContract[i].seasons[0].value + '' : '');
        }

        if (seasonCode === 'S') {
          for (let seasonIndex = 0; seasonIndex < rowsFromContract[i].seasons.length; seasonIndex++) {
            const uiIndex = JsUtils.letterToNumber(rowsFromContract[i].seasons[seasonIndex].seasonCode[0]);
            if (rowsFromContract[i].seasons[seasonIndex].seasonCode.includes('WKND') || rowsFromContract[i].seasons[seasonIndex].seasonCode.includes('WKDY')) {
              if (rowsFromContract[i].seasons[seasonIndex].seasonCode.includes('WKND')) {
                tableRow.seasonsValues[uiIndex].wknd = rowsFromContract[i].seasons[seasonIndex].value.toString();
              }
              if (rowsFromContract[i].seasons[seasonIndex].seasonCode.includes('WKDY')) {
                tableRow.seasonsValues[uiIndex].wkdy = rowsFromContract[i].seasons[seasonIndex].value.toString();
              }
            } else {
              tableRow.seasonsValues[uiIndex].value = rowsFromContract[i].seasons[seasonIndex].value.toString();
            }
          }
        }
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  }

  onCurrencyChanged = (currency: string) => {
    this.currency = currency;
    this.inputValueSymbol = this.inputValueSymbol.map((symbol: string, index: number) => {
      return this.guestRoomSrv.guestRoomParams && this.guestRoomSrv.guestRoomParams[index].applicationRule === 'Fixed Amount' ? currency : symbol;
    });
  };

  renderGuestLists(): void {
    this.guestRoomSrv.tableRows.forEach((row: any, index: number) => {
      row.guestValidator.next({isValid: true, message: ''});
      this.guestPriorities.forEach(guest => {
        if (!this.includedAllOptions(guest) && !this.selectInputService.isContains(row.guestOptions, null, guest)) {

          const addedGuestOption: ISelectItem = JsUtils.deepCopy((<ISelectItem>this.selectInputService.getItem(this.oneContractService.getGuestOptions(), null, guest)));
          row.guestOptions.push(addedGuestOption);
        }
        const params = this.guestRoomSrv.guestRoomParams[index];
        if (params.guest === guest && this.includedAllOptions(guest) && !JsUtils.isDefineAndNotNull(params.roomAndCharacteristic)) {
          const implementedGuest: ISelectItem = <ISelectItem>this.selectInputService.getItem(row.guestOptions, null, guest);
          row.guestValidator.next({isValid: false, message: `${implementedGuest.name} is already implemented`});
        }
      });
      row.guestOptions.sort((a1: ISelectItem, a2: ISelectItem) => this.guestSort(a1, a2));
    });
  }

  addRow(): void {
    this.guestRoomSrv.tableRows.push({
      guestValidator: new Subject<IValidationStatus>(),
      guestOptions: this.oneContractService.getGuestOptions(),
      type: 'CP',
      discountValueMaxRange: null,
      selectedDates: [],
      isCalendarOpen: false,
      seasonsValues: [],
      roomAndCharacteristicList: JsUtils.deepCopy(this.roomAndCharacteristicOptions),
      applicationRulesOptions: this.oneContractService.getApplicationRuleOptions(),
      contractPeriodOptions: JsUtils.deepCopy(this.oneContractService.getContractPeriodsOptions()),
    });
    this.inputValueSymbol.push('');
    this.syncSeasons(this.seasons);
    this.guestRoomSrv.guestRoomParams.push(<IGuestRoomParams>{value: ''});

    const lastIndex: number = this.guestRoomSrv.tableRows.length - 1;
    const lastRow: any = this.guestRoomSrv.tableRows[lastIndex];
    if (this.showDinnerOptions) {
      this.guestRoomSrv.tableRows[lastIndex].dinnerOptions = this.oneContractService.getDinnerOptions();
    }
    lastRow.guestValidator.next({isValid: true, message: ''});
    const filteredDefaults = [...this.guestPriorities];
    for (let i = 0; i < this.guestPriorities.length; i++) {
      if (this.includedAllOptions(this.guestPriorities[i])) {
        lastRow.guestOptions = this.selectInputService.removeItemsFromList(lastRow.guestOptions, null, this.guestPriorities[i]);
        filteredDefaults.splice(filteredDefaults.indexOf(this.guestPriorities[i]), 1);
      }
    }
    this.guestRoomSrv.guestRoomParams[lastIndex].guest = filteredDefaults[0];
    this.selectInputService.updateIsSelected(lastRow.guestOptions, null, this.guestRoomSrv.guestRoomParams[lastIndex].guest);
    const selectedOption: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(lastRow.guestOptions, false);
    if (selectedOption) {
      this.onSelectItem(selectedOption, lastIndex, 'guest');
    }
  }

  deleteRow(index: number): void {
    let oldGuest: ISelectItem;
    if (this.guestRoomSrv.guestRoomParams[index].guest) {
      const gustOptions = this.oneContractService.getGuestOptions();
      const guest = this.guestRoomSrv.guestRoomParams[index].guest;
      oldGuest = <ISelectItem>this.selectInputService.getItem(gustOptions, null, guest);
    }

    this.guestRoomSrv.tableRows.splice(index, 1);
    this.guestRoomSrv.guestRoomParams.splice(index, 1);
    this.inputValueSymbol.splice(index, 1);

    if (JsUtils.isDefineAndNotNull(oldGuest)) {
      this.guestRoomSrv.tableRows.forEach(r => {
        if (!this.selectInputService.isContains(r.guestOptions, null, oldGuest.id) && !this.includedAllOptions(oldGuest.id)) {
          r.guestOptions.push(oldGuest);
          r.guestOptions.sort((a1: ISelectItem, a2: ISelectItem) => this.guestSort(a1, a2));
        }
      });
    }
    this.roomAndCharacteristicHandler(this.roomAndCharacteristicOptions);
  }

  onSelectItem(selectedItem: ISelectItem, index: number, paramMap: string): void {
    if (paramMap === 'dinner') {
      this.guestRoomSrv.guestRoomParams[index][paramMap] = selectedItem.id;
    }
    if (paramMap === 'type') {
      this.guestRoomSrv.guestRoomParams[index][paramMap] = selectedItem.id;
      this.guestRoomSrv.tableRows[index][paramMap] = selectedItem.id;
      if (selectedItem.id === 'S') {
        this.guestRoomSrv.guestRoomParams[index].value = undefined;
      }
      this.guestRoomSrv.tableRows[index].penalty = selectedItem.id;
      if (!this.guestRoomSrv.tableRows[index].isSeasons) {
        this.guestRoomSrv.tableRows[index].seasonsValues.forEach(r => {
          r.value = undefined;
          r.wkdy = undefined;
          r.wknd = undefined;
        });
      }
    }
    if (selectedItem.id === null) {
      delete this.guestRoomSrv.guestRoomParams[index][paramMap];
    }
    if (paramMap === 'applicationRule') {
      this.guestRoomSrv.guestRoomParams[index][paramMap] = selectedItem.id;
      this.guestRoomSrv.tableRows[index].discountValueMaxRange = selectedItem.id !== 'Fixed Amount' ? 100 : null;
      this.guestRoomSrv.guestRoomParams[index].value = '';
      this.guestRoomSrv.tableRows[index].seasonsValues.forEach(s => {
        s.wknd = '';
        s.wkdy = '';
        s.value = '';
      });

      this.inputValueSymbol[index] = '';
      if (selectedItem.id === 'Room and Board (%)' || selectedItem.id === 'Room (%)') {
        this.inputValueSymbol[index] = '%';
      }

      if (selectedItem.id === 'Fixed Amount') {
        this.inputValueSymbol[index] = this.currency;
      }
    }
    if (paramMap === 'guest') {
      const {guest} = this.guestRoomSrv.guestRoomParams[index];
      const oldOption: ISelectItem = JsUtils.deepCopy((<ISelectItem>this.selectInputService.getItem(this.oneContractService.getGuestOptions(), null, guest)));

      this.guestRoomSrv.guestRoomParams[index][paramMap] = selectedItem.id;
      if (oldOption.id !== selectedItem.id) {
        this.guestRoomSrv.tableRows[index].guestValidator.next({isValid: true, message: ''});
      }
      const selectedCharacteristic: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(this.guestRoomSrv.tableRows[index].roomAndCharacteristicList, false);
      this.guestRoomSrv.tableRows[index].roomAndCharacteristicList = null;
      this.roomAndCharacteristicHandler(this.roomAndCharacteristicOptions);
      this.selectInputService.updateIsSelected(this.guestRoomSrv.tableRows[index].roomAndCharacteristicList, null);
      this.guestRoomSrv.tableRows[index].roomAndCharacteristicList = [...this.guestRoomSrv.tableRows[index].roomAndCharacteristicList];
      this.guestRoomSrv.tableRows.forEach((r: any, ind: number) => {
        if (oldOption.id !== selectedItem.id && !this.selectInputService.isContains(r.guestOptions, null, oldOption.id)) {
          r.roomAndCharacteristicList.push(oldOption);
          r.roomAndCharacteristicList = [...r.roomAndCharacteristicList];
          r.roomAndCharacteristicList.sort((a1: ISelectItem, a2: ISelectItem) => this.guestSort(a1, a2));
        }
        if (ind !== index) {
          if (selectedItem.id === this.guestRoomSrv.guestRoomParams[index].guest) {
          } else {
            if (JsUtils.isDefineAndNotNull(selectedCharacteristic) && this.includedAllOptions(selectedItem.id)) {
              r.guestOptions = this.selectInputService.removeItemsFromList(r.guestOptions, null, selectedItem.id);
            }
          }
        }
      });
      if (this.includedAllOptions(oldOption.id) && !JsUtils.isDefineAndNotNull(this.guestRoomSrv.tableRows[index].roomAndCharacteristicList) && selectedItem.id !== oldOption.id) {
        this.guestRoomSrv.tableRows[index].guestOptions = this.selectInputService.removeItemsFromList(this.guestRoomSrv.tableRows[index].guestOptions, null, oldOption.id);
      }
    }

    if (paramMap === 'roomAndCharacteristic') {
      this.guestRoomSrv.guestRoomParams[index].roomAndCharacteristic = selectedItem.id;
      const {guest} = this.guestRoomSrv.guestRoomParams[index];
      this.roomAndCharacteristicHandler(this.roomAndCharacteristicOptions);
      if (this.includedAllOptions(guest)) {
        this.guestRoomSrv.tableRows.forEach((row: any, ind: number) => {
          if (this.guestRoomSrv.guestRoomParams[ind].guest !== guest) {
            row.guestOptions = this.selectInputService.removeItemsFromList(row.guestOptions, null, guest);
          } else {
            if (ind !== index && selectedItem.id === 'all') {
              const implementedGuest: ISelectItem = <ISelectItem>this.selectInputService.getItem(row.guestOptions, null, guest);
              setTimeout(() => row.guestValidator.next({
                isValid: false,
                message: `${implementedGuest.name} is already implemented`
              }));
            }
          }
        });
      } else {
        this.guestRoomSrv.tableRows
          .filter((row: any) => !this.selectInputService.isContains(row.guestOptions, null, guest))
          .forEach(row => {
            row.guestOptions.push(JsUtils.deepCopy((<ISelectItem>this.selectInputService.getItem(this.oneContractService.getGuestOptions(), null, guest))));
            row.guestOptions.sort((a1: ISelectItem, a2: ISelectItem) => this.guestSort(a1, a2));
          });
      }
    }
  }

  roomAndCharacteristicHandler = (newRoomAndCharacteristicList: ISelectItem[]) => {
    if (newRoomAndCharacteristicList) {
      this.oneContractService.roomAndCharacteristicHandler(newRoomAndCharacteristicList, this.roomAndCharacteristicOptions, this.guestRoomSrv.tableRows, this.guestRoomSrv.guestRoomParams, 'guest');
      this.roomAndCharacteristicOptions = newRoomAndCharacteristicList;
    }
    this.renderGuestLists();
  };

  onSelectRange(selectedRange: any, rowNumber: number): void {
    const from = moment(selectedRange.from, DATE_FORMAT).format(DATE_FORMAT);
    const to = moment(selectedRange.to, DATE_FORMAT).format(DATE_FORMAT);
    this.guestRoomSrv.tableRows[rowNumber].selectedDates.push(`${from} - ${to}`);
  }

  syncSeasons(seasons: IContractSeason[]): void {
    this.guestRoomSrv.tableRows.forEach(r => {
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

  guestSort(guest1: ISelectItem, guest2: ISelectItem): number {
    return this.sortGuestMap[guest1.id] > this.sortGuestMap[guest2.id] ? 1 : -1;
  }

  includedAllOptions(guest: string): boolean {
    return this.oneContractService.includedAllOptions(guest, this.guestRoomSrv.tableRows, this.guestRoomSrv.guestRoomParams, 'guest', this.roomAndCharacteristicOptions);
  }

  isCalendarOpenHandler(isCalendarOpen: boolean, tableRow: any): void {
    tableRow.isCalendarOpen = isCalendarOpen;
    if (isCalendarOpen) {
      this.changeDetector.reattach();
      setTimeout(() => this.changeDetector.detectChanges());
    }
  }

  ngOnDestroy(): void {
    this.inputValueSymbol = [];
    this.currency = '';
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
    this.guestRoomSrv.resetParams();
  }
}

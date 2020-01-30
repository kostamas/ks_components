import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractStopSaleService} from './contract-stop-sale.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {ISelectItem} from '../../../shared/types/ISelect';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {IDateFromTo, IOneContractParams, IRoom2, IStopSale} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {IFromTo} from '../../../shared/types/calendar';
import {DATE_FORMAT} from '../../../shared/calendar-module/calendar.const';

@Component({
  selector: 'app-contract-stop-sale',
  templateUrl: './contract-stop-sale.component.html',
  styleUrls: ['./contract-stop-sale.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractStopSaleComponent implements OnInit, OnDestroy {
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public displayForm: boolean = false;
  public tableHeader: string[] = ['Room & Characteristic', 'Date Range', ''];
  public tableRows: any[] = [];
  public numberOnly: any = InputUtils.numberOnly;
  private subscriptionsArray: any[] = [];
  public roomAndCharacteristicList: ISelectItem[] = [];

  constructor(public oneContractService: CreateOneContractService, public contractStopSaleService: ContractStopSaleService,
              private oneContractStoreService: CreateOneContractStoreService, public selectInputService: SelectInputService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(this.oneContractStoreService.oneContract$
      .pipe(filter(contract => !contract || !contract.dontUpdateView))
      .subscribe(oneContract => {
        setTimeout(() => this.resetParams(oneContract));
      }));
    this.subscriptionsArray.push(this.oneContractStoreService.roomAndCharacteristic$.subscribe(this.roomAndCharacteristicHandler));
  }

  roomAndCharacteristicHandler = (updatedRoomAndCharacteristicList: ISelectItem[]): void => {
    if (updatedRoomAndCharacteristicList) {
      const {tableRows} = this;
      if (this.roomAndCharacteristicList.length > updatedRoomAndCharacteristicList.length) { // check for any delete
        const itemsToDelete: ISelectItem[] = this.roomAndCharacteristicList.filter(r1 => {
          return updatedRoomAndCharacteristicList.filter(r2 => r1.id === r2.id).length === 0;
        });
        tableRows.forEach((r: any, ind: number) => {
          if (updatedRoomAndCharacteristicList.length === 0) {
            r.roomAndCharacteristic = null;
            r.roomAndCharacteristicList = [];
            this.contractStopSaleService.contractStopSaleParams[ind].room = <IRoom2>{};
          }
          r.roomAndCharacteristicList = this.selectInputService.removeItemsFromList(r.roomAndCharacteristicList, null, itemsToDelete.map(room => room.id));
          if (updatedRoomAndCharacteristicList.length > 0) {
            if (this.selectInputService.isContains(itemsToDelete, null, r.roomAndCharacteristic)) {
              r.roomAndCharacteristic = null;
              this.contractStopSaleService.contractStopSaleParams[ind].room = <IRoom2>{};
            }
          }
        });
      } else { // check for any added new rooms
        tableRows.forEach((row: any) => {
          row.roomAndCharacteristicList = JsUtils.deepCopy(updatedRoomAndCharacteristicList);
          if (updatedRoomAndCharacteristicList.length > 0 && !this.selectInputService.isContains(row.roomAndCharacteristicList, null, 'all')) {
            row.roomAndCharacteristicList.unshift({id: 'all', name: 'All'});
          }
          if (JsUtils.isDefineAndNotNull(row.roomAndCharacteristic)) {
            this.selectInputService.updateIsSelected(row.roomAndCharacteristicList, null, row.roomAndCharacteristic);
          }
        });
      }
      this.roomAndCharacteristicList = updatedRoomAndCharacteristicList;
    }
    setTimeout(() => this.changeDetector.detectChanges());
  };

  resetParams(oneContract: IOneContractParams): void {
    this.tableRows = [];
    this.contractStopSaleService.resetParams();
    if (oneContract) {
      this.contractStopSaleService.contractStopSaleParams = JsUtils.deepCopy(oneContract.contractData.stopSales);
      const {contractStopSaleParams} = this.contractStopSaleService;
      if (contractStopSaleParams.length > 0) {
        this.displayForm = true;
        contractStopSaleParams.forEach((d: IStopSale, ind: number) => {
          this.addRow();
          if (d.applicationDate) {
            this.tableRows[ind].range = <IDateFromTo>{
              dateFrom: moment(d.applicationDate.dateFrom).format(DATE_FORMAT),
              dateTo: moment(d.applicationDate.dateTo).format(DATE_FORMAT),
            };
          } else {
            delete this.tableRows[ind].range;
          }

          const roomAndCharacteristicList = this.tableRows[ind].roomAndCharacteristicList;
          if (JsUtils.isDefineAndNotNull(d.room) && JsUtils.isDefined(d.room.roomCode) && JsUtils.isDefined(d.room.characteristicCode) && roomAndCharacteristicList && roomAndCharacteristicList.length) {
            const roomAndCharacteristic: string = d.room.roomCode === null ? 'all' : `${d.room.roomCode}, ${d.room.characteristicCode}`;
            this.selectInputService.updateIsSelected(this.tableRows[ind].roomAndCharacteristicList, null, roomAndCharacteristic);
            const selectedItemRoomAndCharacteristic = <ISelectItem>this.selectInputService.getSelectedItem(this.tableRows[ind].roomAndCharacteristicList);
            if (selectedItemRoomAndCharacteristic) {
              this.onSelectItem(selectedItemRoomAndCharacteristic, 'roomAndCharacteristic', ind);
            }
          }
        });
      }
    }
    setTimeout(() => this.changeDetector.detectChanges());
  }

  onSelectItem(selectedItem: ISelectItem, param: string, index: number): void {
    this.tableRows[index][param] = selectedItem.id;
    if (param === 'roomAndCharacteristic') {
      let roomCode = '';
      let characteristicCode = '';
      if (this.tableRows[index].roomAndCharacteristic) {
        const isAllSharing = this.tableRows[index].roomAndCharacteristic.split(',')[0] === 'all';
        roomCode = isAllSharing ? null : this.tableRows[index].roomAndCharacteristic.split(',')[0];
        characteristicCode = isAllSharing ? null : this.tableRows[index].roomAndCharacteristic.split(',')[1].trim();
      }
      this.contractStopSaleService.contractStopSaleParams[index].room.roomCode = JsUtils.isDefineAndNotNull(this.tableRows[index][param]) ? roomCode : undefined;
      this.contractStopSaleService.contractStopSaleParams[index].room.characteristicCode = JsUtils.isDefineAndNotNull(this.tableRows[index][param]) ? characteristicCode : undefined;
    }
  }

  addRow(): void {
    this.tableRows.push({
      roomAndCharacteristic: null,
      roomAndCharacteristicList: JsUtils.deepCopy(this.roomAndCharacteristicList),
      range: {dateFrom: moment().format(DATE_FORMAT), dateTo: moment().add(1, 'day').format(DATE_FORMAT)},
      isCalendarOpen: false
    });
    if (!JsUtils.isDefined(this.contractStopSaleService.contractStopSaleParams[this.tableRows.length - 1])) {
      this.contractStopSaleService.contractStopSaleParams.push(<IStopSale>{
        applicationDate: {dateFrom: moment().format(DATE_FORMAT), dateTo: moment().add(1, 'day').format(DATE_FORMAT)},
        room: <IRoom2>{}
      });
    }
    this.roomAndCharacteristicHandler(this.roomAndCharacteristicList);
  }

  deleteRow(rowNumber: number): void {
    this.tableRows.splice(rowNumber, 1);
    this.contractStopSaleService.contractStopSaleParams.splice(rowNumber, 1);
  }

  onSelectRange(selectedRange: IFromTo, rowNumber: number): void {
    if (selectedRange) {
      if (!this.contractStopSaleService.contractStopSaleParams[rowNumber].applicationDate) {
        this.contractStopSaleService.contractStopSaleParams[rowNumber].applicationDate = <IDateFromTo>{};
      }
      if (!this.tableRows[rowNumber].range) {
        this.tableRows[rowNumber].range = {};
      }
      this.contractStopSaleService.contractStopSaleParams[rowNumber].applicationDate.dateFrom = moment(selectedRange.from).format(DATE_FORMAT);
      this.contractStopSaleService.contractStopSaleParams[rowNumber].applicationDate.dateTo = moment(selectedRange.to).format(DATE_FORMAT);
      this.tableRows[rowNumber].range = {dateFrom: selectedRange.from, dateTo: selectedRange.to};
    } else {
      delete this.contractStopSaleService.contractStopSaleParams[rowNumber].applicationDate;
      delete this.tableRows[rowNumber].range;
    }
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
    this.tableRows = [];
    this.contractStopSaleService.resetParams();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ContractMinStayService} from './contract-min-stay.service';
import {Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {IOneContractParams} from '../one-contract-object';
import {JsUtils} from '../../../utils/jsUtils';
import {IAllotment, IAllotmentSeasonParams, IContractSeason} from '../one-contract';

@Component({
  selector: 'app-contract-min-stay',
  templateUrl: './contract-min-stay.component.html',
  styleUrls: ['./contract-min-stay.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractMinStayComponent implements OnInit, OnDestroy {
  public displayForm: boolean = false;
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public typeList: ISelectItem[] = [
    {id: 'period', name: 'Contract Period', isSelected: true}, {id: 'seasonally', name: 'Seasonally'}
  ];
  public roomAndCharacteristicList: ISelectItem[] = [];
  private subscriptionsArray: any[] = [];

  constructor(public oneContractService: CreateOneContractService, public selectInputService: SelectInputService,
              public contractMinStayService: ContractMinStayService, private changeDetector: ChangeDetectorRef,
              private oneContractStoreService: CreateOneContractStoreService) {
  }

  ngOnInit(): void {
    this.subscriptionsArray.push(this.oneContractStoreService.contractSeasons$.subscribe(seasons => {
      this.syncSeasons(seasons);
      this.contractMinStayService.seasons = seasons;
      setTimeout(() => this.changeDetector.detectChanges());
    }));
    this.subscriptionsArray.push(this.oneContractStoreService.roomAndCharacteristic$.subscribe(this.roomAndCharacteristicHandler));
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe(oneContract => setTimeout(() => this.resetParams(oneContract))));
  }

  resetParams(oneContract: IOneContractParams): void {
    this.displayForm = false;
    this.contractMinStayService.resetParams();
    this.contractMinStayService.contractMinStayParameters.forEach(r => {
      r.roomAndCharacteristicValidator$.next({isValid: true});
      r.roomAndCharacteristicValidator$.complete();
    });
    this.contractMinStayService.contractMinStayParameters = [];
    if (oneContract) {
      const minimumStay = JsUtils.deepCopy(oneContract.contractData.minimumStay);
      if (oneContract.contractData.minimumStay.length > 0) {
        this.displayForm = true;
        for (let rowIndex: number = 0; rowIndex < minimumStay.length; rowIndex++) {
          this.addRow();
          const tableRow = this.contractMinStayService.contractMinStayParameters[rowIndex];
          this.selectInputService.updateIsSelected(tableRow.type, null, minimumStay[rowIndex].seasons[0].seasonCode === 'CP' ? 'period' : 'seasonally');
          minimumStay[rowIndex].seasons.sort((a: any, b: any) => a.seasonCode > b.seasonCode ? 1 : -1);
          let roomAndCharacteristicCode: string;
          if (minimumStay[rowIndex].room === null) {
            roomAndCharacteristicCode = 'all';
          } else {
            if (minimumStay[rowIndex].room.roomCode && minimumStay[rowIndex].room.characteristicCode) {
              const room = minimumStay[rowIndex].room;
              roomAndCharacteristicCode = room.roomCode === 'all' ? 'all' : `${room.roomCode}, ${room.characteristicCode}`;
            }
          }
          if (roomAndCharacteristicCode) {
            this.selectInputService.updateIsSelected(tableRow.roomAndCharacteristicList, null, roomAndCharacteristicCode);
            this.onSelectItem(<ISelectItem>this.selectInputService.getSelectedItem(tableRow.roomAndCharacteristicList), 'roomAndCharacteristic', rowIndex, tableRow);
          }
          if (minimumStay[rowIndex].seasons[0].seasonCode === 'CP') {
            tableRow.isSeasons = false;
            this.contractMinStayService.contractMinStayParameters[rowIndex].nights = minimumStay[rowIndex].seasons[0].value;
          } else {
            tableRow.isSeasons = true;
            this.contractMinStayService.contractMinStayParameters[rowIndex].nights = '';

            for (let seasonIndex = 0; seasonIndex < minimumStay[rowIndex].seasons.length; seasonIndex++) {
              const uiIndex = JsUtils.letterToNumber(minimumStay[rowIndex].seasons[seasonIndex].seasonCode[0]);
              if (minimumStay[rowIndex].seasons[seasonIndex].seasonCode.includes('WKND') || minimumStay[rowIndex].seasons[seasonIndex].seasonCode.includes('WKDY')) {
                if (minimumStay[rowIndex].seasons[seasonIndex].seasonCode.includes('WKND')) {
                  tableRow.seasonsValues[uiIndex].wknd = JsUtils.isDefined(minimumStay[rowIndex].seasons[seasonIndex].value) ? minimumStay[rowIndex].seasons[seasonIndex].value : null;
                }
                if (minimumStay[rowIndex].seasons[seasonIndex].seasonCode.includes('WKDY')) {
                  tableRow.seasonsValues[uiIndex].wkdy = JsUtils.isDefined(minimumStay[rowIndex].seasons[seasonIndex].value) ? minimumStay[rowIndex].seasons[seasonIndex].value : null;
                }
              } else {
                tableRow.seasonsValues[uiIndex].value = JsUtils.isDefined(minimumStay[rowIndex].seasons[seasonIndex].value) ? minimumStay[rowIndex].seasons[seasonIndex].value : null;
              }
            }
          }

        }
      }
    } else {
      this.displayForm = false;
    }
    setTimeout(() => this.changeDetector.detectChanges());
  }

  roomAndCharacteristicHandler = (roomAndCharacteristic: ISelectItem[]): void => {
    if (roomAndCharacteristic) {
      const {contractMinStayParameters} = this.contractMinStayService;

      if (this.roomAndCharacteristicList.length > roomAndCharacteristic.length) { // check for any delete
        const itemsToDelete: ISelectItem[] = this.roomAndCharacteristicList.filter(r1 => {
          return roomAndCharacteristic.filter(r2 => r1.id === r2.id).length === 0;
        });
        contractMinStayParameters.forEach(r => {
          r.roomAndCharacteristicValidator$.next({message: '', isValid: true});
          if (roomAndCharacteristic.length <= 0) {
            r.roomAndCharacteristic = null;
            r.roomAndCharacteristicList = this.selectInputService.removeItemsFromList(r.roomAndCharacteristicList, null, 'all');
          }
          r.roomAndCharacteristicList = this.selectInputService.removeItemsFromList(r.roomAndCharacteristicList, null, itemsToDelete.map(room => room.id));
          if (roomAndCharacteristic.length > 0) {
            if (this.selectInputService.isContains(itemsToDelete, null, r.roomAndCharacteristic)) {
              r.roomAndCharacteristic = null;
            }
          } else {
            r.roomAndCharacteristic = null;
            r.roomAndCharacteristicList = [];
          }
          if ((r.roomAndCharacteristic === null && r.roomAndCharacteristicList.length < roomAndCharacteristic.length) || roomAndCharacteristic.length === 0) {
            r.roomAndCharacteristicValidator$.next({
              message: 'Invalid Room & Characteristic',
              isValid: false
            });
          }
        });
      } else {
        contractMinStayParameters.forEach((row: any, ind: number) => {
          row.roomAndCharacteristicList = JsUtils.deepCopy(roomAndCharacteristic);
          if (ind === 0 && contractMinStayParameters.length === 1 && roomAndCharacteristic.length > 0) {
            row.roomAndCharacteristicList.unshift({id: 'all', name: 'All'});
            if (row.roomAndCharacteristic === 'all') {
              this.selectInputService.updateIsSelected(row.roomAndCharacteristicList, null, 'all');
            }
          }
        });
        contractMinStayParameters.forEach((row1: any, ind1: number) => {
          if (row1.roomAndCharacteristic !== 'all') {
            if (this.selectInputService.isContains(roomAndCharacteristic, null, row1.roomAndCharacteristic)) {
              this.selectInputService.updateIsSelected(row1.roomAndCharacteristicList, null, row1.roomAndCharacteristic);
              contractMinStayParameters.forEach((row2: IAllotment, ind2: number) => {
                if (ind1 !== ind2) {
                  row2.roomAndCharacteristicList = this.selectInputService.removeItemsFromList(row2.roomAndCharacteristicList, null, row1.roomAndCharacteristic);
                }
              });
            } else {
              row1.roomAndCharacteristic = null;
            }
          }
        });
      }
      this.roomAndCharacteristicList = roomAndCharacteristic;
      setTimeout(() => this.changeDetector.detectChanges());
    }
  };


  onSelectItem(selectedItem: ISelectItem, param: string, index: number, item: any): void {
    if (param === 'type') {
      item.isSeasons = selectedItem.id === 'seasonally';
      if (item.isSeasons) {
        item.nights = null;
        item.seasonsValues = [];
        this.syncSeasons(this.contractMinStayService.seasons);
      }
    }
    if (param === 'roomAndCharacteristic') {
      this.contractMinStayService.contractMinStayParameters[index].roomAndCharacteristic = selectedItem.id;
      this.roomAndCharacteristicHandler(this.roomAndCharacteristicList);
      if (JsUtils.isDefineAndNotNull(this.contractMinStayService.contractMinStayParameters[index].roomAndCharacteristic)) {
        this.contractMinStayService.contractMinStayParameters[index].roomAndCharacteristicValidator$.next({
          message: '',
          isValid: true
        });
      }
    }
  }

  hideOrDisplayForm(): void {
    this.displayForm = !this.displayForm;
  }

  syncSeasons(seasons: IContractSeason[]): void {
    this.contractMinStayService.contractMinStayParameters.forEach(minStay => {
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

  addRow(): void {
    const minimumStayItem: any = {
      type: JsUtils.deepCopy(this.typeList),
      nights: null,
      seasonsValues: [],
      isSeasons: false,
      roomAndCharacteristicList: JsUtils.deepCopy(this.roomAndCharacteristicList),
      roomAndCharacteristicValidator$: new Subject<IValidationStatus>(),
      roomAndCharacteristic: null
    };
    this.contractMinStayService.contractMinStayParameters.push(minimumStayItem);
    this.roomAndCharacteristicHandler(this.roomAndCharacteristicList);
    this.syncSeasons(this.contractMinStayService.seasons);
  }

  deleteRow(item: any): void {
    const deletedItemIndex: number = this.contractMinStayService.contractMinStayParameters.indexOf(item);
    this.contractMinStayService.contractMinStayParameters.splice(deletedItemIndex, 1);
    if (this.contractMinStayService.contractMinStayParameters.length === 1) {
      this.contractMinStayService.contractMinStayParameters[0].roomAndCharacteristicList.unshift({
        id: 'all',
        name: 'All',
        isSelected: false
      });
    }
    this.roomAndCharacteristicHandler(this.roomAndCharacteristicList);
  }

  addRowsDisabled(): boolean {
    const isAllSelected: boolean = this.contractMinStayService.contractMinStayParameters.filter((r: any) => {
      const allOption: ISelectItem = <ISelectItem>this.selectInputService.getSelectedItem(r.roomAndCharacteristicList, false);
      return JsUtils.isDefined(allOption) && allOption.id === 'all';
    }).length > 0;
    return this.contractMinStayService.contractMinStayParameters.length === this.roomAndCharacteristicList.length || isAllSelected || this.roomAndCharacteristicList.length === 0;
  }

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
    this.contractMinStayService.resetParams();
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ContractRoomsAvailabilityService} from './contract-rooms-availability.service';
import {CreateOneContractService} from '../create-one-contract.service';
import {Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {filter} from 'rxjs/operators';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {ISvgIcons, SVG_ICONS} from '../../../shared/svg-icon-module/svg-icons.const';
import {InputUtils} from '../../../utils/input-utils';
import {SelectInputService} from '../../../shared/services/select-input.service';
import {IRoomsAndAvailability} from '../one-contract';
import {deepCopy, JsUtils} from '../../../utils/jsUtils';
import {IOneContractParams, IRoom} from '../one-contract-object';
import {characteristicsNames, roomsNames} from './rooms-and-characteristics-names';

@Component({
  selector: 'app-contract-rooms-availability',
  templateUrl: './contract-rooms-availability.component.html',
  styleUrls: ['./contract-rooms-availability.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractRoomsAvailabilityComponent implements OnInit, OnDestroy {
  public tableRows: { rooms: ISelectItem[], characteristics: ISelectItem[], sharingAvailability: ISelectItem[] }[] = [];
  public SVG_ICONS: ISvgIcons = SVG_ICONS;
  public tableHeader: string[];
  public subscriptionsArray: any[] = [];
  public roomsAndCharacteristicsStatus$: any[] = [];
  public isRangeValue: any = InputUtils.isRangeValue;
  public preventPasteValue: any = InputUtils.preventPasteValue;

  constructor(public contractRoomsAvailabilityService: ContractRoomsAvailabilityService,
              private selectInputService: SelectInputService, public oneContractService: CreateOneContractService,
              private oneContractStoreService: CreateOneContractStoreService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.tableHeader = [
      'Room Description', 'Room', 'Characteristic', 'Sharing Availability',
      'Standard Capacity', 'Min Capacity', 'Max Adults', 'Max Child', 'Max Capacity', 'Max Babies', ''
    ];
    this.contractRoomsAvailabilityService.roomsAvailabilityParams = [<IRoomsAndAvailability>{}];
    this.tableRows.push({
      rooms: deepCopy(roomsNames),
      characteristics: deepCopy(characteristicsNames),
      sharingAvailability: []
    });
    this.subscriptionsArray.push(
      this.oneContractStoreService.oneContract$
        .pipe(filter(contract => !contract || !contract.dontUpdateView))
        .subscribe((oneContract: IOneContractParams) => this.resetParameters(oneContract))
    );
    this.roomsAndCharacteristicsStatus$.push(new Subject<IValidationStatus>());
  }

  resetParameters = (oneContract: IOneContractParams) => {
    const rooms: IRoom[] = oneContract && oneContract.contractData && JsUtils.deepCopy(oneContract.contractData.rooms) || [];
    const roomsLength = rooms.length;
    this.tableRows = [];
    this.contractRoomsAvailabilityService.resetParams();

    for (let i = 0; i < roomsLength; i++) {
      this.addRow();
      if (rooms[i].type) {
        this.selectInputService.updateIsSelected(this.tableRows[i].rooms, null, rooms[i].type.id);
        const selectedRoom = {id: rooms[i].type.id, name: rooms[i].type.id};
        this.onSelectRoomOrCharacteristic(selectedRoom, i, 'rooms', 'room');
      }
      if (rooms[i].characteristic) {
        this.selectInputService.updateIsSelected(this.tableRows[i].characteristics, null, rooms[i].characteristic.id);
        const selectedCharacteristic = {id: rooms[i].characteristic.id, name: rooms[i].characteristic.id};
        this.onSelectRoomOrCharacteristic(selectedCharacteristic, i, 'characteristics', 'characteristic');
      }
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].maxChild = rooms[i].maxChildrenCapacity || rooms[i].maxChildrenCapacity === 0 ? String(rooms[i].maxChildrenCapacity) : '';
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].maxAdults = (rooms[i].maxAdultsCapacity || '') + '';
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].maxBabies = rooms[i].maxBabiesCapacity || rooms[i].maxBabiesCapacity === 0 ? String(rooms[i].maxBabiesCapacity) : '';
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].description = rooms[i].description;
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].standardCapacity = (rooms[i].standard || '') + '';
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].maxCapacity = rooms[i].max && rooms[i].max.toString() || '';
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].minCapacity = (rooms[i].min || '') + '';
      this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].minCapacity = (rooms[i].min || '') + '';
    }
    for (let i = 0; i < roomsLength; i++) {
      if (rooms[i].sharedRoomCode && rooms[i].sharedCharacteristicCode) {
        const SharingAvailability = rooms[i].sharedRoomCode + ', ' + rooms[i].sharedCharacteristicCode;
        this.onSelectSharingAvailability({id: SharingAvailability, name: SharingAvailability}, i);
      }
    }
    setTimeout(() => {
      this.validateRoomAndCharacteristic(); // important - must called before this.updateSharingAvailabilityOptions()
      // because it may change the global roomAndCharacteristic
      this.updateSharingAvailabilityOptions();

      setTimeout(() => this.changeDetector.detectChanges());
    });
  };

  onSelectRoomOrCharacteristic(selectedItem: ISelectItem, rowNumber: number, listName: string, paramName: string): void {
    const roomsAvailabilityParams = this.contractRoomsAvailabilityService.roomsAvailabilityParams;
    roomsAvailabilityParams[rowNumber][paramName] = selectedItem.id;
    this.validateRoomAndCharacteristic(); // important - must called before this.updateSharingAvailabilityOptions()
    // because it may change the global roomAndCharacteristic
    this.updateSharingAvailabilityOptions();
  }

  validateRoomAndCharacteristic(): void {
    const roomsAvailabilityParams = this.contractRoomsAvailabilityService.roomsAvailabilityParams;
    const arrLength = this.tableRows.length;
    const allRoomAndCharacteristics = {};
    let key;

    for (let i = 0; i < arrLength; i++) {
      this.roomsAndCharacteristicsStatus$[i].next({isValid: true, message: ''});
    }
    for (let i = 0; i < arrLength; i++) {
      key = '';
      if (roomsAvailabilityParams[i].room && roomsAvailabilityParams[i].characteristic) {
        key = roomsAvailabilityParams[i].room + ', ' + roomsAvailabilityParams[i].characteristic;
      }
      if (allRoomAndCharacteristics[key]) {
        const message = `Characteristic ${roomsAvailabilityParams[i].characteristic} already exists for Room ${roomsAvailabilityParams[i].room}`;
        this.roomsAndCharacteristicsStatus$[i].next({isValid: false, message});
        this.roomsAndCharacteristicsStatus$[allRoomAndCharacteristics[key]].next({isValid: false, message});

        if (this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].sharingAvailability === key) {
          delete this.contractRoomsAvailabilityService.roomsAvailabilityParams[i].sharingAvailability;
        }
        if (this.contractRoomsAvailabilityService.roomsAvailabilityParams[allRoomAndCharacteristics[key]].sharingAvailability === key) {
          delete this.contractRoomsAvailabilityService.roomsAvailabilityParams[allRoomAndCharacteristics[key]].sharingAvailability;
        }
      } else {
        if (key) {
          allRoomAndCharacteristics[key] = String(i);
        }
      }
    }
  }

  displayRoomId = (item: ISelectItem): string => {
    return item && item.id ? item.id : '';
  };

  onSelectSharingAvailability(selectedSharing: ISelectItem, index: number): void {
    this.contractRoomsAvailabilityService.roomsAvailabilityParams[index].sharingAvailability = selectedSharing.id;
    this.updateSharingAvailabilityOptions();
  }

  updateSharingAvailabilityOptions(): void {
    const allOptions = this.calcAllSharingAvailabilityOptions();
    this.oneContractStoreService.roomAndCharacteristic$.next(allOptions);
    this.tableRows.forEach((row: any, index: number) => {
      row.sharingAvailability = JsUtils.deepCopy(allOptions);
      const selectedSharing = this.contractRoomsAvailabilityService.roomsAvailabilityParams[index].sharingAvailability;
      if (selectedSharing) {
        this.selectInputService.updateIsSelected(row.sharingAvailability, selectedSharing);
      }
    });

    this.removeNotExistingSharingAvailabilityFromParams(allOptions);
    this.removeSelectedSharing();
    this.removeSelfSharingAvailability();
  }

  private removeNotExistingSharingAvailabilityFromParams(allSharingAvailabilityOptions: ISelectItem[]): void {
    this.contractRoomsAvailabilityService.roomsAvailabilityParams.forEach((roomsAvailabilityParams: IRoomsAndAvailability) => {
      let i;
      for (i = 0; i < allSharingAvailabilityOptions.length; i++) {
        if (allSharingAvailabilityOptions[i].name === roomsAvailabilityParams.sharingAvailability) {
          break;
        }
      }
      if (i === allSharingAvailabilityOptions.length) {
        // sharingAvailability from params does not exists in new all sharing availability options so need to remove it.
        delete roomsAvailabilityParams.sharingAvailability;
      }
    });
  }

  calcAllSharingAvailabilityOptions(): ISelectItem[] {
    return this.tableRows.reduce((accumulator: ISelectItem[], currentValue: any, index: number) => {
      const selectedRoom = this.contractRoomsAvailabilityService.roomsAvailabilityParams[index].room;
      const selectedCharacteristic = this.contractRoomsAvailabilityService.roomsAvailabilityParams[index].characteristic;
      if (selectedRoom && selectedCharacteristic) {
        const newValue = `${selectedRoom}, ${selectedCharacteristic}`;
        const isOptionExists = this.selectInputService.isContains(accumulator, newValue);
        if (!isOptionExists) {
          accumulator.push({id: newValue, name: newValue});
        }
      }
      return accumulator;
    }, []);
  }

  removeSelectedSharing(): void {
    this.contractRoomsAvailabilityService.roomsAvailabilityParams.forEach(roomsAvailabilityParams => {
      const selectedSharing = roomsAvailabilityParams.sharingAvailability;
      if (selectedSharing) {
        this.tableRows.forEach((row: any, index: number) => {
          const selectedItem = <ISelectItem>this.selectInputService.getSelectedItem(row.sharingAvailability);
          if (!selectedItem || selectedSharing !== selectedItem.name) {
            this.tableRows[index].sharingAvailability = this.selectInputService.removeItemsFromList(row.sharingAvailability, selectedSharing);
          }
        });
      }
    });
  }

  removeSelfSharingAvailability(): void {
    this.tableRows.forEach(row => {
      const selectedRoom: any = this.selectInputService.getSelectedItem(row.rooms) || {};
      const characteristic: any = this.selectInputService.getSelectedItem(row.characteristics) || {};
      row.sharingAvailability = row.sharingAvailability.filter(option => option.id !== `${selectedRoom.id}, ${characteristic.id}`);
    });
  }

  addRow(): void {
    this.tableRows.push({
      rooms: deepCopy(roomsNames),
      characteristics: deepCopy(characteristicsNames),
      sharingAvailability: []
    });
    this.contractRoomsAvailabilityService.roomsAvailabilityParams.push(<IRoomsAndAvailability>{});
    this.roomsAndCharacteristicsStatus$.push(new Subject<IValidationStatus>());
  }

  deleteRow(index: number): void {
    this.tableRows.splice(index, 1);
    const deletedParams = <IRoomsAndAvailability>this.contractRoomsAvailabilityService.roomsAvailabilityParams.splice(index, 1)[0];
    const deletedSubject = this.roomsAndCharacteristicsStatus$.splice(index, 1)[0];
    deletedSubject.complete();
    if (deletedParams.room || deletedParams.characteristic) {
      this.tableRows.forEach(row => {
        if (deletedParams.room) {
          row.rooms.push({id: deletedParams.room, name: deletedParams.room});
        }
        if (deletedParams.characteristic) {
          row.characteristics.push({id: deletedParams.characteristic, name: deletedParams.characteristic});
        }
      });
    }
    this.validateRoomAndCharacteristic(); // important - must called before this.updateSharingAvailabilityOptions()
    // because it may change the global roomAndCharacteristic
    this.updateSharingAvailabilityOptions();
  }

  roomListDisplay = (item: ISelectItem): string => {
    return `${item.id ? `${item.id} (${item.name})` : ``}`;
  };

  ngOnDestroy(): void {
    this.subscriptionsArray.forEach((subscription: any) => subscription.unsubscribe());
    this.tableRows = [];
    this.contractRoomsAvailabilityService.resetParams();
  }
}

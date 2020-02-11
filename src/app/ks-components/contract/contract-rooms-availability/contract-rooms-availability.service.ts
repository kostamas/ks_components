import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IPopulateService, IRoomsAndAvailability, ISectionPageService} from '../one-contract';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {JsUtils} from '../../../utils/jsUtils';
import {INameId, IOneContractParams, IRoom} from '../one-contract-object';

@Injectable()
export class ContractRoomsAvailabilityService implements ISectionPageService, IPopulateService {
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public roomsAvailabilityParams: IRoomsAndAvailability[] = [];
  private roomsOptions: ISelectItem[] = [];
  private characteristicsOptions: ISelectItem[] = [];
  public isDirty: boolean = false;
  public roomAndCharacteristicRoomsObservable$: any = new Subject();

  constructor(private httpClient: HttpClient) {
    this.initializeRoomsList();
  }

  initializeRoomsList(): void {
    // this.apiService.getEndpoints(e => {
    // 	forkJoin([
    // 		this.httpClient.get(e.roomTypeAutoSuggest + '?limit=10000'),
    // 		this.httpClient.get(e.roomFeatureAutoSuggest + '?limit=10000')
    // 	]).subscribe((roomsObserve: any) => {
    // 		this.roomsOptions = roomsObserve[0].items;
    // 		this.characteristicsOptions = roomsObserve[1].items;
    // 		this.roomAndCharacteristicRoomsObservable$.next(roomsObserve);
    // 	});
    // });
  }

  resetParams = (): void => {
    this.roomsAvailabilityParams = [];
    this.validation.next({isValid: true, message: ''});
  };

  getRoomsOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.roomsOptions);
  }

  getCharacteristicsOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.characteristicsOptions);
  }

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.rooms = [];
    this.roomsAvailabilityParams.forEach(room => {
      const sharedRoomCode = room.sharingAvailability && room.sharingAvailability.split(',')[0] || null;
      const sharedCharacteristicCode = room.sharingAvailability && room.sharingAvailability.split(',')[1].trim() || null;
      const roomObj = {
        type: <INameId>{id: room.room, name: ''},
        characteristic: <INameId>{id: room.characteristic, name: ''},
        description: room.description,
        sharedRoomCode,
        sharedCharacteristicCode,
        standard: !!room.standardCapacity || room.standardCapacity === '0' ? +room.standardCapacity : null,
        min: !!room.minCapacity || room.minCapacity === '0' ? +room.minCapacity : null,
        max: !!room.maxCapacity || room.maxCapacity === '0' ? +room.maxCapacity : null,
        maxAdultsCapacity: !!room.maxAdults || room.maxAdults === '0' ? +room.maxAdults : null,
        maxChildrenCapacity: !!room.maxChild || room.maxChild === '0' ? +room.maxChild : null,
        maxBabiesCapacity: !!room.maxBabies || room.maxBabies === '0' ? +room.maxBabies : null
      };
      oneContract.contractData.rooms.push(<IRoom>roomObj);
    });
  };

  validateSection = (): Subject<boolean> => {
    const isValid: Subject<boolean> = new Subject();
    setTimeout(() => {
      isValid.next(true);
      isValid.complete();
    });
    return isValid;
  };

  public populateData = (oneContract: IOneContractParams, loadedObject: IOneContractParams): void => {
    oneContract.contractData.rooms = loadedObject.contractData.rooms;
  };
}

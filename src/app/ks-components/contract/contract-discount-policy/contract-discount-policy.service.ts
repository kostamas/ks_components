import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IDateFromTo, IDiscount, IDiscountType, IOneContractParams} from '../one-contract-object';
import {IGuestRoomParams, IGuestRoomTableService, ISectionPageService} from '../one-contract';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {DISCOUNTS_TYPES} from '../one-contract.const';
import {JsUtils} from '../../../utils/jsUtils';

@Injectable()
export class ContractDiscountPolicyService implements ISectionPageService, IGuestRoomTableService {
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public guestRoomParams: IGuestRoomParams[] = [];
  public tableRows: any[] = [];
  public isDirty: boolean = false;

  constructor() {
  }

  resetParams = (): void => {
    this.guestRoomParams = [];
    this.tableRows = [];
    this.validation.next({isValid: true, message: ''});
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.generalSupplements[DISCOUNTS_TYPES.discount] = [];
    this.tableRows.forEach((row: any, index: number) => {
      let roomCode = '';
      let characteristicCode = '';
      if (this.guestRoomParams[index].roomAndCharacteristic) {
        const isAllSharing = this.guestRoomParams[index].roomAndCharacteristic.split(',')[0] === 'all';
        roomCode = isAllSharing ? 'all' : this.guestRoomParams[index].roomAndCharacteristic.split(',')[0];
        characteristicCode = isAllSharing ? 'all' : this.guestRoomParams[index].roomAndCharacteristic.split(',')[1].trim();
      }
      const discountObj: IDiscount = {
        guestApplicationType: {id: this.guestRoomParams[index].guest, name: null},
        room: {roomCode, characteristicCode},
        applicationType: this.guestRoomParams[index].applicationRule ? this.guestRoomParams[index].applicationRule : null,
        seasons: []
      };

      if (row.type === 'S') {
        row.seasonsValues.forEach((seasonData: any, seasonIndex: number) => {
          const season: string = JsUtils.numberToLatter(seasonIndex + 1, true);
          if (seasonData.wkdy) {
            discountObj.seasons.push(
              <IDiscountType>{seasonCode: season + ' WKDY', value: +seasonData.wkdy, travelWindow: null}
            );
          }
          if (seasonData.wknd) {
            discountObj.seasons.push(
              <IDiscountType>{seasonCode: season + ' WKND', value: +seasonData.wknd, travelWindow: null}
            );
          }
          if (seasonData.value) {
            discountObj.seasons.push(<IDiscountType>{seasonCode: season, value: +seasonData.value, travelWindow: null});
          }
        });
      }
      if (row.type === 'SD') {
        row.selectedDates.forEach((date: any) => {
          date = date.split('-');
          discountObj.seasons.push(<IDiscountType>{
            seasonCode: 'SD',
            value: +this.guestRoomParams[index].value,
            travelWindow: <IDateFromTo>{
              dateFrom: date[0],
              dateTo: date[1]
            }
          });
        });
      }
      if (row.type === 'CP') {
        discountObj.seasons.push(<IDiscountType>{
          value: JsUtils.isDefineAndNotNull(this.guestRoomParams[index].value) ? +this.guestRoomParams[index].value : '',
          seasonCode: 'CP',
          travelWindow: null
        });
      }
      oneContract.contractData.generalSupplements[DISCOUNTS_TYPES.discount].push(<IDiscount>discountObj);
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
}

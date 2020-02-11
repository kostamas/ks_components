import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {IEarlyBookingDiscountParams, ISectionPageService} from '../one-contract';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {CommonOneContractService} from '../common-one-contract.service';
import {DISCOUNTS_TYPES} from '../one-contract.const';
import {IDateFromTo, IDiscountType, IEarlyBookingDiscount, IOneContractParams} from '../one-contract-object';

@Injectable()
export class ContractEarlyBookingDiscountService implements ISectionPageService {
  public earlyBookingDiscountParams: IEarlyBookingDiscountParams[] = [];
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;

  constructor(public commonOneContractService: CommonOneContractService, private oneContractStoreService: CreateOneContractStoreService) {
  }

  resetParams = (): void => {
    this.earlyBookingDiscountParams = [];
    delete this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES['earlyBookingDiscount']];
    this.validation.next({isValid: true, message: ''});
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    this.earlyBookingDiscountParams.forEach((row: IEarlyBookingDiscountParams) => {
      const earlyBookingObj: IEarlyBookingDiscount = <IEarlyBookingDiscount>{
        daysBefore: row.daysBeforeCheckIn || row.daysBeforeCheckIn === 0 ? row.daysBeforeCheckIn : null,
        stayNights: row.minStay || row.minStay === 0 ? row.minStay : null,
        isNRF: row.nrf,
        seasons: [],
      };
      if (row.type === 'SD') {
        const seasonDiscountObj: IDiscountType = <IDiscountType>{
          value: +row.discount,
          seasonCode: 'SD',
          bookingWindow: null,
          travelWindow: null
        };
        if (row.travelWindow) {
          seasonDiscountObj.travelWindow = <IDateFromTo>{
            dateFrom: row.travelWindow.dateFrom,
            dateTo: row.travelWindow.dateTo
          };
        }
        if (row.bookingWindow) {
          seasonDiscountObj.bookingWindow = <IDateFromTo>{
            dateFrom: row.bookingWindow.dateFrom,
            dateTo: row.bookingWindow.dateTo
          };
        }
        earlyBookingObj.seasons.push(seasonDiscountObj);
      }
      if (row.type === 'CP') {
        earlyBookingObj.seasons.push(<IDiscountType>{
          value: row.discount || row.discount === 0 ? row.discount : null,
          seasonCode: 'CP',
          travelWindow: null,
          bookingWindow: null
        });
      }
      oneContract.contractData.generalSupplements.earlyBookingDiscount.push(earlyBookingObj);
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

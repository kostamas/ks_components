import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {CreateOneContractStoreService} from '../../create-one-contract-store.service';
import {IContractDiscountParams, ISectionPageService} from '../../one-contract';
import {IValidationStatus} from '../../../../shared/types/ISelect';
import {DISCOUNTS_TYPES} from '../../one-contract.const';
import {IHBGSelectDiscount, IOneContractParams} from '../../one-contract-object';
import {JsUtils} from '../../../../utils/jsUtils';

@Injectable()
export class HbgSelectDiscountService implements ISectionPageService {
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;
  public params: IContractDiscountParams = <IContractDiscountParams>{
    discountRows: [],
    discountType: 'HBGSelectDiscount'
  };

  constructor(private oneContractStoreService: CreateOneContractStoreService) {
  }

  resetParams(): void {
    this.params = <IContractDiscountParams>{discountRows: [], discountType: 'HBGSelectDiscount', shardAllotment: true};
    delete this.oneContractStoreService.selectedDiscounts[DISCOUNTS_TYPES['HBGSelectDiscount']];
    this.validation.next({isValid: true, message: ''});
  }

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.generalSupplements.HBGSelectDiscount = [];
    this.params.discountRows.forEach(param => {
      const discount: IHBGSelectDiscount = <IHBGSelectDiscount>{
        seasons: [{
          seasonCode: param.seasonCode,
          travelWindow: param.seasonCode === 'SD' && param.travelWindow ? JsUtils.deepCopy(param.travelWindow) : null,
          bookingWindow: param.seasonCode === 'SD' && param.bookingWindow ? JsUtils.deepCopy(param.bookingWindow) : null,
          value: null
        }],
        sharedAllotment: this.params.shardAllotment
      };
      const percentage: number = param.discount;
      if (percentage) {
        discount.seasons[0].value = +percentage;
      }
      oneContract.contractData.generalSupplements.HBGSelectDiscount.push(discount);
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

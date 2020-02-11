import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ISectionPageService} from '../one-contract';
import {IOneContractParams, IStopSale} from '../one-contract-object';
import {IValidationStatus} from '../../../shared/types/ISelect';

@Injectable()
export class ContractStopSaleService implements ISectionPageService {
  public contractStopSaleParams: IStopSale[] = [];
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;

  constructor() {
  }

  resetParams = (): void => {
    this.contractStopSaleParams = [];
    this.validation.next({isValid: true, message: ''});
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.stopSales = this.contractStopSaleParams;
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

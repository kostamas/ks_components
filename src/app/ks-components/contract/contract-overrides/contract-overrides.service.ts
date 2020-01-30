import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ISectionPageService} from '../one-contract';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {IOneContractParams, IOverride} from '../one-contract-object';

@Injectable()
export class ContractOverridesService implements ISectionPageService {
  public contractOverridesParams: IOverride[] = [];
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;

  constructor() {
  }

  resetParams = (): void => {
    this.contractOverridesParams = [];
    this.validation.next({isValid: true, message: ''});
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.overrides = this.contractOverridesParams;
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

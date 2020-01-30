import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {ISectionPageService} from '../one-contract';
import {IOneContractParams} from '../one-contract-object';

@Injectable()
export class ContractRemarkService implements ISectionPageService {
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public remarksParams: string = null;
  public isDirty: boolean = false;

  constructor() {
  }

  resetParams = (): void => {
    this.remarksParams = null;
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.remarks = this.remarksParams;
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

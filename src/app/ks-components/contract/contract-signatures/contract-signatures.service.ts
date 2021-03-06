import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ISectionPageService} from '../one-contract';
import {IHotel, IHotelbeds, IOneContractParams, ISignatures} from '../one-contract-object';
import {IValidationStatus} from '../../../shared/types/ISelect';

@Injectable()
export class ContractSignaturesService implements ISectionPageService {
  public contractSignatureParams: ISignatures = <ISignatures>{
    hotel: <IHotel>{},
    hotelbeds: <IHotelbeds>{}
  };
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;

  constructor() {
  }

  resetParams = (): void => {
    this.contractSignatureParams = <ISignatures>{
      hotel: <IHotel>{},
      hotelbeds: <IHotelbeds>{}
    };
    this.validation.next({isValid: true, message: ''});
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.signatures = this.contractSignatureParams;
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

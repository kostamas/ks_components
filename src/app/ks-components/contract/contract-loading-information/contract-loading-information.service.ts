import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IContractLoadingInformationParams, IPopulateService, ISectionPageService} from '../one-contract';
import {IChildAges, IOneContractParams, ISupplier} from '../one-contract-object';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {JsUtils} from '../../../utils/jsUtils';

@Injectable()
export class ContractLoadingInformationService implements ISectionPageService, IPopulateService {
  public contractLoadingInformationParams: IContractLoadingInformationParams = <IContractLoadingInformationParams>{
    childAges: <IChildAges>{},
    supplier: <ISupplier>{},
  };
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;
  public CHILD_MAX_AGE: number = 21;

  private typeOptions: ISelectItem[] = [
    {id: 'N', name: 'New', isSelected: true},
    {id: 'R', name: 'Renewal'},
  ];

  private childAgesOptions: ISelectItem[] = [];

  private clientDistributionTypeOptions: ISelectItem[] = [
    {id: 'BB', name: 'B2B'},
    {id: 'BC', name: 'B2B&B2C'},
  ];

  constructor() {
    this.initChildAgesOptions();
  }

  resetParams = (): void => {
    this.contractLoadingInformationParams = <IContractLoadingInformationParams>{
      childAges: <IChildAges>{},
      supplier: <ISupplier>{}
    };
    this.validation.next({isValid: true, message: ''});
  };

  getTypeOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.typeOptions);
  }

  getClientDistributionTypeOptions(): ISelectItem[] {
    return JsUtils.deepCopy(this.clientDistributionTypeOptions);
  }

  getAgesRangeOptions(from: number = 0, to: number = this.CHILD_MAX_AGE, selectedOptionIndex: number = 0): ISelectItem[] {
    const childOptions: ISelectItem[] = JsUtils.deepCopy(this.childAgesOptions.filter(item => item.id >= from && item.id <= to));
    if (selectedOptionIndex >= from && selectedOptionIndex <= to) {
      childOptions[selectedOptionIndex].isSelected = true;
    }
    return childOptions;
  }

  private initChildAgesOptions(): void {
    this.childAgesOptions = [];
    for (let i = 0; i <= this.CHILD_MAX_AGE; i++) {
      this.childAgesOptions.push({id: i, name: i.toString()});
    }
  }

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.contractHeader.renewalType = this.contractLoadingInformationParams.renewalType;
    oneContract.contractData.contractHeader.name = this.contractLoadingInformationParams.name ? this.contractLoadingInformationParams.name : null;
    oneContract.contractData.contractHeader.supplier = this.contractLoadingInformationParams.supplier;
    oneContract.contractData.contractHeader.clientDistributionType = this.contractLoadingInformationParams.clientDistributionType;
    const childAges = this.contractLoadingInformationParams.childAges;
    oneContract.contractData.contractHeader.childAges = <IChildAges>{};
    if (JsUtils.isDefined(childAges) && !JsUtils.isEmpty(childAges)) {
      oneContract.contractData.contractHeader.childAges.minimumAge = childAges.minimumAge || childAges.minimumAge === 0 ? +childAges.minimumAge : childAges.minimumAge;
      oneContract.contractData.contractHeader.childAges.maximumAge = childAges.maximumAge || childAges.maximumAge === 0 ? +childAges.maximumAge : childAges.maximumAge;
    }
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
    oneContract.contractData.contractHeader.renewalType = loadedObject.contractData.contractHeader.renewalType;
    oneContract.contractData.contractHeader.name = loadedObject.contractData.contractHeader.name;
    oneContract.contractData.contractHeader.supplier = loadedObject.contractData.contractHeader.supplier;
    oneContract.contractData.contractHeader.clientDistributionType = loadedObject.contractData.contractHeader.clientDistributionType;
    if (JsUtils.isDefineAndNotNull(loadedObject.contractData.contractHeader.childAges)) {
      const {childAges} = loadedObject.contractData.contractHeader;
      if (childAges.minimumAge) {
        oneContract.contractData.contractHeader.childAges.minimumAge = childAges.minimumAge;
      }
      if (childAges.maximumAge) {
        oneContract.contractData.contractHeader.childAges.maximumAge = childAges.maximumAge;
      }
    }
  };
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {IHotelData, INameId, IOneContractParams} from '../one-contract-object';
import {IValidationStatus} from '../../../shared/types/ISelect';
import {ISectionPageService} from '../one-contract';
import {JsUtils} from '../../../utils/jsUtils';

@Injectable()
export class ContractHotelInformationService implements ISectionPageService {
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public isDirty: boolean = false;
  public oneContractParams: IOneContractParams = <IOneContractParams>{
    company: <INameId>{},
    office: <INameId>{},
    hotelData: <IHotelData>{
      destination: <INameId>{},
      zone: <INameId>{},
    }
  };
  public hotelInfo: string = 'exist';

  constructor() {
  }

  resetParams(): void {
    this.oneContractParams = <IOneContractParams>{
      company: <INameId>{},
      office: <INameId>{},
      hotelData: <IHotelData>{
        destination: <INameId>{},
        zone: <INameId>{},
      }
    };
    this.validation.next({isValid: true, message: ''});
  }

  updateOneContract = (oneContract: IOneContractParams) => {
    if (this.hotelInfo === 'new') {
      oneContract.hotelData.hotelAddress = this.oneContractParams.hotelData.hotelAddress;
      oneContract.hotelData.categoryId = this.oneContractParams.hotelData.categoryId;
      oneContract.hotelData.destination = this.oneContractParams.hotelData.destination && !JsUtils.isEmpty(this.oneContractParams.hotelData.destination) ? this.oneContractParams.hotelData.destination : null;
      oneContract.hotelData.zone = this.oneContractParams.hotelData.zone && !JsUtils.isEmpty(this.oneContractParams.hotelData.zone) ? this.oneContractParams.hotelData.zone : null;
      oneContract.hotelData.country = this.oneContractParams.hotelData.country;
      oneContract.hotelData.postalCode = this.oneContractParams.hotelData.postalCode;
    } else {
      oneContract.hotelData.hotelId = this.oneContractParams.hotelData.hotelId;
    }
    oneContract.hotelData.totalNumberOfRooms = this.oneContractParams.hotelData.totalNumberOfRooms;
    oneContract.hotelData.hotelName = this.oneContractParams.hotelData.hotelName;
    oneContract.company = this.oneContractParams.company;
    oneContract.office = this.oneContractParams.office;
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

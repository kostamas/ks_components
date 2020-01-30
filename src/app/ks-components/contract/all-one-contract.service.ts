import {ContractDetailsService} from './contract-details/contract-details.service';
import {ContractHotelInformationService} from './contract-hotel-information/contract-hotel-information.service';
import {ContractRoomsAvailabilityService} from './contract-rooms-availability/contract-rooms-availability.service';
import {ContractLoadingInformationService} from './contract-loading-information/contract-loading-information.service';
import {ContractRatesService} from './contract-rates/contract-rates.service';
import {ContractCancellationPolicyService} from './contract-cancellation-policy/contract-cancellation-policy.service';
import {ContractMinStayService} from './contract-min-stay/contract-min-stay.service';
import {ContractAllotmentService} from './contract-allotment/contract-allotment.service';
import {ContractBoardSupplementService} from './contract-board-supplement/contract-board-supplement.service';
import {ContractOverridesService} from './contract-overrides/contract-overrides.service';
import {ContractStopSaleService} from './contract-stop-sale/contract-stop-sale.service';
import {ContractSignaturesService} from './contract-signatures/contract-signatures.service';
import {ContractLongStayDiscountService} from './contract-long-stay-discount/contract-long-stay-discount.service';
import {ContractCombinationsService} from './contract-combinations/contract-combinations.service';
import {ContractEarlyBookingDiscountService} from './contract-early-booking-discount/contract-early-booking-discount.service';
import {ContractPayStayService} from './contract-pay-stay/contract-pay-stay.service';
import {ContractOccupancySupplementService} from './contract-occupancy-supplement/contract-occupancy-supplement.service';
import {ContractDiscountPolicyService} from './contract-discount-policy/contract-discount-policy.service';
import {Injectable} from '@angular/core';
import {ContractOtherSupplementService} from './contract-other-supplement/contract-other-supplement.service';
import {HbgSelectDiscountService} from './contract-discount/hbg-select-discount/hbg-select-discount.service';
import {NrfDiscountService} from './contract-discount/nrf-discount/nrf-discount.service';
import {OpaqueDiscountService} from './contract-discount/opaque-discount/opaque-discount.service';
import {ContractRemarkService} from './contract-remarks/contract-remark.service';
import {Observable, Subject} from 'rxjs';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {ISectionPageService} from './one-contract';
import {IOneContractParams} from './one-contract-object';


@Injectable()
export class AllOneContractService {
  public servicesMap: any = {
    0: 'contractHotelInformationService',
    1: 'contractDetailsService',
    2: 'contractLoadingInformationService',
    3: 'contractRoomsAvailabilityService',
    4: 'contractRatesService',
    5: 'contractCancellationPolicyService',
    6: 'contractMinStayService',
    7: 'contractMinAndSecurityAllotmentService',
    8: 'contractDiscountPolicyService',
    9: 'contractBoardSupplementService',
    10: 'contractOccupancySupplementService',
    11: 'contractOtherSupplementService',
    12: 'nrfDiscountService',
    13: 'opaqueDiscountService',
    14: 'hbgSelectDiscountService',
    15: 'contractEarlyBookingDiscountService',
    16: 'contractLongStayService',
    17: 'contractPayStayService',
    18: 'contractCombinationsService',
    19: 'contractStopSaleService',
    20: 'contractOverridesService',
    21: 'contractSignaturesService'
  };

  public allServices: ISectionPageService[] = [];

  constructor(
    public contractHotelInformationService: ContractHotelInformationService,
    public contractDetailsService: ContractDetailsService,
    public contractLoadingInformationService: ContractLoadingInformationService,
    public contractRoomsAvailabilityService: ContractRoomsAvailabilityService,
    public contractRatesService: ContractRatesService,
    public contractCancellationPolicyService: ContractCancellationPolicyService,
    public contractMinStayService: ContractMinStayService,
    public contractMinAndSecurityAllotmentService: ContractAllotmentService,
    public contractDiscountPolicyService: ContractDiscountPolicyService,
    public contractBoardSupplementService: ContractBoardSupplementService,
    public contractOccupancySupplementService: ContractOccupancySupplementService,
    public contractOtherSupplementService: ContractOtherSupplementService,
    public nrfDiscountService: NrfDiscountService,
    public opaqueDiscountService: OpaqueDiscountService,
    public hbgSelectDiscountService: HbgSelectDiscountService,
    public contractEarlyBookingDiscountService: ContractEarlyBookingDiscountService,
    public contractLongStayService: ContractLongStayDiscountService,
    public contractPayStayService: ContractPayStayService,
    public contractCombinationsService: ContractCombinationsService,
    public contractStopSaleService: ContractStopSaleService,
    public contractRemarkService: ContractRemarkService,
    public contractOverridesService: ContractOverridesService,
    public contractSignaturesService: ContractSignaturesService,
  ) {
    this.allServices.push(contractHotelInformationService);
    this.allServices.push(contractDetailsService);
    this.allServices.push(contractLoadingInformationService);
    this.allServices.push(contractRoomsAvailabilityService);
    this.allServices.push(contractRatesService);
    this.allServices.push(contractMinAndSecurityAllotmentService);
    this.allServices.push(contractCancellationPolicyService);
    this.allServices.push(contractMinStayService);
    this.allServices.push(contractDiscountPolicyService);
    this.allServices.push(contractBoardSupplementService);
    this.allServices.push(contractOccupancySupplementService);
    this.allServices.push(contractOtherSupplementService);
    this.allServices.push(nrfDiscountService);
    this.allServices.push(opaqueDiscountService);
    this.allServices.push(hbgSelectDiscountService);
    this.allServices.push(contractEarlyBookingDiscountService);
    this.allServices.push(contractLongStayService);
    this.allServices.push(contractPayStayService);
    this.allServices.push(contractCombinationsService);
    this.allServices.push(contractStopSaleService);
    this.allServices.push(contractRemarkService);
    this.allServices.push(contractOverridesService);
    this.allServices.push(contractSignaturesService);
  }

  buildOneContract(): IOneContractParams {
    const oneContract: IOneContractParams = <IOneContractParams>{
      contractData: {
        contractHeader: {},
        generalSupplements: {
          discount: [],
          occupancySupplements: [],
          otherSupplements: [],
          NRFDiscount: [],
          opaqueDiscount: [],
          HBGSelectDiscount: [],
          earlyBookingDiscount: [],
          longStayDiscount: []
        },
        boardSupplements: []
      },
      hotelData: {}
    };
    this.allServices.forEach((contractSectionService: ISectionPageService) => contractSectionService.updateOneContract(oneContract));
    return oneContract;
  }

  validateContract(): Observable<boolean> {
    const isContractValid: Subject<boolean> = new Subject();
    const validationsSubjects = [];
    let isAllSectionsValid = true;

    this.allServices.forEach((contractSectionService: ISectionPageService) => {
      contractSectionService.isDirty = true;
      validationsSubjects.push(contractSectionService.validateSection());
    });

    forkJoin(validationsSubjects).subscribe((arrayOfIsValid: boolean[]) => {
      arrayOfIsValid.forEach((isValid: boolean) => {
        if (isAllSectionsValid && !isValid) {
          isAllSectionsValid = false;
        }
      });

      if (isAllSectionsValid) {
        isContractValid.next(true);
      } else {
        isContractValid.next(false);
      }
      isContractValid.complete();
    });

    return isContractValid;
  }

  focusedOutSection(sectionIndex: number): void {
    const srvName = this.servicesMap[sectionIndex];
    if (this[srvName].isDirty) {
      this[srvName].validateSection();
    }
  }
}

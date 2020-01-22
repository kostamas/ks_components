import {NgModule} from '@angular/core';
import {BookingTravelDatesComponent} from './booking-travel-dates/booking-travel-dates.component';
import {ContractAllotmentComponent} from './contract-allotment/contract-allotment.component';
import {ContractBoardSupplementComponent} from './contract-board-supplement/contract-board-supplement.component';
import {ContractAllotmentService} from './contract-allotment/contract-allotment.service';
import {ContractBoardSupplementService} from './contract-board-supplement/contract-board-supplement.service';
import {ContractCancellationPolicyComponent} from './contract-cancellation-policy/contract-cancellation-policy.component';
import {ContractCancellationPolicyService} from './contract-cancellation-policy/contract-cancellation-policy.service';
import {ContractCombinationsComponent} from './contract-combinations/contract-combinations.component';
import {ContractCombinationsService} from './contract-combinations/contract-combinations.service';
import {ContractDetailsComponent} from './contract-details/contract-details.component';
import {ContractDetailsService} from './contract-details/contract-details.service';
import {ContractDetailsModalComponent} from './contract-details-modal/contract-details-modal.component';
import {ContractDetailsPopulateService} from './contract-details-modal/contract-details-populate.service';
import {ContractDiscountComponent} from './contract-discount/contract-discount.component';
import {OpaqueDiscountComponent} from './contract-discount/opaque-discount/opaque-discount.component';
import {OpaqueDiscountService} from './contract-discount/opaque-discount/opaque-discount.service';
import {NrfDiscountComponent} from './contract-discount/nrf-discount/nrf-discount.component';
import {NrfDiscountService} from './contract-discount/nrf-discount/nrf-discount.service';
import {HbgSelectDiscountService} from './contract-discount/hbg-select-discount/hbg-select-discount.service';
import {HbgSelectDiscountComponent} from './contract-discount/hbg-select-discount/hbg-select-discount.component';
import {ContractDiscountPolicyComponent} from './contract-discount-policy/contract-discount-policy.component';
import {ContractDiscountPolicyService} from './contract-discount-policy/contract-discount-policy.service';
import {ContractEarlyBookingDiscountComponent} from './contract-early-booking-discount/contract-early-booking-discount.component';
import {ContractEarlyBookingDiscountService} from './contract-early-booking-discount/contract-early-booking-discount.service';
import {ContractHotelInformationService} from './contract-hotel-information/contract-hotel-information.service';
import {ContractLoadingInformationService} from './contract-loading-information/contract-loading-information.service';
import {ContractLoadingInformationComponent} from './contract-loading-information/contract-loading-information.component';
import {ContractLongStayDiscountComponent} from './contract-long-stay-discount/contract-long-stay-discount.component';
import {ContractLongStayDiscountService} from './contract-long-stay-discount/contract-long-stay-discount.service';
import {ContractMinStayComponent} from './contract-min-stay/contract-min-stay.component';
import {ContractMinStayService} from './contract-min-stay/contract-min-stay.service';
import {ContractOccupancySupplementService} from './contract-occupancy-supplement/contract-occupancy-supplement.service';
import {ContractOccupancySupplementComponent} from './contract-occupancy-supplement/contract-occupancy-supplement.component';
import {ContractOtherSupplementComponent} from './contract-other-supplement/contract-other-supplement.component';
import {ContractOtherSupplementService} from './contract-other-supplement/contract-other-supplement.service';
import {ContractOverridesComponent} from './contract-overrides/contract-overrides.component';
import {ContractOverridesService} from './contract-overrides/contract-overrides.service';
import {ContractPayStayService} from './contract-pay-stay/contract-pay-stay.service';
import {ContractPayStayComponent} from './contract-pay-stay/contract-pay-stay.component';
import {ContractRatesService} from './contract-rates/contract-rates.service';
import {ContractRatesComponent} from './contract-rates/contract-rates.component';
import {ContractRemarkComponent} from './contract-remarks/contract-remark.component';
import {ContractRemarkService} from './contract-remarks/contract-remark.service';
import {ContractRoomsAvailabilityService} from './contract-rooms-availability/contract-rooms-availability.service';
import {ContractRoomsAvailabilityComponent} from './contract-rooms-availability/contract-rooms-availability.component';
import {ContractSignaturesComponent} from './contract-signatures/contract-signatures.component';
import {ContractSignaturesService} from './contract-signatures/contract-signatures.service';
import {ContractStopSaleService} from './contract-stop-sale/contract-stop-sale.service';
import {ContractStopSaleComponent} from './contract-stop-sale/contract-stop-sale.component';
import {GuestRoomTableComponent} from './guest-room-table/guest-room-table.component';
import {AllOneContractService} from './all-one-contract.service';
import {CreateOneContractService} from './create-one-contract.service';
import {CreateOneContractStoreService} from './create-one-contract-store.service';
import {CreateOneContractComponent} from './create-one-contract.component';

@NgModule({
  declarations: [
    BookingTravelDatesComponent,
    ContractAllotmentComponent,
    ContractBoardSupplementComponent,
    ContractCancellationPolicyComponent,
    ContractCombinationsComponent,
    ContractDetailsComponent,
    ContractDetailsModalComponent,
    ContractDiscountComponent,
    OpaqueDiscountComponent,
    NrfDiscountComponent,
    HbgSelectDiscountComponent,
    ContractDiscountPolicyComponent,
    ContractEarlyBookingDiscountComponent,
    ContractLoadingInformationComponent,
    ContractLongStayDiscountComponent,
    ContractMinStayComponent,
    ContractOccupancySupplementComponent,
    ContractOtherSupplementComponent,
    ContractOverridesComponent,
    ContractPayStayComponent,
    ContractRatesComponent,
    ContractRemarkComponent,
    ContractRoomsAvailabilityComponent,
    ContractSignaturesComponent,
    ContractStopSaleComponent,
    GuestRoomTableComponent,
    CreateOneContractComponent,


  ],
  imports: [
  ],
  providers: [
    ContractAllotmentService,
    ContractBoardSupplementService,
    ContractCancellationPolicyService,
    ContractCombinationsService,
    ContractDetailsService,
    ContractDetailsPopulateService,
    OpaqueDiscountService,
    NrfDiscountService,
    HbgSelectDiscountService,
    ContractDiscountPolicyService,
    ContractEarlyBookingDiscountService,
    ContractHotelInformationService,
    ContractLoadingInformationService,
    ContractLongStayDiscountService,
    ContractMinStayService,
    ContractOccupancySupplementService,
    ContractOtherSupplementService,
    ContractOverridesService,
    ContractPayStayService,
    ContractRatesService,
    ContractRemarkService,
    ContractRoomsAvailabilityService,
    ContractSignaturesService,
    ContractStopSaleService,
    AllOneContractService,
    CreateOneContractService,
    CreateOneContractStoreService

  ],
})
export class ContractModule {
}

import {NgModule} from '@angular/core';
import {CreateOneContractComponent} from './create/create-one-contract.component';
import {ContractDetailsComponent} from './create/contract-details/contract-details.component';
import {ContractLoadingInformationComponent} from './create/contract-loading-information/contract-loading-information.component';
import {ContractHotelInformationComponent} from './create/contract-hotel-information/contract-hotel-information.component';
import {
	SelectModule, SvgIconModule, TooltipModule, ButtonsModule, AutoSuggestInputModule,
	CalendarModule, EllipseModule, LoaderModule, InputWithErrorModule, InputWithSymbolModule
} from 'shared-ui-components-lib';
import {ContractDetailsService} from './create/contract-details/contract-details.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ContractRoomsAvailabilityComponent} from './create/contract-rooms-availability/contract-rooms-availability.component';
import {ContractRatesComponent} from './create/contract-rates/contract-rates.component';
import {ContractCancellationPolicyComponent} from './create/contract-cancellation-policy/contract-cancellation-policy.component';
import {ContractMinStayComponent} from './create/contract-min-stay/contract-min-stay.component';
import {ContractAllotmentComponent} from './create/contract-allotment/contract-allotment.component';
import {ContractBoardSupplementComponent} from './create/contract-board-supplement/contract-board-supplement.component';
import {ContractDiscountPolicyComponent} from './create/contract-discount-policy/contract-discount-policy.component';
import {ContractDiscountComponent} from './create/contract-discount/contract-discount.component';
import {ContractEarlyBookingDiscountComponent} from './create/contract-early-booking-discount/contract-early-booking-discount.component';
import {ContractLongStayDiscountComponent} from './create/contract-long-stay-discount/contract-long-stay-discount.component';
import {ContractPayStayComponent} from './create/contract-pay-stay/contract-pay-stay.component';
import {ContractSignaturesComponent} from './create/contract-signatures/contract-signatures.component';
import {ContractCombinationsComponent} from './create/contract-combinations/contract-combinations.component';
import {ContractStopSaleComponent} from './create/contract-stop-sale/contract-stop-sale.component';
import {ContractOverridesComponent} from './create/contract-overrides/contract-overrides.component';
import {ContractOccupancySupplementComponent} from './create/contract-occupancy-supplement/contract-occupancy-supplement.component';
import {GuestRoomTableComponent} from './create/guest-room-table/guest-room-table.component';
import {ContractDiscountPolicyService} from './create/contract-discount-policy/contract-discount-policy.service';
import {ContractOtherSupplementComponent} from './create/contract-other-supplement/contract-other-supplement.component';
import {CreateOneContractStoreService} from './create/create-one-contract-store.service';
import {BookingTravelDatesComponent} from './create/booking-travel-dates/booking-travel-dates.component';
import {NrfDiscountComponent} from './create/contract-discount/nrf-discount/nrf-discount.component';
import {HbgSelectDiscountComponent} from './create/contract-discount/hbg-select-discount/hbg-select-discount.component';
import {OpaqueDiscountComponent} from './create/contract-discount/opaque-discount/opaque-discount.component';
import {ContractDetailsModalComponent} from './create/contract-details-modal/contract-details-modal.component';
import {OneContractComponent} from './one-contract.component';
import {RouterModule} from '@angular/router';
import {oneContractRoutes} from './one-contract.route';
import {SearchOneContractComponent} from './search/search-one-contract.component';
import {SearchOneContractRightPaneComponent} from './search/search-one-contract-right-pane/search-one-contract-right-pane.component';
import {SearchOneContractLeftPaneComponent} from './search/search-one-contract-left-pane/search-one-contract-left-pane.component';
import {OneContractService} from './one-contract-service';
import {ContractPublishModalComponent} from './create/contract-publish-modal/contract-publish-modal.component';
import { ContractRemarkComponent } from './create/contract-remarks/contract-remark.component';

@NgModule({
	imports: [
		RouterModule.forChild(oneContractRoutes),
		AutoSuggestInputModule,
		InputWithSymbolModule,
		CalendarModule,
		ButtonsModule,
		TooltipModule,
		EllipseModule,
		SvgIconModule,
		SelectModule,
		CommonModule,
		LoaderModule,
		FormsModule,
		InputWithErrorModule
	],
	declarations: [
		CreateOneContractComponent,
		ContractDetailsComponent,
		ContractLoadingInformationComponent,
		ContractHotelInformationComponent,
		ContractRoomsAvailabilityComponent,
		ContractRatesComponent,
		ContractCancellationPolicyComponent,
		ContractMinStayComponent,
		ContractAllotmentComponent,
		ContractBoardSupplementComponent,
		ContractDiscountPolicyComponent,
		ContractDiscountComponent,
		ContractEarlyBookingDiscountComponent,
		ContractLongStayDiscountComponent,
		ContractPayStayComponent,
		ContractLongStayDiscountComponent,
		ContractSignaturesComponent,
		ContractCombinationsComponent,
		ContractStopSaleComponent,
		ContractOverridesComponent,
		ContractOccupancySupplementComponent,
		GuestRoomTableComponent,
		ContractOtherSupplementComponent,
		BookingTravelDatesComponent,
		NrfDiscountComponent,
		HbgSelectDiscountComponent,
		OpaqueDiscountComponent,
		ContractDetailsModalComponent,
		OneContractComponent,
		SearchOneContractComponent,
		SearchOneContractRightPaneComponent,
		SearchOneContractLeftPaneComponent,
		ContractPublishModalComponent,
		ContractRemarkComponent
	],
	entryComponents: [
		ContractDetailsModalComponent,
		ContractPublishModalComponent
	],
	providers: [
		ContractDetailsService,
		ContractDiscountPolicyService,
		CreateOneContractStoreService,
		OneContractService
	],
	exports: [CreateOneContractComponent]
})
export class OneContractModule {
}

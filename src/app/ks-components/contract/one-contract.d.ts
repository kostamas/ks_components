import {BehaviorSubject, Subject} from 'rxjs';
import {IChildAges, IDateFromTo, INameId, IOneContractParams, ISupplier} from './one-contract-object';
import {ISelectItem, IValidationStatus} from '../../shared/types/ISelect';
import {IFromTo} from '../../shared/types/calendar';

export interface IContractLoadingInformationParams {
  clientDistributionType: string;
  productTypeId: string;
  clientType: string;
  receptive: string;
  supplierType: string;
  tpsName: string;
  office: INameId;
  company: INameId;
  childAges: IChildAges;
  supplier: ISupplier;
  name: string;
  renewalType: string;
}

export interface IContractBoardSupplementPrams {
  board: string;
  guest: string;
  roomAndCharacteristic: string;
  contractType: string;
  price: string;
}

export interface IRatesParams {
  seasons: { season?: string, seasonWKND?: string, seasonWKDY?: string }[];
  roomAndCharacteristic: string;
}

export interface IRoomsAndAvailability {
  sharingAvailability: string;
  standardCapacity: string;
  characteristic?: string;
  description: string;
  minCapacity: string;
  maxCapacity: string;
  maxAdults: string;
  maxChild: string;
  maxBabies: string;
  room?: string;
}

export interface ISeasonParams {
  value?: any;
  wkdy?: any;
  wknd?: any;
  tooltip?: string;
  tooltipWkdy?: string;
  tooltipWknd?: string;
}

export interface IAllotmentSeasonParams {
  unitsValue?: any;
  unitsWkdy?: any;
  unitsWknd?: any;
  releaseValue?: any;
  releaseWkdy?: any;
  releaseWknd?: any;
  ceilingValue?: any;
  ceilingWkdy?: any;
  ceilingWknd?: any;
  tooltip?: string;
  tooltipWkdy?: string;
  tooltipWknd?: string;
}

export interface IPopulateService {
  populateData: (oneContract: IOneContractParams, loadedObject: IOneContractParams) => void;
}

export interface ISectionPageService {
  validation: BehaviorSubject<IValidationStatus>;
  validateSection: () => Subject<boolean>;
  updateOneContract: (oneContract: IOneContractParams) => void;
  resetParams: () => void;
  isDirty: boolean;
}

export interface IGuestRoomTableService {
  guestRoomParams: IGuestRoomParams[];
  tableRows: any[];
}

export interface IContractSeason {
  seasonRange: IFromTo;
  selectedSeasonType: string;
}

export interface IGuestRoomParams {
  roomAndCharacteristic: string;
  applicationRule: string;
  discountType: string;
  guest: string;
  value: string;
  type: string;
  dinner?: string;
}

export interface IContractDiscountParams {
  shardAllotment: boolean;
  discountType: string;
  discountRows: IContractDiscountRow[];
}

export interface ICancellationPolicyParams {
  isNRF: boolean;
  tableRows: ICancellationFeeParams[];
}

export interface ICancellationFeeParams {
  type: string;
  days: number;
  penalty: string;
  rule: string;
  time: string;
  displayTriangle: boolean;
  seasonCode: ISeasonCodeParams[];
  typeOptions: ISelectItem[];
  stayingTypes: ISelectItem[];
  rulesOptions: ISelectItem[];
  hoursOptions: ISelectItem[];
  seasonCodeOptions: ISelectItem[];
  daysBeforeCheckinStatus$: Subject<IValidationStatus>;
  applyOnTextHandler$: Subject<string>;
}

export interface ISeasonCodeParams {
  seasonCode: string;
}


export interface IContractDiscountRow {
  discount: number;
  seasonCode: string;
  isCalendarOpen: boolean;
  travelWindow: IDateFromTo;
  bookingWindow: IDateFromTo;
  seasonTypeList: ISelectItem[];
}

export interface IAllotment {
  allotment: string;
  allotmentList: ISelectItem[];
  allotmentValidator: Subject<IValidationStatus>;
  roomAndCharacteristic: string;
  roomAndCharacteristicList: ISelectItem[];
  type: ISelectItem[];
  seasonsValues: IAllotmentSeasonParams[];
  isSeasons: boolean;
  units: number;
  release: number;
  ceilingPrice: number;
}

export interface IEarlyBookingDiscountParams {
  type: string;
  discount: number;
  minStay: number;
  bookingWindow: IDateFromTo;
  travelWindow: IDateFromTo;
  daysBeforeCheckIn: number;
  nrf: boolean;
}


export interface ILongStayDiscountParams {
  nrf: boolean;
  discount: number;
  stayNights: number;
  periodType: string;
  travelWindow: IDateFromTo;
  bookingWindow: IDateFromTo;
}

export interface IContractCombinationsPrams {
  offerTypesOptions: ISelectItem[];
  combinationWithOfferOptions: ISelectItem[];
  allotmentOptions: ISelectItem[];
  allotment: boolean;
  offerType: string;
  totalDiscount: string;
  supplementCode: string;
  combinationWithOffer: string[];
}

export interface IContractSelectedDiscounts {
  'NRF Discount': boolean;
  'Opaque Discount': boolean;
  'HBG Select Discount': boolean;
  'Early Booking Discount': boolean;
  'Long Stay Discount': boolean;
  'Extra Bed': boolean;
  'Dinner (Compulsory)': boolean;
  'Dinner (Optional)': boolean;
}

export interface IFreeSaleParams {
  payNights: number;
  stayNights: number;
  type: string;
  nrf: boolean;
  periodTypeOptions: ISelectItem[];
  nrfOptions: ISelectItem[];
  bookingWindow: IDateFromTo;
  travelWindow: IDateFromTo;
}

export interface ILastAudit {
  creationDate: string;
  creationUser: string;
  updateDate: string;
  updateUser: string;
}

export interface ILoadOneContractResults {
  totalCount: number;
  items: ILoadedOneContract[];
}

export interface ILoadedOneContract {
  contractId: number;
  incomingOfficeId: number;
  name: string;
  description: string;
  hotelId: number;
  currencyId: string;
  supplierId: number;
  supplierName: string;
  travelWindow: IFromTo;
  audit: ILastAudit;
}

export interface IHotelDataSearch {
  hotelId?: string;
  hotelName?: string;
}

export interface ISearchContract {
  creationUser: string;
  creationDateTo: IFromTo;
  hotelData: IHotelDataSearch;
  travelWindow: IFromTo;
  creationDate: IFromTo;
  published: string;
}

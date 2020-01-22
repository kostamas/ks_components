import {ISelectItem} from '../../shared/types/ISelect';
import {IFromTo} from '../../shared/types/calendar';

export interface INameId {
	id: string;
	name: string;
}

export interface IChildAges {
	minimumAge: number;
	maximumAge: number;
}

export interface ISupplier {
	name: string;
	id: any;
}

export interface IContractHeader {
	contractType: string;
	commissionPercentage?: number;
	boardBase: INameId;
	paymentMode: string;
	classification: string;
	managementType: string;
	includedCountries: ISelectItem[];
	excludedCountries: ISelectItem[];
	recommendedSellingPrice: boolean;
	isVisibleWeb: boolean;
	currency: INameId;
	renewalType: string;
	childAges: IChildAges;
	supplier: ISupplier;
	hotelCode: number;
	clientDistributionType: string;
	name: string;
}

export interface IRoom {
	type: INameId;
	characteristic: INameId;
	description: string;
	sharedRoomCode: string;
	sharedCharacteristicCode: string;
	name: string;
	standard: number;
	min: number;
	maxAdultsCapacity: number;
	maxChildrenCapacity: number | null;
	maxBabiesCapacity: number | null;
	max: number;
}


export interface IType {
	seasonCode: string;
	value: number;
}

export interface IAllotmentType {
	seasonCode: string;
	units: number;
	nights: number;
	price: number;
}

export interface IRate {
	roomCode: string;
	characteristicCode: string;
	type: IType[];
}

export interface IDateFromTo {
	dateFrom: string;
	dateTo: string;
}

export interface ISeason {
	seasonCode: string;
	travelWindow: IDateFromTo;
	bookingWindow: IDateFromTo;
	isMonday: boolean;
	isTuesday: boolean;
	isWednesday: boolean;
	isThursday: boolean;
	isFriday: boolean;
	isSaturday: boolean;
	isSunday: boolean;
}

export interface IRateData {
	vatIncluded: boolean;
	applicationType: string;
	rates: IRate[];
}

export interface ISeasonCode {
	seasonCode: string;
}

export interface ICancellationPolicy {
	isNRF: boolean;
	fees: ICancellationFee[];
}


export interface ICancellationFee {
	type: string;
	days: number;
	rule: string;
	time: string;
	seasons: ISeasonCode[];
}

export interface IType {
	seasonCode: string;
	value: number;
}

export interface IMinimumStay {
	room: IRoom2;
	seasons: IType[];
}

export interface IRoom2 {
	roomCode: string;
	characteristicCode: string;
}

export interface IAllotmentCeilingRestriction {
	allotment: string;
	room: IRoom2;
	seasons: IAllotmentType[];
}

export interface IBoardSupplement {
	board: string;
	paxType: string;
	room: IRoom2;
	seasons: IDiscountType[];
}

export interface IRoom4 {
	roomCode: string;
	characteristicCode: string;
}

export interface IDiscountType {
	seasonCode: string;
	isPercentage: boolean;
	value: any;
	travelWindow?: IDateFromTo;
	bookingWindow?: IDateFromTo;
}

export interface IFree {
	payNights: number;
	stayNights: number;
	isNRF: boolean;
	seasons: IDiscountType[];
}

export interface ITotalDiscount {
	value: number;
}

export interface ISupplementCombination {
	supplementCodeCombinable: string[];
	sharedAllotment: boolean;
	totalDiscount: ITotalDiscount[];
	supplementCode: string;
}

export interface IStopSale {
	room: IRoom2;
	applicationDate: IDateFromTo;
}

export interface IScale {
	from: number;
	to: number;
}

export interface IOverride {
	totalSalesPercentage: number;
	scale: IScale;
}

export interface IContractData {
	contractHeader: IContractHeader;
	rooms: IRoom[];
	rateData: IRateData;
	cancellationPolicy: ICancellationPolicy;
	minimumStay: IMinimumStay[];
	allotmentCeilingRestriction: IAllotmentCeilingRestriction[];
	boardSupplements: IBoardSupplement[];
	generalSupplements: IGeneralSupplements;
	free: IFree[];
	supplementCombination: ISupplementCombination[];
	stopSales: IStopSale[];
	overrides: IOverride[];
	seasons: ISeason[];
}

export interface IDiscount {
	guestApplicationType: INameId;
	room: IRoom4;
	applicationType: string;
	seasons: IDiscountType[];
}

export interface IOccupancySupplement {
	guestApplicationType: INameId;
	room: IRoom4;
	applicationType: string;
	seasons: IDiscountType[];
}

export interface IOtherSupplements {
	supplementCode: string;
	guestApplicationType: INameId;
	room: IRoom4;
	applicationType: string;
	seasons: IDiscountType[];
}

export interface INRFDiscount {
	sharedAllotment: boolean;
	seasons: IDiscountType[];
}

export interface IOpaqueDiscount {
	sharedAllotment: boolean;
	seasons: IDiscountType[];
}

export interface IHBGSelectDiscount {
	sharedAllotment: boolean;
	seasons: IDiscountType[];
}

export interface IEarlyBookingDiscount {
	daysBefore: number;
	stayNights: number;
	isNRF: boolean;
	seasons: IDiscountType[];
}

export interface ILongStayDiscount {
	stayNights: number;
	isNRF: boolean;
	seasons: IDiscountType[];
}

export interface IGeneralSupplements {
	discount: IDiscount[];
	occupancySupplements: IOccupancySupplement[];
	otherSupplements: IOtherSupplements[];
	NRFDiscount: INRFDiscount[];
	opaqueDiscount: IOpaqueDiscount[];
	HBGSelectDiscount: IHBGSelectDiscount[];
	earlyBookingDiscount: IEarlyBookingDiscount[];
	longStayDiscount: ILongStayDiscount[];
}

export interface IHotelData {
	hotelId: string;
	hotelName: string;
	hotelAddress: string;
	country: INameId;
	categoryId: string;
	destination: INameId;
	zone: INameId;
	postalCode: string;
	totalNumberOfRooms: number;
}

export interface IHotelbeds {
	name: string;
	title: string;
	date: string;
}

export interface IHotel {
	name: string;
	title: string;
	date: string;
}

export interface ISignatures {
	freeSaleControl: boolean;
	hotelbeds: IHotelbeds;
	hotel: IHotel;
}

export interface IAudit {
	creationDate: string;
	creationUser: string;
	updateDate: string | null;
	updateUser: string | null;
}

export interface IOneContractParams {
	id: number;
	version: string;
	office: INameId;
	company: INameId;
	contractData: IContractData;
	hotelData: IHotelData;
	signatures: ISignatures;
	travelWindow: IFromTo;
	audit: IAudit;
	publishedDate: string;
	dontUpdateView?: boolean;
	remarks: string;
	index?: number;
	atlasContractId?: string;
}

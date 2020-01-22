import {Injectable} from '@angular/core';
import {ContractDetailsService} from '../contract-details/contract-details.service';
import {ContractLoadingInformationService} from '../contract-loading-information/contract-loading-information.service';
import {ContractRoomsAvailabilityService} from '../contract-rooms-availability/contract-rooms-availability.service';
import {IPopulateService} from '../../../../types/one-contract';
import {IOneContractParams} from '../../../../types/one-contract-object';

@Injectable()
export class ContractDetailsPopulateService {

	public populateServices: IPopulateService[] = [];

	constructor(public contractDetailsService: ContractDetailsService,
	            public contractLoadingInformationService: ContractLoadingInformationService,
	            public contractRoomsAvailabilityService: ContractRoomsAvailabilityService) {
		this.populateServices.push(contractDetailsService);
		this.populateServices.push(contractLoadingInformationService);
		this.populateServices.push(contractRoomsAvailabilityService);
	}

	populateData(oneContract: IOneContractParams, loadedData: IOneContractParams): void {
		this.populateServices.forEach(s => s.populateData(oneContract, loadedData));
	}

}

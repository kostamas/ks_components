import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CreateOneContractService} from '../create-one-contract.service';
import {ISvgIcons, SVG_ICONS} from 'shared-ui-components-lib';
import {Observable, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ILoadedOneContract, ILoadOneContractResults} from '../../../../types/one-contract';
import {ContractHotelInformationService} from '../contract-hotel-information/contract-hotel-information.service';
import {AllOneContractService} from '../all-one-contract.service';
import {IOneContractParams} from '../../../../types/one-contract-object';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {ContractDetailsPopulateService} from './contract-details-populate.service';

@Component({
	selector: 'app-contract-details-modal',
	templateUrl: './contract-details-modal.component.html',
	styleUrls: ['./contract-details-modal.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContractDetailsModalComponent implements OnInit {
	public showLoader: boolean = false;
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public contracts: ILoadedOneContract[];
	public buttonsConfig: any[] = [];
	private isDone$: Subject<boolean> = new Subject();
	public errorObj: any = {hasError: false, message: ''};

	public hotelId: string;
	public companyId: string;

	constructor(public createOneContractService: CreateOneContractService,
	            private contractHotelInformationService: ContractHotelInformationService,
	            public allOneContractService: AllOneContractService,
	            private createOneContractStoreService: CreateOneContractStoreService,
	            private contractDetailsPopulateService: ContractDetailsPopulateService) {
	}

	ngOnInit(): void {
		this.showLoader = true;
		const {oneContractParams} = this.contractHotelInformationService;
		this.hotelId = oneContractParams.hotelData.hotelId;
		this.companyId = oneContractParams.company.id;
		this.contracts = [];
		if (this.hotelId) {
			this.createOneContractService.getContractDetails(this.hotelId, (contract: ILoadOneContractResults) => {
					this.contracts = contract.items;
					this.showLoader = false;
					if (this.contracts.length > 0) {
						this.contracts.forEach(() => {
							this.buttonsConfig.push({text: 'Select', hideIcon: true, isToolTipDisabled: true});
						});
					}
				},
				(error: any) => {
					this.errorObj.hasError = true;
					this.errorObj.message = error.message;
				});
		} else {
			this.showLoader = false;
		}
	}

	select(rowNumber: number): any {
		return (): Observable<boolean> => {
			const {buttonsConfig} = this;
			this.isDone$.next(true);
			buttonsConfig.forEach((c, i) => buttonsConfig[i] = {
				text: 'Select',
				hideIcon: true,
				isToolTipDisabled: true,
			});

			const officeContractId: string = `${this.contracts[rowNumber].incomingOfficeId}.${this.contracts[rowNumber].contractId}`;
			this.createOneContractService.importOneContract(officeContractId)
				.pipe(takeUntil(this.isDone$))
				.subscribe((loadedOneContract: IOneContractParams) => {
						const oneContractObject: IOneContractParams = this.allOneContractService.buildOneContract();
						this.createOneContractStoreService.contractSeasons$.pipe(take(1)).subscribe(seasons => {
							this.createOneContractService.updateOneContractSeasons(seasons, oneContractObject);
							this.contractDetailsPopulateService.populateData(oneContractObject, loadedOneContract);
							this.createOneContractStoreService.oneContract$.next(oneContractObject);
							buttonsConfig[rowNumber] = {
								text: 'Selected',
								hideIcon: false,
								svg: this.SVG_ICONS.checkMark,
								style: {'background-color': '#148536'},
								isToolTipDisabled: true,
							};
							this.isDone$.next(true);
						});
					},
					(err) => {
						this.buttonsConfig[rowNumber] = {
							errorMessage: err.message || '',
							text: 'Error',
							hideIcon: false,
							svg: this.SVG_ICONS.errorTriangle,
							style: {'background-color': '#da3232'},
							isToolTipDisabled: false
						};
						this.isDone$.next(true);
					});
			return this.isDone$;
		};
	}
}

import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {IOneContractParams} from '../../../../../types/one-contract-object';
import {ISvgIcons, SVG_ICONS} from 'shared-ui-components-lib';
import {CreateOneContractService} from '../../create-one-contract.service';
import {CreateOneContractStoreService} from '../../create-one-contract-store.service';
import {NrfDiscountService} from './nrf-discount.service';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-nrf-discount',
	templateUrl: './nrf-discount.component.html',
	styleUrls: ['./nrf-discount.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NrfDiscountComponent implements OnInit, OnDestroy {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public displayForm: boolean = false;
	private subscriptionsArray: any[] = [];

	constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
							private oneContractStoreService: CreateOneContractStoreService,
							public nrfDiscountService: NrfDiscountService) {
	}

	ngOnInit(): void {
		this.subscriptionsArray.push(
			this.oneContractStoreService.oneContract$
				.pipe(filter(contract => !contract || !contract.dontUpdateView))
				.subscribe((oneContract: IOneContractParams) => {
					if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements) {
						const HBGSelectedDiscount = oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements.NRFDiscount || [];
						this.displayForm = HBGSelectedDiscount.length > 0;
						setTimeout(() => this.changeDetector.detectChanges());
					}
				}));
	}

	getRowsFromContract(oneContract: IOneContractParams): any[] {
		if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements.NRFDiscount) {
			return oneContract.contractData.generalSupplements.NRFDiscount;
		} else {
			return [];
		}
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
	}
}

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
import {OpaqueDiscountService} from './opaque-discount.service';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-opaque-discount',
	templateUrl: './opaque-discount.component.html',
	styleUrls: ['./opaque-discount.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpaqueDiscountComponent implements OnInit, OnDestroy {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public displayForm: boolean = false;
	private subscriptionsArray: any[] = [];

	constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
							private oneContractStoreService: CreateOneContractStoreService,
							public opaqueDiscountService: OpaqueDiscountService) {
	}

	ngOnInit(): void {
		this.subscriptionsArray.push(
			this.oneContractStoreService.oneContract$
				.pipe(filter(contract => !contract || !contract.dontUpdateView))
				.subscribe((oneContract: IOneContractParams) => {
					if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements) {
						const HBGSelectedDiscount = oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements.opaqueDiscount || [];
						this.displayForm = HBGSelectedDiscount.length > 0;
						setTimeout(() => this.changeDetector.detectChanges());
					}
				}));
	}

	getRowsFromContract(oneContract: IOneContractParams): any[] {
		if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements.opaqueDiscount) {
			return oneContract.contractData.generalSupplements.opaqueDiscount;
		} else {
			return [];
		}
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
	}
}

import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component,
	OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CreateOneContractService} from '../../create-one-contract.service';
import {CreateOneContractStoreService} from '../../create-one-contract-store.service';
import {HbgSelectDiscountService} from './hbg-select-discount.service';
import {filter} from 'rxjs/operators';
import {ISvgIcons, SVG_ICONS} from '../../../../shared/svg-icon-module/svg-icons.const';
import {IOneContractParams} from '../../one-contract-object';

@Component({
	selector: 'app-hbg-select-discount',
	templateUrl: './hbg-select-discount.component.html',
	styleUrls: ['./hbg-select-discount.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HbgSelectDiscountComponent implements OnInit, OnDestroy {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public displayForm: boolean = false;
	private subscriptionsArray: any[] = [];

	constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
							private oneContractStoreService: CreateOneContractStoreService,
							public hbgSelectDiscountService: HbgSelectDiscountService) {
	}

	ngOnInit(): void {
		this.subscriptionsArray.push(
			this.oneContractStoreService.oneContract$
				.pipe(filter(contract => !contract || !contract.dontUpdateView))
				.subscribe((oneContract: IOneContractParams) => {
					if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements) {
						const HBGSelectedDiscount = oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements.HBGSelectDiscount || [];
						this.displayForm = HBGSelectedDiscount.length > 0;
						setTimeout(() => this.changeDetector.detectChanges());
					}
				}));
	}

	getRowsFromContract(oneContract: IOneContractParams): any[] {
		if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements && oneContract.contractData.generalSupplements.HBGSelectDiscount) {
			return oneContract.contractData.generalSupplements.HBGSelectDiscount;
		} else {
			return [];
		}
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
	}
}

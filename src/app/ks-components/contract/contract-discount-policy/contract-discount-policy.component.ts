import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {ISvgIcons, JsUtils, SVG_ICONS} from 'shared-ui-components-lib';
import {CreateOneContractService} from '../create-one-contract.service';
import {IOneContractParams} from '../../../../types/one-contract-object';
import {ContractDiscountPolicyService} from './contract-discount-policy.service';
import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {DISCOUNTS_TYPES} from '../../one-contract.const';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-contract-discount-policy',
	templateUrl: './contract-discount-policy.component.html',
	styleUrls: ['./contract-discount-policy.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDiscountPolicyComponent implements OnInit, OnDestroy {
	public SVG_ICONS: ISvgIcons = SVG_ICONS;
	public displayForm: boolean = false;
	private subscriptionsArray: any[] = [];

	constructor(public oneContractService: CreateOneContractService, private changeDetector: ChangeDetectorRef,
							public contractDiscountPolicyService: ContractDiscountPolicyService,
							private oneContractStoreService: CreateOneContractStoreService) {
	}

	ngOnInit(): void {
		this.subscriptionsArray.push(
			this.oneContractStoreService.oneContract$
				.pipe(filter(contract => !contract || !contract.dontUpdateView))
				.subscribe((oneContract: IOneContractParams) => {
					if (oneContract && oneContract.contractData && oneContract.contractData.generalSupplements) {
						const discountPolicies = oneContract.contractData.generalSupplements[DISCOUNTS_TYPES.discount];
						this.displayForm = discountPolicies.length > 0;
						setTimeout(() => this.changeDetector.detectChanges());
					}
				}));
	}

	getRowsFromContract = (oneContract: IOneContractParams): any[] => {
		return JsUtils.deepCopy(oneContract.contractData.generalSupplements[DISCOUNTS_TYPES.discount]) || [];
	}

	ngOnDestroy(): void {
		this.subscriptionsArray.forEach(subscription => subscription.unsubscribe());
	}
}
